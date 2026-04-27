import { useState, useEffect } from "react";

const STORAGE_KEY = "github-search-history";
const MAX_HISTORY = 8;

export const useSearchHistory = () => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  const addToHistory = (username: string) => {
    const trimmed = username.trim().toLowerCase();
    if (!trimmed) return;

    setHistory((prev) => {
      const filtered = prev.filter((u) => u.toLowerCase() !== trimmed);
      const newHistory = [username.trim(), ...filtered].slice(0, MAX_HISTORY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const removeFromHistory = (username: string) => {
    setHistory((prev) => {
      const filtered = prev.filter((u) => u !== username);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return filtered;
    });
  };

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  };

  return { history, addToHistory, removeFromHistory, clearHistory };
};
