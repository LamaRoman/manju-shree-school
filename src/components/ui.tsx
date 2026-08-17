"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

/* ---------------------------------------------------------------------------
   Shared presentation primitives.

   Every page previously repeated the same hero / section-heading / card markup
   with small inconsistencies (different paddings, heading sizes, badge colors).
   Centralising them here is what makes the site read as one design rather than
   nine similar ones.

   This file is a client boundary only so PageHero/SectionHeading/Card can run
   useReveal below — none of them fetch data or hold real state, so making
   them client components costs nothing and lets every page opt into the same
   scroll-reveal without each page managing observers itself.
--------------------------------------------------------------------------- */

/** Reports whether an element has scrolled into view, once, via
 *  IntersectionObserver — cheaper than a scroll listener and never
 *  re-triggers on scroll-back.
 *
 *  Takes the ref rather than creating and returning one: a custom hook
 *  handing back a ref (or anything wrapping one) trips the react-hooks/refs
 *  lint, which wants every ref's origin traceable to a direct `useRef()`
 *  call at its use site. Callers do
 *  `const ref = useRef(null); const shown = useReveal(ref);` and pass `ref`
 *  straight to the element — no indirection for the linter to lose track of.
 *
 *  Respects prefers-reduced-motion via the global transition-duration
 *  override in globals.css rather than branching here — the transition
 *  below just resolves to ~0ms for those users instead of being skipped. */
function useReveal(ref: RefObject<HTMLElement | null>) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return shown;
}

function revealStyle(shown: boolean, delay = 0) {
  return {
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : "translateY(16px)",
    transitionDelay: `${delay}ms`,
  };
}

// transition-all rather than a narrower property list: Card also uses this
// class on its `interactive` hover state (border-color, box-shadow), and two
// separate transition-property utilities on one element don't merge — the
// later one in Tailwind's stylesheet would simply win and silently drop the
// other's properties.
const revealClass = "transition-all duration-700 ease-out";

/** Small capsule label that sits above a heading. The gold dot is the one
 *  recurring ornament in the system — it ties hero, sections and footer
 *  together without needing an illustration. */
export function Eyebrow({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  const tones =
    tone === "dark"
      ? "border-white/20 bg-white/10 text-accent-200"
      : "border-primary-200/70 bg-white/80 text-primary-700 shadow-soft";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] backdrop-blur ${tones}`}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent-400" />
      {children}
    </span>
  );
}

/** Standard hero for every inner page. The soft garnet bloom behind the title
 *  replaces the old flat blue gradient band. */
export function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useReveal(ref);

  return (
    <section className="relative overflow-hidden border-b border-gray-200/70">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-full"
        style={{
          backgroundImage:
            "radial-gradient(70% 120% at 50% 0%, var(--color-primary-100) 0%, transparent 62%)",
        }}
      />
      <div
        ref={ref}
        style={revealStyle(shown)}
        className={`relative mx-auto max-w-3xl px-6 pt-16 pb-14 text-center sm:pt-20 sm:pb-16 ${revealClass}`}
      >
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-primary-950 sm:text-5xl">
          {title}
        </h1>
        {lede && (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            {lede}
          </p>
        )}
      </div>
    </section>
  );
}

/** Heading block used at the top of content sections. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  const centered = align === "center";
  const ref = useRef<HTMLDivElement>(null);
  const shown = useReveal(ref);

  return (
    <div
      ref={ref}
      style={revealStyle(shown)}
      className={`${revealClass} ${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={`font-display text-3xl font-semibold tracking-tight sm:text-4xl ${
          eyebrow ? "mt-5" : ""
        } ${tone === "dark" ? "text-white" : "text-primary-950"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 leading-7 ${
            tone === "dark" ? "text-primary-100/80" : "text-gray-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/** Tinted tile behind an emoji. Presenting the emoji as a deliberate icon
 *  rather than loose text is most of what separates "designed" from "default"
 *  here — and it keeps the emoji, which read across all four languages. */
export function IconTile({
  icon,
  tone = "primary",
}: {
  icon: string;
  tone?: "primary" | "accent";
}) {
  const tones =
    tone === "accent"
      ? "bg-accent-50 ring-accent-200/70"
      : "bg-primary-50 ring-primary-100";

  return (
    <span
      aria-hidden
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl ring-1 ${tones}`}
    >
      {icon}
    </span>
  );
}

/** Dictionary copy stores multi-paragraph text as "\n\n"-separated strings.
 *  Interpolating those straight into JSX collapses the breaks and produces a
 *  single wall of text — the founder's letter was rendering as one 300-word
 *  block. This restores the paragraphing the copy was written with. */
export function Prose({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className={`space-y-4 ${className}`}>
      {paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
  );
}

export const cardClass =
  "rounded-2xl border border-gray-200/80 bg-white p-6 shadow-soft";

/** Surface for grouped content. `interactive` adds the hover lift — only pass
 *  it for cards that are actually links. `delay` staggers reveal timing when
 *  several cards sit in the same grid (pass `i * 70`, roughly) — capped so a
 *  long grid doesn't leave the last card waiting a full second to appear. */
export function Card({
  children,
  className = "",
  interactive = false,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useReveal(ref);

  return (
    <div
      ref={ref}
      style={revealStyle(shown, Math.min(delay, 400))}
      className={`${cardClass} ${revealClass} ${
        interactive
          ? "hover:-translate-y-1 hover:border-primary-200 hover:shadow-lift"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* Button styles as shared strings — these get applied to Link, a and button
   elements alike, so a component wrapper would only get in the way. */
const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-base font-semibold transition duration-200 active:translate-y-px";

/** Saffron fill with ink text. Deliberately not white-on-gold: white on this
 *  yellow fails contrast badly, dark ink on it clears AAA. */
export const buttonPrimary = `${buttonBase} bg-accent-400 text-primary-950 shadow-soft hover:bg-accent-300 hover:shadow-lift`;

export const buttonSecondary = `${buttonBase} border border-primary-200 bg-white text-primary-800 shadow-soft hover:border-primary-300 hover:bg-primary-50`;

/** For use over photographs and dark garnet fields. */
export const buttonOnDark = `${buttonBase} border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20`;

/** Inline "read more" affordance with an arrow that travels on hover.
 *
 *  Several dictionary strings ship with a literal "→" baked in (all four
 *  locales do, for `home.learnMore`). The arrow is an animated element here,
 *  so any trailing one in the copy is stripped rather than rendered twice.
 *  Place inside an element with `group` for the hover animation. */
export function ArrowLink({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700">
      {label.replace(/[\s ]*[→›»➜]+[\s ]*$/u, "")}
      <span
        aria-hidden
        className="transition-transform duration-200 group-hover:translate-x-1"
      >
        →
      </span>
    </span>
  );
}
