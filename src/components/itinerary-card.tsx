import { ItineraryDay } from "@/types";

export function ItineraryCard({ dayData }: { dayData: ItineraryDay }) {
  return (
    <article className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <h3 className="text-base font-semibold">Day {dayData.day}</h3>
      <p className="mt-2 text-sm font-medium">Places</p>
      <ul className="list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300">
        {dayData.places.map((place) => (
          <li key={place}>{place}</li>
        ))}
      </ul>
      <p className="mt-2 text-sm font-medium">Food</p>
      <ul className="list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300">
        {dayData.food.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{dayData.notes}</p>
    </article>
  );
}
