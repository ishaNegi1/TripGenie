export function Footer() {
  return (
    <footer className="mt-8 border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 text-center">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          
          <div>
            <h3 className="text-lg font-semibold dark:text-white">TripGenie</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              AI-powered travel planner that helps you create personalized trip
              itineraries in seconds. Plan smarter, travel better.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold dark:text-white">Quick Links</h4>
            <ul className="mt-2 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/new-trip" className="hover:underline">Plan a Trip</a></li>
              <li><a href="/dashboard" className="hover:underline">My Trips</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold dark:text-white">Contact</h4>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Email: support@tripgenie.com
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Made with ❤️ using Next.js & AI
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-200 pt-4 text-center text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          © {new Date().getFullYear()} TripGenie. All rights reserved.
        </div>
      </div>
    </footer>
  );
}