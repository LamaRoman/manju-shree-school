import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";

export default function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <footer className="border-t border-primary-100 bg-primary-950 text-primary-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt={`${dict.meta.schoolName} logo`}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full bg-white object-contain p-0.5"
            />
            <span className="text-lg font-bold text-white">{dict.meta.schoolName}</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-primary-200">{dict.footer.tagline}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            {dict.footer.explore}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href={`/${lang}/about`} className="hover:text-white">
                {dict.footer.aboutUs}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/curriculum`} className="hover:text-white">
                {dict.nav.curriculum}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/calendar`} className="hover:text-white">
                {dict.nav.calendar}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/trekking`} className="hover:text-white">
                {dict.footer.trekking}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/volunteer`} className="hover:text-white">
                {dict.nav.volunteer}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/team`} className="hover:text-white">
                {dict.footer.ourTeam}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/support`} className="hover:text-white">
                {dict.nav.support}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            {dict.footer.contact}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-200">
            <li>{dict.footer.address1}</li>
            <li>{dict.footer.address2}</li>
            <li>
              <a href="mailto:manjushreeschool2024@gmail.com" className="hover:text-white">
                manjushreeschool2024@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+9779860739933" className="hover:text-white">
                +977 986-0739933
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            {dict.footer.supportUs}
          </h3>
          <p className="mt-4 text-sm text-primary-200">{dict.footer.supportUsText}</p>
          <Link
            href={`/${lang}/volunteer`}
            className="mt-4 inline-block rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600"
          >
            {dict.footer.becomeVolunteer}
          </Link>
          <Link
            href={`/${lang}/support`}
            className="mt-3 block text-sm font-semibold text-primary-100 hover:text-white"
          >
            {dict.footer.supportBuildingLink} →
          </Link>
        </div>
      </div>

      <div className="border-t border-primary-800 px-6 py-5 text-center text-xs text-primary-300">
        © {new Date().getFullYear()} {dict.meta.schoolName}. {dict.footer.rights}
      </div>
    </footer>
  );
}
