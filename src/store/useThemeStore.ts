import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme | null; // ✅ Mettre `null` au début pour éviter le mismatch SSR/CSR
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: null, // ❌ Pas de localStorage ici ! (évite le problème SSR)
  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    set({ theme });
  },
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      return { theme: newTheme };
    }),
}));
