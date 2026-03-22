export function TravelTipsCard({ tips }: { tips: string }) {
  return (
    <section className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <h3 className="text-base font-semibold dark:text-amber-100">Travel Tips</h3>
      <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{tips}</p>
    </section>
  );
}
