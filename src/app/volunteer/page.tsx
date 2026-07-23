import type { Metadata } from "next";
import VolunteerForm from "@/components/VolunteerForm";
import { DonationIllustration } from "@/components/illustrations";

export const metadata: Metadata = {
  title: "Volunteer | Manju Shree Primary School",
  description:
    "Support Manju Shree Primary School students by donating food, sanitary pads, and stationery, or by volunteering your time.",
};

const donationCategories = [
  {
    icon: "🍲",
    title: "Food",
    description:
      "Many students travel long distances and rely on school meals to get through the day.",
    items: ["Rice, lentils & grains", "Cooking oil & seasoning", "Fresh vegetables & fruit", "Milk & nutritional supplements"],
  },
  {
    icon: "🩸",
    title: "Sanitary Pads & Hygiene",
    description:
      "Access to hygiene products helps girls stay in school with dignity, every day of the month.",
    items: ["Sanitary pads", "Soap & hand sanitizer", "Toothbrushes & toothpaste", "Hygiene education materials"],
  },
  {
    icon: "✏️",
    title: "Stationery",
    description:
      "Basic school supplies remove a major barrier for families who cannot afford them.",
    items: ["Notebooks & exercise books", "Pens, pencils & erasers", "School bags", "Textbooks & reading materials"],
  },
];

const steps = [
  {
    title: "Choose how you'll help",
    description: "Pick one or more categories — food, hygiene supplies, stationery, or your time.",
  },
  {
    title: "Tell us your plan",
    description: "Fill out the form below, or email us directly, with what you'd like to contribute.",
  },
  {
    title: "We coordinate delivery",
    description: "Our volunteer coordinator arranges drop-off, pickup, or an in-kind purchase together with you.",
  },
  {
    title: "Your donation reaches students",
    description: "Items are distributed directly to the students and families who need them most.",
  },
];

export default function VolunteerPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-accent-50 to-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <span className="rounded-full bg-accent-100 px-4 py-1 text-sm font-semibold text-accent-700">
            Volunteer With Us
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl">
            Food, Hygiene Supplies &amp; Stationery for Our Students
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Many of our students face daily barriers that have nothing to do with
            learning — an empty stomach, a missing pencil, or a lack of hygiene
            products. Our volunteers make sure those barriers don&apos;t stand in the
            way of an education.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6">
        <div className="overflow-hidden rounded-2xl border border-accent-100">
          <div className="aspect-[16/7] w-full">
            <DonationIllustration />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-primary-950">Ways to Give</h2>
          <p className="mt-3 text-gray-600">
            Every donation, big or small, goes directly to a student who needs it.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {donationCategories.map((cat) => (
            <div
              key={cat.title}
              className="flex flex-col rounded-2xl border border-primary-100 bg-white p-6 shadow-sm"
            >
              <span className="text-3xl">{cat.icon}</span>
              <h3 className="mt-3 text-lg font-semibold text-primary-900">{cat.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{cat.description}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-gray-600">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 text-accent-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary-50">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-primary-950">How It Works</h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-3 font-semibold text-primary-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary-950">Ready to Get Involved?</h2>
          <p className="mt-3 text-gray-600">
            Share a few details below and our volunteer coordinator will follow up with
            next steps.
          </p>
        </div>
        <div className="mt-10">
          <VolunteerForm />
        </div>
      </section>
    </div>
  );
}
