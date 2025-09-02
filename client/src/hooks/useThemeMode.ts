import { useEffect } from "react";
import { useUIStore } from "@/store/ui";

export function useThemeMode() {
  const { isDarkMode, toggleDarkMode } = useUIStore();

  useEffect(() => {
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") {
      document.documentElement.classList.add("dark");
      useUIStore.setState({ isDarkMode: true });
    }
  }, []);

  return {
    isDarkMode,
    toggleDarkMode,
  };
}
