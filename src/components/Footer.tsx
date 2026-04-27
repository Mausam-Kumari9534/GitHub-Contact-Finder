import { Github } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="mt-auto py-3 text-center">
      <p className="text-sm text-muted-foreground">
        Made by{" "}
        <a
          href="https://github.com/Mausam-Kumari9534"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-primary transition-colors"
        >
          <Github className="h-3 w-5" />
          mausam kumari
        </a>
      </p>
    </footer>
  );
};
