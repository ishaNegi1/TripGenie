"use client";

import { useEffect, useState } from "react";

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("tripgenie-theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    localStorage.setItem("tripgenie-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full border border-zinc-300 px-3 py-1.5 cursor-pointer text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:text-white"
      aria-label="Toggle dark mode"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
