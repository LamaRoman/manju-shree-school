import type { Metadata } from "next";
import { SchoolIllustration } from "@/components/illustrations";

export const metadata: Metadata = {
  title: "About Us | Manju Shree Primary School",
  description:
    "Learn about Manju Shree Primary School's background, our aim and goals, and the core values that shape our school community.",
};

const milestones = [
  {
    year: "2008",
    text: "Founded as a single-room community school with 24 students and two volunteer teachers.",
  },
  {
    year: "2013",
    text: "Opened our permanent campus, thanks to donated land and community fundraising.",
  },
  {
    year: "2017",
    text: "Launched the Sambata Language Preservation Program alongside our core curriculum.",
  },
  {
    year: "2021",
    text: "Began our volunteer-supported meal, hygiene, and stationery programs for families in need.",
  },
  {
    year: "Today",
    text: "200+ students across all primary grades, supported by 12 teachers and a growing volunteer network.",
  },
];

const goals = [
  {
    title: "Deliver quality education for every child",
    description:
      "Provide a well-rounded, affordable education regardless of a family's financial background.",
    icon: "🎯",
  },
  {
    title: "Preserve the Sambata language and culture",
    description:
      "Ensure the next generation can read, write, and speak Sambata fluently and take pride in their heritage.",
    icon: "🗣️",
  },
  {
    title: "Build confident, capable young people",
    description:
      "Develop critical thinking, creativity, and life skills that prepare students for higher education and beyond.",
    icon: "🌱",
  },
  {
    title: "Strengthen the community around the school",
    description:
      "Partner with families and volunteers so no child goes without food, hygiene essentials, or school supplies.",
    icon: "🏘️",
  },
];

const values = [
  {
    title: "Respect",
    description: "We treat every student, family, and colleague with dignity and kindness.",
    icon: "🤲",
  },
  {
    title: "Integrity",
    description: "We act honestly and hold ourselves accountable, in and out of the classroom.",
    icon: "🧭",
  },
  {
    title: "Compassion",
    description: "We care for the wellbeing of every child, especially those who need it most.",
    icon: "❤️",
  },
  {
    title: "Curiosity",
    description: "We encourage questions, exploration, and a lifelong love of learning.",
    icon: "🔍",
  },
  {
    title: "Community",
    description: "We believe education is a shared responsibility between school, family, and volunteers.",
    icon: "🤝",
  },
  {
    title: "Perseverance",
    description: "We teach students to work hard, stay resilient, and never give up on their goals.",
    icon: "💪",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary-50 to-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <span className="rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold text-primary-700">
            About Us
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl">
            Our Background
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Located in Patarasi-3, Jumla, Manju Shree Primary School began as a small
            community effort to give local children access to education — and has grown
            into a full school dedicated to academic excellence and cultural
            preservation.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6">
        <div className="overflow-hidden rounded-2xl border border-primary-100">
          <div className="aspect-[16/7] w-full">
            <SchoolIllustration />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-primary-950">How we started</h2>
            <p className="mt-4 text-gray-600 leading-7">
              Manju Shree Primary School was founded by a group of local teachers and parents who
              noticed that many children in the region had no nearby school to attend.
              What began in a single borrowed room has grown, through community
              fundraising and the generosity of volunteers, into a full campus serving
              hundreds of students each year.
            </p>
            <p className="mt-4 text-gray-600 leading-7">
              Today, we remain a community-rooted school: run by educators, supported by
              volunteers, and shaped by the families we serve.
            </p>
          </div>

          <div className="lg:col-span-3">
            <ol className="relative space-y-8 border-l-2 border-primary-100 pl-6">
              {milestones.map((m) => (
                <li key={m.year} className="relative">
                  <span className="absolute -left-[31px] flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 ring-4 ring-white" />
                  <div className="text-sm font-bold text-primary-600">{m.year}</div>
                  <p className="mt-1 text-gray-600">{m.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-primary-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-primary-950">Our Aim &amp; Goals</h2>
            <p className="mt-3 text-gray-600">
              Everything we do is guided by four core commitments to our students and
              community.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {goals.map((goal) => (
              <div
                key={goal.title}
                className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm"
              >
                <span className="text-3xl">{goal.icon}</span>
                <div>
                  <h3 className="font-semibold text-primary-900">{goal.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {goal.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-primary-950">Our Core Values</h2>
          <p className="mt-3 text-gray-600">
            Six values that we teach, model, and live by every day.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-primary-100 p-6 text-center transition-shadow hover:shadow-md"
            >
              <span className="text-3xl">{value.icon}</span>
              <h3 className="mt-3 font-semibold text-primary-900">{value.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
