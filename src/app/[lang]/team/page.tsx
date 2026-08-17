import type { Metadata } from "next";
import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";
import { getDictionary, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Card, PageHero, Prose, SectionHeading } from "@/components/ui";

/** Photos are dropped into public/photos by hand as people send them in, so a
 *  configured path may not exist yet. Checking at render time means a missing
 *  file falls back to initials instead of showing a broken image. */
function resolvePhoto(photo?: string) {
  if (!photo) return undefined;
  return existsSync(path.join(process.cwd(), "public", photo))
    ? photo
    : undefined;
}

/** A plain filled circle for whoever doesn't have a photo yet — squared off
 *  to match ProfilePhoto's tile so a mix of photos and initials in the same
 *  grid still reads as one consistent shape language. */
function Avatar({ name, size }: { name: string; size: "sm" | "lg" }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      className={`flex shrink-0 items-center justify-center bg-primary-100 font-display font-semibold text-primary-800 ${
        size === "lg"
          ? "h-36 w-36 rounded-[1.75rem] text-4xl"
          : "h-16 w-16 rounded-2xl text-lg"
      }`}
    >
      {initials}
    </div>
  );
}

/** A rounded-square tile with a second, rotated tile of the same photo
 *  peeking out behind it — the "stacked photo" motif used for the building
 *  and community photos elsewhere on this page, brought down to portrait
 *  scale instead of the plain circle avatar this replaced.
 *
 *  These are ID-style portraits: a lot of blank headroom above the hair and
 *  shoulder/chest below the chin. `object-[50%_22%]` biases the crop toward
 *  that headroom so the square trims mostly blank space and shoulder rather
 *  than slicing through the chin the way a centered crop was doing. */
function ProfilePhoto({
  src,
  name,
  size,
}: {
  src?: string;
  name: string;
  size: "sm" | "lg";
}) {
  if (!src) return <Avatar name={name} size={size} />;

  const dims = size === "lg" ? "h-36 w-36" : "h-16 w-16";
  const radius = size === "lg" ? "rounded-[1.75rem]" : "rounded-2xl";

  return (
    <div className={`relative shrink-0 ${dims}`}>
      <div
        aria-hidden
        className={`absolute inset-0 -z-10 ${radius} bg-accent-200/70 rotate-6`}
      />
      <div
        className={`relative h-full w-full -rotate-3 overflow-hidden ${radius} shadow-lift ring-4 ring-white`}
      >
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover object-[50%_22%]"
          sizes={size === "lg" ? "144px" : "64px"}
        />
      </div>
    </div>
  );
}

type Person = {
  name: string;
  role: string;
  message: string;
  title?: string;
  credentials?: string;
};

const leadershipMeta = [
  { key: "founder", photo: "/photos/founder-khenpo-kalsang.jpg" },
  { key: "principal" },
] as const;

const advisoryMeta = [
  {
    key: "advisor",
    photos: [
      "/photos/advisor-sudha-shrestha1.jpg",
      undefined,
      "/photos/advisor-khenpo-ngodrub-gyatso.jpg",
    ],
  },
  {
    key: "coordinator",
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
      <PageHero
        eyebrow={dict.team.badge}
        title={dict.team.title}
        lede={dict.team.subtitle}
      />

      {/* This is a portrait photo (3024x4032). Forcing it into a wide banner
          with object-cover showed only the bottom ~40% and cut everyone's
          heads off, so it is sized from its own aspect ratio instead of a
          fixed frame — nothing is cropped. */}
      <section className="mx-auto max-w-5xl px-6 pt-16">
        <figure className="mx-auto max-w-md">
          <div className="relative">
            <Image
              src="/photos/community-group.jpeg"
              alt={dict.team.communityCaption}
              width={3024}
              height={4032}
              className="h-auto w-full rounded-3xl shadow-lift"
              sizes="(min-width: 640px) 448px, 100vw"
            />
            <div
              aria-hidden
              className="absolute -bottom-5 -right-5 -z-10 h-32 w-32 rounded-3xl bg-accent-200/60"
            />
          </div>
          <figcaption className="mt-5 text-center text-sm text-gray-500">
            {dict.team.communityCaption}
          </figcaption>
        </figure>
      </section>

      {/* --------------------------------------------------------------- */}
      {/* Leadership letters.                                             */}
      {/*                                                                 */}
      {/* These messages run to several hundred words each. Boxing them   */}
      {/* into side-by-side cards forced a very narrow measure and buried  */}
      {/* the portraits; giving each person a full row — portrait beside   */}
      {/* the letter — lets the text keep a readable line length.          */}
      {/* --------------------------------------------------------------- */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="space-y-16">
          {leadershipMeta.map(({ key, ...rest }, i) => {
            const photo = resolvePhoto(
              "photo" in rest ? rest.photo : undefined,
            );
            const leader = dict.team.leaders[key] as Person;

            return (
              <article key={key}>
                {i > 0 && <hr className="rule-fade mb-16" />}
                <div className="grid gap-10 md:grid-cols-[auto_1fr] md:gap-12">
                  <div className="flex flex-col items-center text-center md:sticky md:top-28 md:h-fit md:w-44">
                    <ProfilePhoto src={photo} name={leader.name} size="lg" />
                    <h2 className="mt-5 font-display text-xl font-semibold leading-tight text-primary-950">
                      {leader.name}
                    </h2>
                    <span className="mt-3 inline-block rounded-full bg-primary-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-primary-700">
                      {leader.role}
                    </span>
                  </div>

                  <div className="relative">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -left-2 -top-10 font-display text-[7rem] leading-none text-primary-100 select-none"
                    >
                      &ldquo;
                    </span>
                    <Prose
                      text={leader.message}
                      className="relative leading-8 text-gray-600"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Advisors & coordinators */}
      <section className="border-t border-gray-200/70 bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading title={dict.team.advisoryTitle} align="left" />

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {advisoryMeta
              .flatMap(({ key, photos }) => {
                const entry = dict.team.leaders[key];
                const people = (
                  Array.isArray(entry) ? entry : entry ? [entry] : []
                ) as Person[];
                return people.map((person, i) => ({
                  cardKey: `${key}-${i}`,
                  photo: photos?.[i],
                  person,
                }));
              })
              // Flattened first so the stagger below is one continuous count
              // down the grid, rather than resetting when advisors hand off
              // to coordinators.
              .map(({ cardKey, photo, person }, i) => (
                <Card
                  key={cardKey}
                  delay={i * 70}
                  className="flex flex-col p-7"
                >
                  <div className="flex items-center gap-4">
                    <ProfilePhoto
                      src={resolvePhoto(photo)}
                      name={person.name}
                      size="sm"
                    />
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-semibold leading-tight text-primary-950">
                        {person.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-accent-700">
                        {person.role}
                      </p>
                    </div>
                  </div>

                  {(person.title || person.credentials) && (
                    <div className="mt-4 space-y-1 border-l-2 border-accent-200 pl-4 text-xs leading-5 text-gray-500">
                      {person.title && <p>{person.title}</p>}
                      {person.credentials && <p>{person.credentials}</p>}
                    </div>
                  )}

                  <Prose
                    text={person.message}
                    className="mt-5 text-sm leading-7 text-gray-600"
                  />
                </Card>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
