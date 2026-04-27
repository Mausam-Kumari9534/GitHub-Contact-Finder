import { Mail, Link as LinkIcon, Twitter, MapPin, Building, Users, BookOpen, Copy, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/clipboard";
import type { GitHubUser } from "@/types/github";

interface ProfileCardProps {
  user: GitHubUser;
}

export const ProfileCard = ({ user }: ProfileCardProps) => {
  const formatUrl = (url: string) => {
    if (!url.startsWith("http")) {
      return `https://${url}`;
    }
    return url;
  };

  const hasCommitEmail = user.commit_email && !user.is_noreply_email;

  return (
    <Card className="w-full max-w-lg mx-auto p-6 sm:p-8 bg-card shadow-card border-border">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <Avatar className="h-20 w-20 sm:h-24 sm:w-24 ring-4 ring-background shadow-soft">
          <AvatarImage src={user.avatar_url} alt={user.name || user.login} />
          <AvatarFallback className="text-2xl font-semibold bg-secondary text-secondary-foreground">
            {(user.name || user.login).slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
            {user.name || user.login}
          </h2>
          <a 
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            @{user.login}
          </a>
          {user.bio && (
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {user.bio}
            </p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-center sm:justify-start gap-6 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wide">Repos</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-foreground">{user.public_repos}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wide">Followers</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-foreground">{user.followers.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wide">Following</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-foreground">{user.following.toLocaleString()}</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-6 pt-6 border-t border-border space-y-3">
        {/* Commit Email - Primary */}
        {user.commit_email && (
          <ContactItem 
            icon={<Mail className="h-4 w-4" />}
            label={user.is_noreply_email ? "Email (No-Reply)" : "Email"}
            value={user.commit_email}
            href={!user.is_noreply_email ? `mailto:${user.commit_email}` : undefined}
            highlight={!user.is_noreply_email}
            copyable={!user.is_noreply_email}
            isNoReply={user.is_noreply_email}
          />
        )}

        {/* No commit email message */}
        {!user.commit_email && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
            <AlertCircle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              No public commit email available
            </p>
          </div>
        )}
        
        {user.blog && (
          <ContactItem 
            icon={<LinkIcon className="h-4 w-4" />}
            label="Website"
            value={user.blog.replace(/^https?:\/\//, "")}
            href={formatUrl(user.blog)}
            copyable
          />
        )}
        
        {user.twitter_username && (
          <ContactItem 
            icon={<Twitter className="h-4 w-4" />}
            label="Twitter"
            value={`@${user.twitter_username}`}
            href={`https://twitter.com/${user.twitter_username}`}
            copyable
          />
        )}
        
        {user.location && (
          <ContactItem 
            icon={<MapPin className="h-4 w-4" />}
            label="Location"
            value={user.location}
          />
        )}
        
        {user.company && (
          <ContactItem 
            icon={<Building className="h-4 w-4" />}
            label="Company"
            value={user.company}
          />
        )}

        {!user.commit_email && !user.blog && !user.twitter_username && !user.location && !user.company && (
          <p className="text-center text-sm text-muted-foreground py-2">
            No public contact information available
          </p>
        )}
      </div>
    </Card>
  );
};

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  highlight?: boolean;
  copyable?: boolean;
  isNoReply?: boolean;
}

const ContactItem = ({ icon, label, value, href, highlight, copyable, isNoReply }: ContactItemProps) => {
  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    copyToClipboard(value.replace(/^@/, ""), label);
  };

  const content = (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group">
      <div className={`flex-shrink-0 ${highlight ? "text-primary" : "text-muted-foreground"}`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
        <p className={`text-sm font-medium truncate ${highlight ? "text-primary" : isNoReply ? "text-muted-foreground" : "text-foreground"} ${href ? "group-hover:text-primary" : ""} transition-colors`}>
          {value}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {isNoReply && (
          <Badge variant="outline" className="text-xs text-muted-foreground border-muted-foreground/30">
            No-Reply
          </Badge>
        )}
        {highlight && !isNoReply && (
          <Badge variant="secondary" className="text-xs bg-accent text-accent-foreground">
            Public
          </Badge>
        )}
        {copyable && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleCopy}
            aria-label={`Copy ${label}`}
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
};
