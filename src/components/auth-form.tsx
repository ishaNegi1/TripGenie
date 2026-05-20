"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const fn =
        mode === "signup"
          ? supabase.auth.signUp.bind(supabase.auth)
          : supabase.auth.signInWithPassword.bind(supabase.auth);

      const { error: authError } = await fn({
        email,
        password,
      });

      if (authError) throw authError;

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Authentication failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
  try {
    setGoogleLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : "Google authentication failed."
    );

    setGoogleLoading(false);
  }
};

  return (
    <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800 dark:text-amber-100">
      <h1 className="mb-6 text-xl font-semibold dark:text-amber-100">
        {mode === "signup" ? "Create account" : "Welcome back"}
      </h1>

      <button
  type="button"
  onClick={handleGoogleAuth}
  disabled={googleLoading}
  className="mb-4 flex w-full items-center justify-center gap-3 rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className="h-5 w-5"
  >
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303C33.659 32.657 29.207 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    />
    <path
      fill="#FF3D00"
      d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 13 24 13c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4c-7.682 0-14.347 4.337-17.694 10.691z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.104 0 9.786-1.947 13.348-5.118l-6.169-5.22C29.151 35.091 26.715 36 24 36c-5.186 0-9.626-3.326-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303c-1.058 3.098-3.057 5.442-5.954 6.862l.003-.002 6.169 5.22C35.113 39.348 44 33 44 24c0-1.341-.138-2.65-.389-3.917z"
    />
  </svg>

  {googleLoading
    ? "Connecting..."
    : "Continue with Google"}
</button>

      <div className="relative mb-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-zinc-300 dark:border-zinc-700" />
        </div>

        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-zinc-500 dark:bg-zinc-900">
            OR
          </span>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700"
        />

        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700"
        />

        {error ? (
          <p className="text-sm text-red-500">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-zinc-900 px-4 py-2 text-white disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
        >
          {loading
            ? "Please wait..."
            : mode === "signup"
            ? "Sign up"
            : "Login"}
        </button>
      </form>

      {mode === "signup" ? (
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </p>
      ) : (
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
          New here?{" "}
          <Link href="/signup" className="underline">
            Create account
          </Link>
        </p>
      )}
    </div>
  );
}