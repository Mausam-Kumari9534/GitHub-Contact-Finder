import { useState } from "react";
import type { GitHubUser } from "@/types/github";

type ErrorType = "not-found" | "rate-limit" | "generic";

interface UseGitHubUserReturn {
  user: GitHubUser | null;
  isLoading: boolean;
  error: { type: ErrorType; message?: string } | null;
  searchUser: (username: string) => Promise<void>;
  reset: () => void;
}

interface CommitSearchResponse {
  items: Array<{
    commit: {
      author: {
        email: string;
        name: string;
      };
    };
  }>;
}

export const useGitHubUser = (): UseGitHubUserReturn => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ type: ErrorType; message?: string } | null>(null);

  const searchUser = async (username: string) => {
    setIsLoading(true);
    setError(null);
    setUser(null);

    try {
      // Fetch user profile and commit email in parallel
      const [userResponse, commitResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`, {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }),
        fetch(`https://api.github.com/search/commits?q=author:${username}&per_page=1&sort=author-date&order=desc`, {
          headers: {
            Accept: "application/vnd.github.cloak-preview+json",
          },
        }),
      ]);

      if (userResponse.status === 404) {
        setError({ type: "not-found" });
        return;
      }

      if (userResponse.status === 403) {
        const data = await userResponse.json();
        if (data.message?.includes("rate limit")) {
          setError({ type: "rate-limit" });
          return;
        }
      }

      if (!userResponse.ok) {
        setError({ type: "generic", message: `Error: ${userResponse.status}` });
        return;
      }

      const userData = await userResponse.json();
      
      // Extract commit email if available
      let commitEmail: string | null = null;
      let isNoReplyEmail = false;
      
      if (commitResponse.ok) {
        const commitData: CommitSearchResponse = await commitResponse.json();
        if (commitData.items && commitData.items.length > 0) {
          const email = commitData.items[0].commit.author.email;
          if (email) {
            commitEmail = email;
            isNoReplyEmail = email.includes("noreply.github.com") || email.includes("users.noreply.github");
          }
        }
      }

      const user: GitHubUser = {
        ...userData,
        commit_email: commitEmail,
        is_noreply_email: isNoReplyEmail,
      };
      
      setUser(user);
    } catch (err) {
      setError({ 
        type: "generic", 
        message: err instanceof Error ? err.message : "Failed to fetch user data" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setUser(null);
    setError(null);
  };

  return { user, isLoading, error, searchUser, reset };
};
