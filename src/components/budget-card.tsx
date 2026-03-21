export function BudgetCard({
  summary,
}: {
  summary: string;
}) {
  return (
    <section className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <h3 className="text-base font-semibold">Budget Summary</h3>
      <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{summary}</p>
    </section>
  );
}
