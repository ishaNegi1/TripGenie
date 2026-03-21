import { AuthForm } from "@/components/auth-form";
import { Navbar } from "@/components/navbar";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar showAuthLinks={false} />
      <main className="mx-auto max-w-md px-4 py-12">
        <AuthForm mode="login" />
      </main>
    </div>
  );
}
