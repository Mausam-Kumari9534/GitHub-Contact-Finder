import { Search } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
        <Search className="h-7 w-7 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">
        Search for a GitHub user
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs mx-auto">
        Enter a username above to find their public contact information...!
      </p>
    </div>
  );
};
