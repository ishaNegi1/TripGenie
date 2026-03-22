import { DestinationKnowledge, Itinerary } from "@/types";

function parseItineraryResponse(raw: string): Itinerary {
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON found in response");
  return JSON.parse(jsonMatch[0]);
}

async function queryOpenRouter(prompt: string) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openrouter/free",
      messages: [
        { role: "system", content: "You are an India travel planner." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function generateItinerary(input: {
  destination: string;
  days: string;
  budget: string;
  interests: string;
  destinationData: DestinationKnowledge[];
}) {
  const destinationContext = input.destinationData.map(d => `
State: ${d.state}
City: ${d.city}
Places: ${d.famous_places}
Food: ${d.food}
Best Time: ${d.best_time}
Budget: ${d.avg_budget}
Tips: ${d.travel_tips}
`).join("\n");

  const prompt = `
Use this destination data:
${destinationContext}

Trip Details:
Destination: ${input.destination}
Days: ${input.days}
Budget: ${input.budget}
Interests: ${input.interests}

Create a day-wise itinerary.

Return ONLY JSON:
{
  "days": [
    { "day": 1, "places": [], "food": [], "notes": "" }
  ],
  "budget_summary": "",
  "travel_tips": ""
}
`;

  const raw = await queryOpenRouter(prompt);
  return parseItineraryResponse(raw);
}

export async function generateGeneralTravelResponse(input: {
  query: string;
  destination: string;
  days: string;
  budget: string;
  interests: string;
}) {
  const prompt = `
User question: ${input.query}
Destination: ${input.destination}
Days: ${input.days}
Budget: ${input.budget}
Interests: ${input.interests}

Give helpful travel advice.
`;

  return await queryOpenRouter(prompt);
}