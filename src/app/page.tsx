import Link from "next/link";
import { Navbar } from "@/components/navbar";

export default function Home() {
  const destinations = ["Paris", "Bali", "Tokyo", "Goa", "Manali", "Rome"];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16">
        <section className="text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">TripGenie</h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">Plan smarter, travel better</p>
          <Link
            href="/new-trip"
            className="mt-8 inline-flex rounded-full bg-zinc-900 px-6 py-3 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
          >
            Start Planning
          </Link>
        </section>

        <section className="mt-14">
          <h2 className="mb-4 text-xl font-semibold">Suggested destinations</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <article
                key={destination}
                className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h3 className="text-lg font-medium">{destination}</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  AI-powered day-by-day plans for your vibe and budget.
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
