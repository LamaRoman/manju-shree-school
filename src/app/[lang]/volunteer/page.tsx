import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import VolunteerForm from "@/components/VolunteerForm";
import { getDictionary, isLocale } from "@/lib/i18n";
import { resolvePhoto } from "@/lib/photo";
import { notFound } from "next/navigation";
import {
  ArrowLink,
  buttonSecondary,
  Card,
  IconTile,
  PageHero,
  ProfilePhoto,
  Prose,
  SectionHeading,
} from "@/components/ui";

const categoryMeta = [
  { key: "food", icon: "🍲" },
  { key: "hygiene", icon: "🩸" },
  { key: "stationery", icon: "✏️" },
] as const;

const stepMeta = ["choose", "tell", "coordinate", "reach"] as const;

const expectMeta = [
  { key: "homestay", icon: "🏡" },
  { key: "included", icon: "🍽️" },
  { key: "facilities", icon: "🚿" },
  { key: "rules", icon: "📋" },
  { key: "commitment", icon: "🗓️" },
  { key: "proposal", icon: "💡" },
] as const;

// Photos are dropped into public/photos as volunteers send them in — see
// resolvePhoto. Both of these are pending, so cards render with initials
// until a file lands at the path below.
const storiesMeta = [
  { key: "colette", photo: "/photos/volunteer-colette-baron.jpg" },
  { key: "kavya", photo: "/photos/volunteer-kavya-sreekumar.jpg" },
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
    title: `${dict.volunteer.badge} | ${dict.meta.schoolName}`,
    description: dict.volunteer.subtitle,
  };
}

export default async function VolunteerPage({
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
        eyebrow={dict.volunteer.badge}
        title={dict.volunteer.title}
        lede={dict.volunteer.subtitle}
      />

      <section className="mx-auto max-w-5xl px-6 pt-16">
        <figure>
          <div className="relative aspect-[16/7] w-full overflow-hidden rounded-3xl shadow-lift">
            <Image
              src="/photos/opening-ceremony.jpeg"
              alt={dict.volunteer.photoCaption}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
          </div>
          <figcaption className="mt-4 text-center text-sm text-gray-500">
            {dict.volunteer.photoCaption}
          </figcaption>
        </figure>

        <p className="mt-8 text-center">
          <a href="#stories" className={buttonSecondary}>
            {dict.volunteer.storiesLinkLabel}
          </a>
        </p>
      </section>

      {/* Ways to help */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          title={dict.volunteer.waysTitle}
          subtitle={dict.volunteer.waysSubtitle}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {categoryMeta.map(({ key, icon }, i) => {
            const cat = dict.volunteer.categories[key];
            return (
              <Card key={key} delay={i * 90} className="flex flex-col">
                <IconTile icon={icon} tone="accent" />
                <h3 className="mt-5 font-display text-lg font-semibold text-primary-950">
                  {cat.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {cat.description}
                </p>
                <ul className="mt-5 space-y-2 border-t border-gray-200 pt-5 text-sm text-gray-600">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-gray-200/70 bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading title={dict.volunteer.howTitle} />

          <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stepMeta.map((key, i) => {
              const step = dict.volunteer.steps[key];
              return (
                <li key={key} className="relative">
                  {/* Connector between steps, desktop only. */}
                  {i < stepMeta.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute left-[calc(50%+2rem)] right-[calc(-50%+2rem)] top-5 hidden h-px bg-gray-300 lg:block"
                    />
                  )}
                  <div className="relative text-center">
                    <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-primary-200 bg-white font-display text-sm font-semibold text-primary-800 shadow-soft">
                      {i + 1}
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-primary-950">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* What to expect */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          title={dict.volunteer.expectTitle}
          subtitle={dict.volunteer.expectSubtitle}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {expectMeta.map(({ key, icon }, i) => {
            const item = dict.volunteer.expectations[key];
            return (
              <Card key={key} delay={i * 70} className="flex gap-5">
                <IconTile icon={icon} />
                <div>
                  <h3 className="font-display text-base font-semibold text-primary-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {item.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        <p className="mt-10 text-center">
          <Link href={`/${lang}/trekking`} className="group">
            <ArrowLink label={dict.volunteer.trekkingLink} />
          </Link>
        </p>
      </section>

      {/* Volunteer stories */}
      <section
        id="stories"
        className="scroll-mt-24 border-t border-gray-200/70 bg-paper-deep"
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading
            title={dict.volunteer.storiesTitle}
            subtitle={dict.volunteer.storiesSubtitle}
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {storiesMeta.map(({ key, photo }, i) => {
              const story = dict.volunteer.stories[key];
              return (
                <Card key={key} delay={i * 90} className="flex flex-col p-7">
                  <div className="flex items-center gap-4">
                    <ProfilePhoto
                      src={resolvePhoto(photo)}
                      name={story.name}
                      size="sm"
                    />
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-semibold leading-tight text-primary-950">
                        {story.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-accent-700">
                        {"year" in story && story.year
                          ? `${story.location} · ${story.year}`
                          : story.location}
                      </p>
                    </div>
                  </div>

                  <Prose
                    text={story.message}
                    className="mt-5 text-sm leading-7 text-gray-600"
                  />
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="border-t border-gray-200/70 bg-paper-deep">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <SectionHeading
            title={dict.volunteer.ctaTitle}
            subtitle={dict.volunteer.ctaSubtitle}
          />
          <div className="mt-12">
            <VolunteerForm dict={dict} />
          </div>
        </div>
      </section>
    </div>
  );
}
