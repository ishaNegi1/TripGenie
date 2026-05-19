import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer"
import { NewTripForm } from "@/components/new-trip-form";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function NewTripPage() {
  const user = await requireUser();
  const supabase = await createClient();
  const { data } = await supabase.from("destinations").select("state, city");

  const stateOptions = Array.from(new Set((data ?? []).map((row) => row.state).filter(Boolean)));
  const cityOptions = Array.from(new Set((data ?? []).map((row) => row.city).filter(Boolean)));
  const destinations = Array.from(new Set([...stateOptions, ...cityOptions])).sort((a, b) =>
    a.localeCompare(b),
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar showAuthLinks={false} />
      <main className="mx-auto max-w-2xl px-4 py-12">
        <NewTripForm userId={user.id} destinations={destinations} />
      </main>
      <Footer />
    </div>
  );
}
