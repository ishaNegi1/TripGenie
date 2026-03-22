import Link from "next/link";
import { Trip } from "@/types";

export function TripCard({ trip }: { trip: Trip }) {
  const created = new Date(trip.created_at).toLocaleDateString();

  return (
    <article className="rounded-xl border border-zinc-200 p-4 shadow-sm dark:border-zinc-800">
      <h3 className="text-lg font-semibold dark:text-amber-100">{trip.destination}</h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{trip.days} days</p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">Budget: {trip.budget}</p>
      <p className="mt-1 text-xs text-zinc-500">Created: {created}</p>
      <Link
        href={`/chat/${trip.id}`}
        className="mt-3 inline-flex rounded-md bg-zinc-900 px-3 py-1.5 text-sm text-white hover:bg-zinc-700 dark:hover:bg-zinc-300 dark:bg-zinc-100 dark:text-zinc-900"
      >
        Open Chat
      </Link>
    </article>
  );
}
