import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer"
import { LogoutButton } from "@/components/logout-button";
import { TripCard } from "@/components/trip-card";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { Trip } from "@/types";

export default async function DashboardPage() {
  const user = await requireUser();
  const supabase = await createClient();
  const { data } = await supabase
    .from("trips")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const trips = (data ?? []) as Trip[];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar showAuthLinks={false} />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold dark:text-amber-100">Your Trips</h1>
          <div className="flex items-center gap-2">
            <Link href="/new-trip" className="rounded-md bg-zinc-900 px-3 py-1.5 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-300">
              New Trip
            </Link>
            <LogoutButton />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-14">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
        {trips.length === 0 ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">No trips yet. Create your first one.</p>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
