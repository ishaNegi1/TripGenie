import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function Home() {
  const destinations = [
    {
      name: "Goa",
      image: "/images/goa.jpg",
      description: "Beaches, nightlife, and sunsets — perfect for a relaxing escape."
    },
    {
      name: "Manali",
      image: "/images/manali.jpg",
      description: "Snowy mountains, cafes, and adventure in the Himalayas."
    },
    {
      name: "Jaipur",
      image: "/images/jaipur.jpg",
      description: "Royal palaces, forts, and the vibrant culture of Rajasthan."
    },
    {
      name: "Kerala",
      image: "/images/kerala.jpg",
      description: "Backwaters, greenery, and peaceful houseboat stays."
    },
    {
      name: "Leh Ladakh",
      image: "/images/ladakh.jpg",
      description: "Breathtaking landscapes and the ultimate road trip destination."
    },
    {
      name: "Rishikesh",
      image: "/images/rishikesh.jpg",
      description: "Yoga capital of the world with river rafting and scenic views."
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16">
        <section className="text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl dark:text-amber-100">TripGenie</h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">Plan smarter, travel better</p>
          <Link
            href="/new-trip"
            className="mt-8 inline-flex rounded-full bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            Start Planning
          </Link>
        </section>

        <section className=" mt-16">
          <h2 className="mb-6 text-xl font-semibold dark:text-amber-100">Suggested destinations</h2>
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <div
                key={destination.name}
                className="rounded-xl overflow-hidden border border-zinc-200 bg-white shadow-sm hover:shadow-md transition dark:border-zinc-800 dark:bg-zinc-900"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="h-40 w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-medium dark:text-amber-100">{destination.name}</h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
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
