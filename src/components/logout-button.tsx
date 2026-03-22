"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      onClick={logout}
      className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm cursor-pointer hover:bg-zinc-300 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:text-white"
    >
      Logout
    </button>
  );
}
