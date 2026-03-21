import { notFound } from "next/navigation";
import { ChatExperience } from "@/components/chat-experience";
import { Navbar } from "@/components/navbar";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { Message, Trip } from "@/types";

export default async function ChatPage({
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

  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .eq("trip_id", tripId)
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar showAuthLinks={false} />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <ChatExperience trip={trip as Trip} messages={(messages ?? []) as Message[]} userId={user.id} />
      </main>
    </div>
  );
}
