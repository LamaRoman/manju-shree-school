import Link from "next/link";
import {
  ReadingIllustration,
  PlayingIllustration,
  ActivitiesIllustration,
} from "@/components/illustrations";

const gallery = [
  {
    title: "Reading Time",
    description: "Students build a lifelong love of reading, in both Sambata and English.",
    Illustration: ReadingIllustration,
  },
  {
    title: "Playtime",
    description: "Recess gives students space to run, play, and build friendships.",
    Illustration: PlayingIllustration,
  },
  {
    title: "Extra-Curricular Activities",
    description: "Art, music, and clubs round out the school day beyond the classroom.",
    Illustration: ActivitiesIllustration,
  },
];

const quickLinks = [
  {
    href: "/about",
    title: "About Us",
    description: "Our background, mission, and the values that guide every classroom.",
    icon: "🏫",
  },
  {
    href: "/curriculum",
    title: "Curriculum",
    description: "How we teach the Sambata language alongside our core subjects.",
    icon: "📚",
  },
  {
    href: "/volunteer",
    title: "Volunteer",
    description: "Donate food, sanitary pads, or stationery — or give your time.",
    icon: "🤝",
  },
  {
    href: "/team",
    title: "Our Team",
    description: "Meet the founder, principal, and teachers behind Manju Shree Primary School.",
    icon: "🎓",
  },
];

const stats = [
  { label: "Students enrolled", value: "200+" },
  { label: "Dedicated teachers", value: "12" },
  { label: "Years serving the community", value: "18" },
  { label: "Active volunteers", value: "40+" },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-primary-50 to-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-20 text-center lg:py-28">
          <span className="rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold text-primary-700">
            Welcome to Manju Shree Primary School, Patarasi-3, Jumla
          </span>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl">
            Educating children, preserving culture, building community.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-gray-600">
            We provide quality education rooted in strong values while keeping the
            Sambata language and heritage alive for the next generation — supported by a
            community of generous volunteers.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/volunteer"
              className="rounded-full bg-accent-500 px-7 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-accent-600"
            >
              Become a Volunteer
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-primary-200 bg-white px-7 py-3 text-base font-semibold text-primary-700 shadow-sm transition-colors hover:bg-primary-50"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-primary-100 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-extrabold text-primary-700">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-primary-950">Explore Manju Shree Primary School</h2>
          <p className="mt-3 text-gray-600">
            Everything you need to know about who we are, what we teach, and how you can
            help.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col rounded-2xl border border-primary-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-3xl">{link.icon}</span>
              <h3 className="mt-4 text-lg font-semibold text-primary-900 group-hover:text-primary-600">
                {link.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{link.description}</p>
              <span className="mt-4 text-sm font-semibold text-primary-600">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-primary-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-primary-950">Life at Manju Shree Primary School</h2>
            <p className="mt-3 text-gray-600">
              A glimpse into a typical day — reading, playing, and exploring together.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {gallery.map(({ title, description, Illustration }) => (
              <div
                key={title}
                className="overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-sm"
              >
                <div className="aspect-[4/3] w-full">
                  <Illustration />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-primary-900">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-900">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-white">
            Every meal, pad, and pencil makes a difference.
          </h2>
          <p className="max-w-2xl text-primary-100">
            Many of our students rely on community generosity for daily meals, hygiene
            products, and school supplies. Join our volunteers in supporting them.
          </p>
          <Link
            href="/volunteer"
            className="rounded-full bg-accent-500 px-7 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-accent-600"
          >
            See How You Can Help
          </Link>
        </div>
      </section>
    </div>
  );
}
