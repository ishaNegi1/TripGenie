"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { BudgetCard } from "@/components/budget-card";
import { ChatBubble } from "@/components/chat-bubble";
import { ItineraryCard } from "@/components/itinerary-card";
import { LoadingSpinner } from "@/components/loading-spinner";
import { TravelTipsCard } from "@/components/travel-tips-card";
import { TypingIndicator } from "@/components/typing-indicator";
import { Itinerary, Message, Trip } from "@/types";

type ChatExperienceProps = {
  trip: Trip;
  messages: Message[];
  userId: string;
};

export function ChatExperience({ trip, messages: initialMessages, userId }: ChatExperienceProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [itinerary, setItinerary] = useState<Itinerary | null>(trip.itinerary);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasItinerary = useMemo(() => itinerary && itinerary.days?.length > 0, [itinerary]);

  const send = async (customPrompt?: string) => {
    const messageToSend = customPrompt ?? prompt;
    if (!messageToSend.trim()) return;

    setError(null);
    setLoading(true);
    setTyping(true);

    const optimisticUser: Message = {
      id: crypto.randomUUID(),
      trip_id: trip.id,
      user_id: userId,
      role: "user",
      content: messageToSend,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticUser]);
    setPrompt("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripId: trip.id,
          userId,
          prompt: messageToSend,
          destination: trip.destination,
          days: trip.days,
          budget: trip.budget,
          interests: trip.interests,
        }),
      });

      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Failed to generate itinerary.");

      setMessages((prev) => [...prev, payload.assistantMessage as Message]);
      if (payload.itinerary) {
        setItinerary(payload.itinerary as Itinerary);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setTyping(false);
      setLoading(false);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await send();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <section className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold dark:text-amber-100">{trip.destination} Trip Chat</h1>
          <div className="flex gap-2">
            <Link href="/new-trip" className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-700 dark:text-amber-100 text-center">
              New Trip
            </Link>
            <Link href="/dashboard" className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-700 dark:text-amber-100 text-center">
              Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 my-6 dark:text-amber-100">
          <button onClick={() => send("Generate itinerary for this trip")}
            className=" px-3 py-1 text-sm border-zinc-300 dark:border-zinc-700 border rounded-md cursor-pointer">Itinerary</button>

          <button onClick={() => send("Suggest good budget hotels")}
            className=" px-3 py-1 text-sm border-zinc-300 dark:border-zinc-700 border rounded-md cursor-pointer">Hotels</button>

          <button onClick={() => send("What should I pack for this trip?")}
            className=" px-3 py-1 text-sm border-zinc-300 dark:border-zinc-700 border rounded-md cursor-pointer">Packing</button>

          <button onClick={() => send("How to travel there?")}
            className=" px-3 py-1 text-sm border-zinc-300 dark:border-zinc-700 border rounded-md cursor-pointer">Transport</button>

          <button onClick={() => send("Best time to visit")}
            className=" px-3 py-1 text-sm border-zinc-300 dark:border-zinc-700 border rounded-md cursor-pointer">Best Time</button>
        </div>

        <div className="space-y-3 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900">
          {messages.map((message) => (
            <ChatBubble key={message.id} role={message.role} content={message.content} />
          ))}
          {typing ? <TypingIndicator /> : null}
        </div>

        {loading ? <LoadingSpinner /> : null}
        {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}

        <form onSubmit={onSubmit} className="mt-4 flex gap-2">
          <input
            className="flex-1 rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700 dark:text-amber-100"
            placeholder="Ask about itinerary, hotels, transport, budget..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm text-white disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
          >
            Send
          </button>
        </form>
      </section>

      <section className="space-y-4">
        {hasItinerary ? (
          <>
            {itinerary.days.map((d) => (
              <ItineraryCard key={d.day} dayData={d} />
            ))}
            <BudgetCard summary={itinerary.budget_summary} />
            <TravelTipsCard tips={itinerary.travel_tips} />
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-zinc-300 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
            No itinerary yet. Press "Regenerate Plan" or ask a travel-related question.
          </div>
        )}
      </section>
    </div>
  );
}