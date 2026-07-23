import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-primary-100 bg-primary-950 text-primary-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Manju Shree Primary School logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full bg-white object-contain p-0.5"
            />
            <span className="text-lg font-bold text-white">Manju Shree Primary School</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-primary-200">
            Nurturing curious minds and preserving the Sambata language and culture, one
            student at a time.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/curriculum" className="hover:text-white">
                Curriculum
              </Link>
            </li>
            <li>
              <Link href="/volunteer" className="hover:text-white">
                Volunteer
              </Link>
            </li>
            <li>
              <Link href="/team" className="hover:text-white">
                Our Team
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Contact
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-200">
            <li>Manju Shree Primary School</li>
            <li>Patarasi-3, Jumla, Nepal</li>
            <li>
              <a href="mailto:manjushreeprimary.jumla@gmail.com" className="hover:text-white">
                manjushreeprimary.jumla@gmail.com
              </a>
            </li>
            <li>+977-XX-XXXXXX</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Support Us
          </h3>
          <p className="mt-4 text-sm text-primary-200">
            Donations of food, sanitary pads, and stationery directly reach our students.
          </p>
          <Link
            href="/volunteer"
            className="mt-4 inline-block rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600"
          >
            Become a Volunteer
          </Link>
        </div>
      </div>

      <div className="border-t border-primary-800 px-6 py-5 text-center text-xs text-primary-300">
        © {new Date().getFullYear()} Manju Shree Primary School. All rights reserved.
      </div>
    </footer>
  );
}
