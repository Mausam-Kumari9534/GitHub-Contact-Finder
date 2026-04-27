import { toast } from "@/hooks/use-toast";

export const copyToClipboard = async (text: string, label: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  } catch {
    toast({
      title: "Failed to copy",
      description: "Please try again",
      variant: "destructive",
    });
  }
};
