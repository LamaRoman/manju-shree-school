"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

const fieldClass =
  "mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/25";

const labelClass = "text-sm font-medium text-gray-700";

export default function VolunteerForm({ dict }: { dict: Dictionary }) {
  const [submitted, setSubmitted] = useState(false);
  const form = dict.volunteer.form;

  const interests = [
    form.interests.food,
    form.interests.hygiene,
    form.interests.stationery,
    form.interests.time,
    form.interests.other,
  ];

  if (submitted) {
    return (
      <div className="rounded-2xl border border-accent-200/70 bg-accent-50/60 p-10 text-center">
        <p className="text-3xl">🙏</p>
        <h3 className="mt-4 font-display text-xl font-semibold text-primary-950">
          {form.thankYouTitle}
        </h3>
        <p className="mt-3 text-sm leading-6 text-gray-600">
          {form.thankYouText}{" "}
          <a
            href="mailto:manjushreeschool2024@gmail.com"
            className="font-semibold text-primary-700 underline underline-offset-2"
          >
            manjushreeschool2024@gmail.com
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const name = data.get("name")?.toString().trim() ?? "";
        const email = data.get("email")?.toString().trim() ?? "";
        const message = data.get("message")?.toString().trim() ?? "";
        const selectedInterests = data.getAll("interest").map(String);

        const lines = [
          `*${dict.meta.schoolName}*`,
          `${form.nameLabel}: ${name}`,
          `${form.emailLabel}: ${email}`,
          `${form.interestsLabel}: ${selectedInterests.length ? selectedInterests.join(", ") : "-"}`,
          `${form.messageLabel}: ${message || "-"}`,
        ];

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
        window.open(url, "_blank", "noopener,noreferrer");

        setSubmitted(true);
      }}
      className="space-y-6 rounded-2xl border border-gray-200/80 bg-white p-8 shadow-soft sm:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            {form.nameLabel}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={fieldClass}
            placeholder={form.namePlaceholder}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            {form.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={fieldClass}
            placeholder={form.emailPlaceholder}
          />
        </div>
      </div>

      <fieldset>
        <legend className={labelClass}>{form.interestsLabel}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {interests.map((interest) => (
            <label
              key={interest}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 transition-colors hover:border-gray-400 has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 has-[:checked]:text-primary-800"
            >
              <input
                type="checkbox"
                name="interest"
                value={interest}
                className="h-3.5 w-3.5 accent-primary-600"
              />
              {interest}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className={labelClass}>
          {form.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={fieldClass}
          placeholder={form.messagePlaceholder}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-accent-400 px-7 py-3.5 text-base font-semibold text-primary-950 shadow-soft transition hover:bg-accent-300 hover:shadow-lift active:translate-y-px sm:w-auto"
      >
        {form.submit}
      </button>
    </form>
  );
}
