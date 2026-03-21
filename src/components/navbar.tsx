import Link from "next/link";
import { DarkModeToggle } from "@/components/dark-mode-toggle";

type NavbarProps = {
  showAuthLinks?: boolean;
};

export function Navbar({ showAuthLinks = true }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          TripGenie
        </Link>
        <div className="flex items-center gap-3">
          <DarkModeToggle />
          {showAuthLinks && (
            <>
              <Link href="/login" className="text-sm hover:underline">
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-zinc-900 px-3 py-1.5 text-sm text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
