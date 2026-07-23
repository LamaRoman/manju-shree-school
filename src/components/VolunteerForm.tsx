"use client";

import { useState } from "react";

const interests = [
  "Food donations",
  "Sanitary pads & hygiene supplies",
  "Stationery & school supplies",
  "Volunteering time / teaching",
  "Other",
];

export default function VolunteerForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-2xl border border-primary-100 bg-primary-50 p-8 text-center">
        <p className="text-2xl">🙏</p>
        <h3 className="mt-2 text-lg font-semibold text-primary-900">
          Thank you for reaching out!
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          We&apos;ve noted your interest. Our volunteer coordinator will contact you at
          the email address you provided within a few days. In the meantime, feel free
          to reach us directly at{" "}
          <a href="mailto:manjushreeprimary.jumla@gmail.com" className="font-medium text-primary-600">
            manjushreeprimary.jumla@gmail.com
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
        setSubmitted(true);
      }}
      className="space-y-5 rounded-2xl border border-primary-100 bg-white p-8 shadow-sm"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="jane@example.com"
          />
        </div>
      </div>

      <div>
        <span className="text-sm font-medium text-gray-700">I&apos;d like to help with</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {interests.map((interest) => (
            <label
              key={interest}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-300 px-3 py-1.5 text-sm text-gray-600 has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 has-[:checked]:text-primary-700"
            >
              <input type="checkbox" name="interest" value={interest} className="accent-primary-600" />
              {interest}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-gray-700">
          Message (optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          placeholder="Tell us how you'd like to contribute..."
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-600 sm:w-auto"
      >
        Submit Interest
      </button>
    </form>
  );
}
