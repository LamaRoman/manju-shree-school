import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curriculum | Manju Shree Primary School",
  description:
    "Explore how Manju Shree Primary School teaches the Sambata language alongside our core academic curriculum.",
};

const levels = [
  {
    stage: "Foundation",
    grades: "Grades 1–2",
    focus: "Listening & Speaking",
    description:
      "Students learn the Sambata alphabet, common greetings, numbers, and everyday vocabulary through songs, games, and guided conversation.",
    topics: ["Sambata alphabet & phonetics", "Basic vocabulary & greetings", "Simple conversation practice", "Traditional songs & rhymes"],
  },
  {
    stage: "Intermediate",
    grades: "Grades 3–4",
    focus: "Reading & Writing",
    description:
      "Students build grammar and comprehension skills, reading short stories and writing simple compositions in Sambata.",
    topics: ["Grammar & sentence structure", "Reading short stories", "Guided writing & spelling", "Community folktales"],
  },
  {
    stage: "Advanced",
    grades: "Grade 5",
    focus: "Literature & Composition",
    description:
      "Students study Sambata literature and oral history, and practice formal writing, debate, and storytelling.",
    topics: ["Sambata literature & poetry", "Essay & composition writing", "Oral history & storytelling", "Public speaking & debate"],
  },
];

const methodology = [
  {
    icon: "🗣️",
    title: "Immersion-first teaching",
    description: "Classes are conducted primarily in Sambata to build natural fluency alongside grammar instruction.",
  },
  {
    icon: "📖",
    title: "Storytelling & oral history",
    description: "Community elders and teachers share traditional stories that carry language, values, and history together.",
  },
  {
    icon: "🎵",
    title: "Songs, games & recitation",
    description: "Younger students learn vocabulary and pronunciation through music, rhymes, and interactive games.",
  },
  {
    icon: "🌾",
    title: "Cultural connection",
    description: "Field visits, festivals, and family involvement reinforce that language and culture are lived, not just studied.",
  },
];

const schedule = [
  { day: "Monday", topic: "Vocabulary & Speaking Practice" },
  { day: "Tuesday", topic: "Grammar & Sentence Structure" },
  { day: "Wednesday", topic: "Reading Circle" },
  { day: "Thursday", topic: "Writing Workshop" },
  { day: "Friday", topic: "Storytelling & Culture Hour" },
];

export default function CurriculumPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary-50 to-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <span className="rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold text-primary-700">
            Curriculum
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl">
            The Sambata Language Program
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Alongside math, science, and the arts, every student at Manju Shree Primary School
            studies the Sambata language — keeping it alive for generations to come.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-primary-950">Learning by Level</h2>
          <p className="mt-3 text-gray-600">
            The program builds progressively from spoken foundations to advanced
            literature and composition.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {levels.map((level) => (
            <div
              key={level.stage}
              className="flex flex-col rounded-2xl border border-primary-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                  {level.grades}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-primary-900">
                {level.stage}
              </h3>
              <p className="text-sm font-medium text-accent-600">{level.focus}</p>
              <p className="mt-2 text-sm leading-6 text-gray-600">{level.description}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-gray-600">
                {level.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2">
                    <span className="mt-1 text-primary-500">•</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-primary-950">Our Teaching Approach</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {methodology.map((m) => (
              <div key={m.title} className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm">
                <span className="text-3xl">{m.icon}</span>
                <div>
                  <h3 className="font-semibold text-primary-900">{m.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-gray-600">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-primary-950">Sample Weekly Schedule</h2>
          <p className="mt-3 text-gray-600">
            Sambata language class meets daily, with a focused theme each day.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-primary-100">
          <table className="w-full text-left text-sm">
            <thead className="bg-primary-600 text-white">
              <tr>
                <th className="px-6 py-3 font-semibold">Day</th>
                <th className="px-6 py-3 font-semibold">Focus</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row, i) => (
                <tr
                  key={row.day}
                  className={i % 2 === 0 ? "bg-white" : "bg-primary-50/60"}
                >
                  <td className="px-6 py-3 font-medium text-primary-900">{row.day}</td>
                  <td className="px-6 py-3 text-gray-600">{row.topic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
