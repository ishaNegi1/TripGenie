import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function Home() {
  const destinations = [
    {
      name: "Goa",
      image: "/images/goa.jpg",
      description:
        "Beaches, nightlife, and sunsets — perfect for a relaxing escape.",
    },
    {
      name: "Manali",
      image: "/images/manali.jpg",
      description:
        "Snowy mountains, cafes, and adventure in the Himalayas.",
    },
    {
      name: "Jaipur",
      image: "/images/jaipur.jpg",
      description:
        "Royal palaces, forts, and the vibrant culture of Rajasthan.",
    },
    {
      name: "Kerala",
      image: "/images/kerala.jpg",
      description:
        "Backwaters, greenery, and peaceful houseboat stays.",
    },
    {
      name: "Leh Ladakh",
      image: "/images/ladakh.jpg",
      description:
        "Breathtaking landscapes and the ultimate road trip destination.",
    },
    {
      name: "Rishikesh",
      image: "/images/rishikesh.jpg",
      description:
        "Yoga capital of the world with river rafting and scenic views.",
    },
  ];

  const features = [
    {
      title: "AI Travel Assistant",
      description:
        "Generate personalized day-wise itineraries, travel tips, food recommendations, and destination guidance using AI-powered travel planning.",
    },
    {
      title: "Persistent Trip Chat",
      description:
        "Every trip has its own dedicated AI chat workspace where conversations, travel plans, and itinerary discussions are stored permanently.",
    },
    {
      title: "Smart Group Expense Settlement",
      description:
        "Add group members, track trip expenses category-wise, and automatically calculate who should pay whom with optimized settlement logic similar to Splitwise.",
    },
    {
      title: "Secure Authentication",
      description:
        "Supports Email/Password login and Google OAuth authentication with protected routes and persistent user sessions.",
    },
    {
      title: "Trip Dashboard",
      description:
        "Manage all your planned trips in one place with trip history, chat access, expense tracking, and delete functionality.",
    },
    {
      title: "Context-Aware Travel Planning",
      description:
        "TripGenie uses destination-specific travel knowledge including famous places, food, best visiting time, travel budget, and tips for accurate itinerary generation.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-16">
        
        <section className="text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl dark:text-amber-100">
            TripGenie
          </h1>

          <p className="mt-5 text-lg text-zinc-600 dark:text-zinc-400">
            AI-powered travel planning and smart group expense management
            platform.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/new-trip"
              className="inline-flex rounded-full bg-zinc-900 px-6 py-3 text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              Start Planning
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex rounded-full border border-zinc-300 px-6 py-3 transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              Open Dashboard
            </Link>
          </div>
        </section>

        <section className="mt-24">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold dark:text-amber-100">
              Platform Features
            </h2>

            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Designed to solve real travel planning and group trip management
              problems.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h3 className="text-xl font-semibold dark:text-amber-100">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-3xl font-bold dark:text-amber-100">
            How Smart Expense Settlement Works
          </h2>

          <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">
            TripGenie intelligently splits trip expenses among all group members
            and minimizes the number of transactions required for settlement.
            The algorithm calculates each member&apos;s fair share and determines
            the most optimized payment flow.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-700">
              <h3 className="font-semibold dark:text-amber-100">
                1. Add Group Members
              </h3>

              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Add all travelers participating in the trip before recording
                expenses.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-700">
              <h3 className="font-semibold dark:text-amber-100">
                2. Track Expenses
              </h3>

              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Add expenses category-wise such as food, hotels, transport,
                shopping, and activities with payer details.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-700">
              <h3 className="font-semibold dark:text-amber-100">
                3. Smart Settlement
              </h3>

              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                The platform automatically calculates who owes whom and reduces
                unnecessary transactions.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-2xl bg-zinc-100 p-6 dark:bg-zinc-950">
            <h3 className="text-xl font-semibold dark:text-amber-100">
              Example Settlement
            </h3>

            <div className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <p>• Isha paid ₹600 for transport</p>
              <p>• Shreya paid ₹750 for food</p>
              <p>• 4 group members participated</p>
            </div>

            <div className="mt-5 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="font-medium dark:text-amber-100">
                Smart Settlement Output
              </p>

              <div className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <p>• Varnika pays Shreya ₹337.50</p>
                <p>• Hanni pays Shreya ₹75</p>
                <p>• Hanni pays Isha ₹262.50</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold dark:text-amber-100">
              How To Use TripGenie
            </h2>

            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Simple workflow for planning and managing trips.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              "Create an account using Email or Google.",
              "Generate a new trip itinerary with AI assistance.",
              "Chat with the AI assistant for travel planning.",
              "Manage group expenses and settlements during the trip.",
            ].map((step, index) => (
              <div
                key={index}
                className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
                  {index + 1}
                </div>

                <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <h2 className="mb-8 text-3xl font-bold dark:text-amber-100">
            Suggested Destinations
          </h2>

          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <div
                key={destination.name}
                className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="h-48 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="text-lg font-medium dark:text-amber-100">
                    {destination.name}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {destination.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}