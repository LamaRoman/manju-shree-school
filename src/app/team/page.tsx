import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team | Manju Shree Primary School",
  description:
    "Messages from the founder and principal of Manju Shree Primary School, and profiles of our dedicated teaching staff.",
};

function Avatar({ name, color }: { name: string; color: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white ${color}`}
    >
      {initials}
    </div>
  );
}

const leaderMessages = [
  {
    name: "Him Bahadur Shahi",
    role: "Founder",
    color: "bg-primary-600",
    message:
      "“I started Manju Shree Primary School in a borrowed room because our village had no school within reach for our children. Nearly two decades later, I'm humbled to see how a small idea grew into a place where hundreds of students learn, grow, and stay connected to who they are. My hope has always been simple: that every child here leaves with both an education and their identity intact.”",
  },
  {
    name: "Kamala Devi Rawal",
    role: "Principal",
    color: "bg-accent-500",
    message:
      "“Every morning I get to watch our teachers turn a classroom into a place of curiosity and confidence. We hold our students to high academic standards while making sure no child is held back by hunger, a missing notebook, or something they couldn't control. That balance — rigor and care — is what Manju Shree Primary School stands for.”",
  },
];

const teachers = [
  {
    name: "Dil Kumari Budha",
    role: "Sambata Language Lead",
    color: "bg-primary-500",
    bio: "Leads our Sambata language program across all levels and coordinates with community elders on oral history lessons.",
  },
  {
    name: "Bishnu Prasad Sharma",
    role: "Mathematics Teacher",
    color: "bg-accent-600",
    bio: "Teaches grades 3–5 mathematics and runs our after-school math club.",
  },
  {
    name: "Sarita Rawal",
    role: "Science Teacher",
    color: "bg-primary-700",
    bio: "Brings hands-on experiments to life for our primary science classes.",
  },
  {
    name: "Purna Bahadur Shahi",
    role: "Primary Grades Teacher",
    color: "bg-accent-500",
    bio: "Guides our youngest learners (grades 1–2) through their first years of reading, writing, and Sambata basics.",
  },
  {
    name: "Devi Maya Budha",
    role: "Arts & Music Teacher",
    color: "bg-primary-600",
    bio: "Runs music, art, and traditional dance classes that celebrate Sambata culture.",
  },
  {
    name: "Krishna Bahadur Rawal",
    role: "Volunteer Coordinator",
    color: "bg-accent-700",
    bio: "Manages our volunteer network and coordinates food, hygiene, and stationery donation drives.",
  },
];

export default function TeamPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary-50 to-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <span className="rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold text-primary-700">
            Our Team
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl">
            The People Behind Manju Shree Primary School
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Meet the founder, principal, and teachers who bring our mission to life
            every day.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {leaderMessages.map((leader) => (
            <div
              key={leader.name}
              className="flex flex-col rounded-2xl border border-primary-100 bg-white p-8 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <Avatar name={leader.name} color={leader.color} />
                <div>
                  <h3 className="font-semibold text-primary-900">{leader.name}</h3>
                  <p className="text-sm text-accent-600">{leader.role}</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-gray-600 italic">
                {leader.message}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-primary-950">Our Teachers &amp; Staff</h2>
            <p className="mt-3 text-gray-600">
              A dedicated team of educators and coordinators serving our students every
              day.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teachers.map((teacher) => (
              <div
                key={teacher.name}
                className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-sm"
              >
                <Avatar name={teacher.name} color={teacher.color} />
                <h3 className="mt-4 font-semibold text-primary-900">{teacher.name}</h3>
                <p className="text-sm text-accent-600">{teacher.role}</p>
                <p className="mt-2 text-sm leading-6 text-gray-600">{teacher.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
