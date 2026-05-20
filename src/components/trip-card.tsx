"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trip } from "@/types";

export function TripCard({ trip }: { trip: Trip }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const created = new Date(
    trip.created_at
  ).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this trip?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const response = await fetch(
        `/api/trips/${trip.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete trip");
      }

      router.refresh();
    } catch (error) {
      alert("Failed to delete trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="rounded-xl border border-zinc-200 p-4 shadow-sm dark:border-zinc-800">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold dark:text-amber-100">
            {trip.destination}
          </h3>

          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {trip.days} days
          </p>

          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Budget: {trip.budget}
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            Created: {created}
          </p>
        </div>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="rounded-md border border-red-300 px-3 py-1 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 dark:border-red-800 dark:hover:bg-red-950 cursor-pointer"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>

      <Link
        href={`/chat/${trip.id}`}
        className="mt-3 inline-flex rounded-md bg-zinc-900 px-3 py-1.5 text-sm text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        Open Chat
      </Link>
    </article>
  );
}