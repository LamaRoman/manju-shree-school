import type { Metadata } from "next";
import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";
import { getDictionary, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

function resolvePhoto(photo?: string) {
  if (!photo) return undefined;
  return existsSync(path.join(process.cwd(), "public", photo))
    ? photo
    : undefined;
}

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

  const sizeClasses =
    size === "lg" ? "h-28 w-28 text-3xl" : "h-14 w-14 text-base";

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-bold text-white ring-4 ring-primary-50 ${sizeClasses} ${color}`}
    >
      {initials}
    </div>
  );
}

function ProfilePhoto({
  src,
  alt,
  name,
  color,
  size = "md",
}: {
  src?: string;
  alt: string;
  name: string;
  color: string;
  size?: "md" | "lg";
}) {
  if (!src) return <Avatar name={name} color={color} size={size} />;

  const sizeClasses = size === "lg" ? "h-28 w-28" : "h-14 w-14";

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full ring-4 ring-primary-50 ${sizeClasses}`}
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes="112px" />
    </div>
  );
}

const leadershipMeta = [
  {
    key: "founder",
    color: "bg-primary-600",
    photo: "/photos/founder-khenpo-kalsang.jpg",
  },
  { key: "principal", color: "bg-accent-500" },
] as const;

const advisoryMeta = [
  {
    key: "advisor",
    color: "bg-primary-700",
    photos: [
      "/photos/advisor-sudha-shrestha1.jpg",
      undefined,
      "/photos/advisor-khenpo-ngodrub-gyatso.jpg",
    ],
  },
  {
    key: "coordinator",
    color: "bg-accent-700",
    photos: ["/photos/coordinator-tenzin-sangmo.jpg"],
  },
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
          <p className="mt-4 text-lg leading-8 text-gray-600">
            {dict.team.subtitle}
          </p>
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
          {leadershipMeta.map(({ key, color, ...rest }) => {
            const photo = resolvePhoto(
              "photo" in rest ? rest.photo : undefined,
            );
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
                className="relative flex flex-col items-center overflow-hidden rounded-2xl border border-primary-100 bg-white p-8 text-center shadow-sm"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-4 -top-6 font-serif text-[8rem] leading-none text-primary-50"
                >
                  &rdquo;
                </span>
                <ProfilePhoto
                  src={photo}
                  alt={leader.name}
                  name={leader.name}
                  color={color}
                  size="lg"
                />
                <h3 className="relative mt-4 text-lg font-semibold text-primary-900">
                  {leader.name}
                </h3>
                <span className="relative mt-2 inline-block rounded-full bg-primary-50 px-4 py-1 text-sm font-medium text-primary-700">
                  {leader.role}
                </span>
                <p className="relative mt-6 flex-1 text-left text-sm leading-7 text-gray-600 italic">
                  {leader.message}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-bold text-primary-950">
            {dict.team.advisoryTitle}
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {advisoryMeta.map(({ key, color, ...rest }) => {
              const photos = "photos" in rest ? rest.photos : undefined;
              const entry = dict.team.leaders[key];
              const advisors = (
                Array.isArray(entry) ? entry : entry ? [entry] : []
              ) as {
                name: string;
                role: string;
                message: string;
                title?: string;
                credentials?: string;
              }[];
              return advisors.map((leader, i) => (
                <div
                  key={`${key}-${i}`}
                  className="flex flex-col rounded-2xl bg-primary-50/60 p-6"
                >
                  <div className="flex items-center gap-3">
                    <ProfilePhoto
                      src={resolvePhoto(photos?.[i])}
                      alt={leader.name}
                      name={leader.name}
                      color={color}
                    />
                    <div>
                      <h3 className="font-semibold text-primary-900">
                        {leader.name}
                      </h3>
                      <p className="text-sm text-accent-600">{leader.role}</p>
                      {leader.title && (
                        <p className="mt-0.5 text-xs text-gray-600">
                          {leader.title}
                        </p>
                      )}
                      {leader.credentials && (
                        <p className="mt-0.5 text-xs text-gray-500">
                          {leader.credentials}
                        </p>
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
