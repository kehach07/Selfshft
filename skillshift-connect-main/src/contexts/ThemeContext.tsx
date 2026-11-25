import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isFlashing: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("selfshft-theme");
    return (stored as Theme) || "light";
  });
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("selfshft-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setIsFlashing(true);
    setTimeout(() => {
      setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }, 150);
    setTimeout(() => {
      setIsFlashing(false);
    }, 600);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isFlashing }}>
      {/* Flash overlay */}
      <div
        className={`fixed inset-0 z-[9999] pointer-events-none transition-opacity duration-300 ${
          isFlashing ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: theme === "light"
            ? "radial-gradient(circle at 50% 50%, hsl(30 95% 55% / 0.6), hsl(220 60% 35% / 0.4), transparent)"
            : "radial-gradient(circle at 50% 50%, hsl(220 60% 35% / 0.6), hsl(30 95% 55% / 0.4), transparent)",
        }}
      />
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
