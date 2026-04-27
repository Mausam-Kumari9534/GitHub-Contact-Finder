import { AlertCircle, UserX, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ErrorStateProps {
  type: "not-found" | "rate-limit" | "generic";
  message?: string;
}

export const ErrorState = ({ type, message }: ErrorStateProps) => {
  const config = {
    "not-found": {
      icon: UserX,
      title: "User not found",
      description: "We couldn't find a GitHub user with that username. Please check the spelling and try again.",
    },
    "rate-limit": {
      icon: Clock,
      title: "Rate limit exceeded",
      description: "Too many requests. Please wait a moment and try again.",
    },
    "generic": {
      icon: AlertCircle,
      title: "Something went wrong",
      description: message || "An error occurred while fetching the data. Please try again.",
    },
  };

  const { icon: Icon, title, description } = config[type];

  return (
    <Card className="w-full max-w-md mx-auto p-6 bg-card shadow-soft border-border text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 mb-4">
        <Icon className="h-6 w-6 text-destructive" />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Card>
  );
};
