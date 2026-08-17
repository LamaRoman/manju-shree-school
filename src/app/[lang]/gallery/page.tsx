import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { getGalleryPhotos, groupPhotosByCaption } from "@/lib/gallery";
import GalleryGrid from "./GalleryGrid";
import { PageHero } from "@/components/ui";

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
  const groups = groupPhotosByCaption(photos);

  return (
    <div>
      <PageHero title={dict.gallery.title} lede={dict.gallery.subtitle} />

      <section className="mx-auto max-w-6xl px-6 py-16">
        {photos.length === 0 ? (
          <p className="text-center text-gray-500">{dict.gallery.empty}</p>
        ) : (
          <GalleryGrid
            groups={groups}
            labels={{
              uncategorized: dict.gallery.uncategorized,
              previous: dict.gallery.previous,
              next: dict.gallery.next,
              close: dict.gallery.close,
            }}
          />
        )}
      </section>
    </div>
  );
}
