import { Loader2 } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="text-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
      <p className="text-sm text-muted-foreground">Fetching profile please wait...</p>
    </div>
  );
};
