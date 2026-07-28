import type { Metadata } from "next";
import Image from "next/image";
import { getDictionary, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

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

const leaderMeta = [
  { key: "founder", color: "bg-primary-600" },
  { key: "principal", color: "bg-accent-500" },
  { key: "advisor", color: "bg-primary-700" },
] as const;

const teacherMeta = [
  { key: "languageLead", color: "bg-primary-500" },
  { key: "math", color: "bg-accent-600" },
  { key: "science", color: "bg-primary-700" },
  { key: "primary", color: "bg-accent-500" },
  { key: "arts", color: "bg-primary-600" },
  { key: "volunteer", color: "bg-accent-700" },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: `${dict.team.badge} | ${dict.meta.schoolName}`,
    description: dict.team.subtitle,
  };
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <div>
      <section className="bg-gradient-to-b from-primary-50 to-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <span className="rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold text-primary-700">
            {dict.team.badge}
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl">
            {dict.team.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">{dict.team.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6">
        <div className="overflow-hidden rounded-2xl border border-primary-100">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src="/photos/community-group.jpeg"
              alt={dict.team.communityCaption}
              fill
              className="object-cover object-bottom"
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
          </div>
        </div>
        <p className="mt-3 text-center text-sm text-gray-500">
          {dict.team.communityCaption}
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-8">
          {leaderMeta.map(({ key, color }) => {
            const entry = dict.team.leaders[key];
            const leaders = Array.isArray(entry) ? entry : entry ? [entry] : [];
            return leaders.map((leader, i) => (
              <div
                key={`${key}-${i}`}
                className="flex flex-col rounded-2xl border border-primary-100 bg-white p-8 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <Avatar name={leader.name} color={color} />
                  <div>
                    <h3 className="font-semibold text-primary-900">{leader.name}</h3>
                    <p className="text-sm text-accent-600">{leader.role}</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-7 text-gray-600 italic">
                  {leader.message}
                </p>
              </div>
            ));
          })}
        </div>
      </section>

      <section className="bg-primary-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-primary-950">{dict.team.teachersTitle}</h2>
            <p className="mt-3 text-gray-600">{dict.team.teachersSubtitle}</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teacherMeta.map(({ key, color }) => {
              const teacher = dict.team.teachers[key];
              return (
                <div
                  key={key}
                  className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-sm"
                >
                  <Avatar name={teacher.name} color={color} />
                  <h3 className="mt-4 font-semibold text-primary-900">{teacher.name}</h3>
                  <p className="text-sm text-accent-600">{teacher.role}</p>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{teacher.bio}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
