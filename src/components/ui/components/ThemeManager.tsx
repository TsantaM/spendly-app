"use client";

import { useThemeStore } from "@/src/store/useThemeStore";
import { useEffect } from "react";

const ThemeInitializer = () => {
  const { setTheme } = useThemeStore();

  useEffect(() => {
    const storedTheme = (localStorage.getItem("theme") as "light" | "dark") || "light";
    setTheme(storedTheme); // ✅ Applique le thème après le montage du client
  }, [setTheme]);

  return null; // Pas besoin d'affichage
};

export default ThemeInitializer;
