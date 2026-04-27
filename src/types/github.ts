export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  email: string | null;
  blog: string | null;
  twitter_username: string | null;
  location: string | null;
  company: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  commit_email: string | null;
  is_noreply_email: boolean;
}
