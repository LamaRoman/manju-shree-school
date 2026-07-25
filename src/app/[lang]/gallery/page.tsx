import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { getGalleryPhotos } from "@/lib/gallery";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: `${dict.gallery.title} | ${dict.meta.schoolName}`,
    description: dict.gallery.subtitle,
  };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const photos = await getGalleryPhotos();

  return (
    <div>
      <section className="bg-gradient-to-b from-primary-50 to-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <span className="rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold text-primary-700">
            {dict.gallery.badge}
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl">
            {dict.gallery.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">{dict.gallery.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        {photos.length === 0 ? (
          <p className="text-center text-gray-500">{dict.gallery.empty}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3] w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.url}
                    alt={photo.caption || ""}
                    className="h-full w-full object-cover"
                  />
                </div>
                {(photo.caption || photo.description) && (
                  <div className="p-4">
                    {photo.caption && (
                      <p className="font-semibold text-primary-900">{photo.caption}</p>
                    )}
                    {photo.description && (
                      <p className="mt-1 text-sm leading-6 text-gray-600">{photo.description}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
