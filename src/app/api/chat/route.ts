import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateGeneralTravelResponse, generateItinerary } from "@/lib/gemini";
import { DestinationKnowledge } from "@/types";

const ragKeywords = ["itinerary", "plan", "trip", "days", "places", "food", "budget", "travel plan"];
const generalKeywords = [
  "hotel",
  "hostel",
  "transport",
  "flight",
  "train",
  "packing",
  "weather",
  "safety",
];

function detectIntent(prompt: string): "rag" | "general" {
  const normalizedPrompt = prompt.toLowerCase();
  const hasGeneralKeyword = generalKeywords.some((keyword) => normalizedPrompt.includes(keyword));
  if (hasGeneralKeyword) {
    return "general";
  }

  const hasRagKeyword = ragKeywords.some((keyword) => normalizedPrompt.includes(keyword));
  return hasRagKeyword ? "rag" : "rag";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tripId, prompt, destination, days, budget, interests } = body as {
      tripId: string;
      prompt: string;
      destination: string;
      days: string;
      budget: string;
      interests: string;
    };

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await supabase.from("messages").insert({
      trip_id: tripId,
      user_id: user.id,
      role: "user",
      content: prompt,
    });

    const intent = detectIntent(prompt);
    let itinerary = null;
    let assistantText = "";

    if (intent === "rag") {
      const normalizedDestination = destination.trim();
      const exactMatchQuery = `${normalizedDestination}`;
      const fuzzyMatchQuery = `%${normalizedDestination}%`;

      const { data: exactDestinationData, error: exactDestinationError } = await supabase
        .from("destinations")
        .select("*")
        .or(`state.ilike.${exactMatchQuery},city.ilike.${exactMatchQuery}`)
        .limit(12);

      if (exactDestinationError) {
        throw exactDestinationError;
      }

      let destinationData = exactDestinationData ?? [];
      if (destinationData.length === 0) {
        const { data: fuzzyDestinationData, error: fuzzyDestinationError } = await supabase
          .from("destinations")
          .select("*")
          .or(`state.ilike.${fuzzyMatchQuery},city.ilike.${fuzzyMatchQuery}`)
          .limit(12);

        if (fuzzyDestinationError) {
          throw fuzzyDestinationError;
        }

        destinationData = fuzzyDestinationData ?? [];
      }

      itinerary = await generateItinerary({
        destination,
        days,
        budget,
        interests,
        destinationData: (destinationData ?? []) as DestinationKnowledge[],
      });
      assistantText = `Itinerary generated for ${destination}.
Budget Summary: ${itinerary.budget_summary}
Travel Tips: ${itinerary.travel_tips}`;

      await supabase.from("trips").update({ itinerary }).eq("id", tripId).eq("user_id", user.id);
    } else {
      assistantText = await generateGeneralTravelResponse({
        query: prompt,
        destination,
        days,
        budget,
        interests,
      });
    }

    const { data: insertedAssistant } = await supabase
      .from("messages")
      .insert({
        trip_id: tripId,
        user_id: user.id,
        role: "assistant",
        content: assistantText,
      })
      .select("*")
      .single();

    return NextResponse.json({
      itinerary,
      assistantMessage: insertedAssistant,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected server error" },
      { status: 500 },
    );
  }
}
