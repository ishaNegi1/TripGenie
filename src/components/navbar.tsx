"use client";
import { useState } from "react";
import Link from "next/link";
import { DarkModeToggle } from "@/components/dark-mode-toggle";

type NavbarProps = {
  showAuthLinks?: boolean;
};

export function Navbar({ showAuthLinks = true }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        
        <Link href="/" className="text-lg font-semibold tracking-tight dark:text-white">
          TripGenie
        </Link>

        <div className="hidden md:flex items-center gap-5">
          <DarkModeToggle />
          {showAuthLinks && (
            <>
              <Link href="/dashboard" className="text-sm dark:text-white">
                Dashboard
              </Link>
              <Link href="/login" className="text-sm dark:text-white">
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-zinc-900 px-3 py-1.5 text-sm text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-sm border px-3 py-1 rounded dark:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Menu
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 px-4 py-4 space-y-3 bg-white dark:bg-zinc-950 text-center">
          <DarkModeToggle />
          {showAuthLinks && (
            <>
              <Link href="/dashboard" className="block text-sm dark:text-white">
                Dashboard
              </Link>
              <Link href="/login" className="block text-sm dark:text-white">
                Login
              </Link>
              <Link
                href="/signup"
                className="block rounded-md bg-zinc-900 px-3 py-2 text-sm text-white text-center dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 hover:bg-zinc-700"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}