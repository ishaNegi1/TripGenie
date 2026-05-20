import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { GroupExpenseManager } from "@/components/group-expense-manager";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import {
  Expense,
  Trip,
  TripMember,
} from "@/types";

export default async function TripExpensesPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const user = await requireUser();

  const { tripId } = await params;

  const supabase = await createClient();

  const { data: trip } = await supabase
    .from("trips")
    .select("*")
    .eq("id", tripId)
    .eq("user_id", user.id)
    .single();

  if (!trip) {
    notFound();
  }

  const { data: expenses } = await supabase
    .from("expenses")
    .select("*")
    .eq("trip_id", tripId)
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  const { data: members } = await supabase
    .from("trip_members")
    .select("*")
    .eq("trip_id", tripId)
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: true,
    });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar showAuthLinks={false} />

      <main className="mx-auto max-w-6xl px-4 py-8">
        
        <div className="mb-8 flex gap-3">
          <a
            href={`/chat/${tripId}`}
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm dark:border-zinc-700"
          >
            AI Chat
          </a>

          <a
            href={`/trip-expenses/${tripId}`}
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            Expense Manager
          </a>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold dark:text-amber-100">
            {trip.destination} Expenses
          </h1>

          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Track group expenses and settlements.
          </p>
        </div>

        <GroupExpenseManager
          tripId={tripId}
          members={(members ?? []) as TripMember[]}
          expenses={(expenses ?? []) as Expense[]}
        />
      </main>
    </div>
  );
}