import type { Metadata } from "next";
import Image from "next/image";
import { getDictionary, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

function Avatar({
  name,
  color,
  size = "md",
}: {
  name: string;
  color: string;
  size?: "md" | "lg";
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const sizeClasses = size === "lg" ? "h-20 w-20 text-2xl" : "h-14 w-14 text-base";

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-bold text-white ${sizeClasses} ${color}`}
    >
      {initials}
    </div>
  );
}

const leadershipMeta = [
  { key: "founder", color: "bg-primary-600" },
  { key: "principal", color: "bg-accent-500" },
] as const;

const advisoryMeta = [
  { key: "advisor", color: "bg-primary-700" },
  { key: "coordinator", color: "bg-accent-700" },
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
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
          {leadershipMeta.map(({ key, color }) => {
            const leader = dict.team.leaders[key] as {
              name: string;
              role: string;
              message: string;
              title?: string;
              credentials?: string;
            };
            return (
              <div
                key={key}
                className="relative flex flex-col overflow-hidden rounded-2xl border border-primary-100 bg-white p-8 shadow-sm"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-4 -top-6 font-serif text-[8rem] leading-none text-primary-50"
                >
                  &rdquo;
                </span>
                <div className="relative flex items-center gap-4">
                  <Avatar name={leader.name} color={color} size="lg" />
                  <div>
                    <h3 className="text-lg font-semibold text-primary-900">{leader.name}</h3>
                    <p className="text-sm font-medium text-accent-600">{leader.role}</p>
                  </div>
                </div>
                <p className="relative mt-6 flex-1 text-sm leading-7 text-gray-600 italic">
                  {leader.message}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-bold text-primary-950">{dict.team.advisoryTitle}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {advisoryMeta.map(({ key, color }) => {
              const entry = dict.team.leaders[key];
              const advisors = (
                Array.isArray(entry) ? entry : entry ? [entry] : []
              ) as { name: string; role: string; message: string; title?: string; credentials?: string }[];
              return advisors.map((leader, i) => (
                <div
                  key={`${key}-${i}`}
                  className="flex flex-col rounded-2xl bg-primary-50/60 p-6"
                >
                  <div className="flex items-center gap-3">
                    <Avatar name={leader.name} color={color} />
                    <div>
                      <h3 className="font-semibold text-primary-900">{leader.name}</h3>
                      <p className="text-sm text-accent-600">{leader.role}</p>
                      {leader.title && (
                        <p className="mt-0.5 text-xs text-gray-600">{leader.title}</p>
                      )}
                      {leader.credentials && (
                        <p className="mt-0.5 text-xs text-gray-500">{leader.credentials}</p>
                      )}
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-gray-600 italic">
                    {leader.message}
                  </p>
                </div>
              ));
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
