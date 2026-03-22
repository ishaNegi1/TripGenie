"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function NewTripForm({ userId, destinations }: { userId: string; destinations: string[] }) {
  const router = useRouter();
  const [destination, setDestination] = useState(destinations[0] ?? "");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [interests, setInterests] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: insertError } = await supabase
        .from("trips")
        .insert({ user_id: userId, destination, days, budget, interests })
        .select("id")
        .single();

      if (insertError) throw insertError;
      router.push(`/chat/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create trip.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800 dark:text-amber-100">
      <h1 className="text-xl font-semibold">New Trip</h1>
      <select
        className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700 dark:bg-black"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
      >
        {destinations.length === 0 ? (
          <option value="">No destinations available</option>
        ) : null}
        {destinations.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <input className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700" placeholder="Number of Days" value={days} onChange={(e) => setDays(e.target.value)} required />
      <input className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700" placeholder="Budget" value={budget} onChange={(e) => setBudget(e.target.value)} required />
      <input className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700" placeholder="Interests (Food, Adventure, History)" value={interests} onChange={(e) => setInterests(e.target.value)} required />
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
      <button
        type="submit"
        disabled={loading || destinations.length === 0}
        className="rounded-md cursor-pointer bg-zinc-900 px-4 py-2 text-white disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-300 mt-2"
      >
        {loading ? "Creating..." : "Generate Trip"}
      </button>
    </form>
  );
}
