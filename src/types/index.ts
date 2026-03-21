export type ItineraryDay = {
  day: number;
  places: string[];
  food: string[];
  notes: string;
};

export type Itinerary = {
  days: ItineraryDay[];
  budget_summary: string;
  travel_tips: string;
};

export type DestinationKnowledge = {
  id: string;
  state: string;
  city: string;
  famous_places: string;
  food: string;
  best_time: string;
  avg_budget: string;
  travel_tips: string;
};

export type Trip = {
  id: string;
  user_id: string;
  destination: string;
  days: string;
  budget: string;
  interests: string;
  itinerary: Itinerary | null;
  created_at: string;
};

export type Message = {
  id: string;
  trip_id: string;
  user_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
};
