import { X, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SearchHistoryProps {
  history: string[];
  onSelect: (username: string) => void;
  onRemove: (username: string) => void;
}

export const SearchHistory = ({ history, onSelect, onRemove }: SearchHistoryProps) => {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <div className="flex items-center gap-2 mb-2">
        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground uppercase tracking-wide">Recent</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((username) => (
          <Badge
            key={username}
            variant="secondary"
            className="pl-3 pr-1.5 py-1.5 cursor-pointer hover:bg-secondary/80 transition-colors group"
          >
            <span
              onClick={() => onSelect(username)}
              className="text-sm font-medium text-foreground"
            >
              {username}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(username);
              }}
              className="ml-1.5 p-0.5 rounded-full hover:bg-muted-foreground/20 transition-colors"
              aria-label={`Remove ${username} from history`}
            >
              <X className="h-3 w-3 text-muted-foreground" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};
