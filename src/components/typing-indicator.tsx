export function TypingIndicator() {
  return (
    <div className="inline-flex items-center gap-1 rounded-2xl bg-zinc-100 px-3 py-2 dark:bg-zinc-800">
      <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500 [animation-delay:-0.3s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500 [animation-delay:-0.15s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500" />
    </div>
  );
}
