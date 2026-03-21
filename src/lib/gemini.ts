import { GoogleGenerativeAI } from "@google/generative-ai";
import { DestinationKnowledge, Itinerary } from "@/types";

const systemPrompt =
  "You are a travel planner API. Always return valid JSON matching the requested schema only.";

const generalTravelSystemPrompt =
  "You are an India travel assistant. Give practical, concise travel advice in plain text.";

function parseItineraryResponse(raw: string): Itinerary {
  try {
    const cleaned = raw.replace(/```json|```/g, "").trim();

    // Extract JSON if Gemini adds extra text
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in Gemini response");
    }

    const parsed = JSON.parse(jsonMatch[0]) as Itinerary;

    if (!Array.isArray(parsed.days)) {
      throw new Error("Invalid itinerary format.");
    }

    return parsed;
  } catch (error) {
    console.error("JSON Parse Error:", error);
    throw new Error("Failed to parse itinerary JSON.");
  }
}

export async function generateItinerary(input: {
  destination: string;
  days: string;
  budget: string;
  interests: string;
  destinationData: DestinationKnowledge[];
}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const destinationContext =
    input.destinationData.length > 0
      ? input.destinationData
          .map(
            (item) => `Destination: ${input.destination}
State: ${item.state}
City: ${item.city}
Famous Places: ${item.famous_places}
Food: ${item.food}
Best Time to Visit: ${item.best_time}
Average Budget: ${item.avg_budget}
Travel Tips: ${item.travel_tips}`,
          )
          .join("\n\n")
      : `Destination: ${input.destination}
No destination data found in knowledge base. Use conservative India travel defaults and mention uncertainty in notes.`;

  const prompt = `
${systemPrompt}

You are an AI travel planner specialized in India travel.

Use the following destination data to create a structured itinerary.

${destinationContext}

User Trip Details:
Days: ${input.days}
Budget: ${input.budget}
Interests: ${input.interests}

Create a day-wise itinerary.

Return ONLY JSON in this format:
{
  "days": [
    {
      "day": 1,
      "places": [],
      "food": [],
      "notes": ""
    }
  ],
  "budget_summary": "",
  "travel_tips": ""
}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  if (!text) {
    throw new Error("Gemini returned empty response.");
  }

  return parseItineraryResponse(text);
}

export async function generateGeneralTravelResponse(input: {
  query: string;
  destination: string;
  days: string;
  budget: string;
  interests: string;
}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
${generalTravelSystemPrompt}

User question: ${input.query}

Trip context:
Destination: ${input.destination}
Days: ${input.days}
Budget: ${input.budget}
Interests: ${input.interests}

Respond with actionable advice focused on hotels, transport, packing, weather, or safety as requested.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  if (!text) {
    throw new Error("Gemini returned empty response.");
  }

  return text;
}