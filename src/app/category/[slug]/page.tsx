import { getBriefs, TOPIC_EMOJIS } from "@/lib/data";
import { BriefCard } from "@/components/BriefCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { notFound } from "next/navigation";

const VALID_CATEGORIES = [
  "tech",
  "crypto",
  "agribusiness",
  "energy",
  "stocks",
  "governance",
  "trade",
];

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((slug) => ({ slug }));
}

export const revalidate = 3600; // ISR: revalidate every hour

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const label = slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " ");
  return {
    title: `${label} Briefs — West Africa Daily Briefs`,
    description: `All ${label.toLowerCase()} research briefs from West Africa Daily Briefs.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!VALID_CATEGORIES.includes(slug)) {
    notFound();
  }

  const briefs = await getBriefs();
  const filtered = briefs
    .filter((b) => b.category === slug)
    .sort((a, b) => b.date.localeCompare(a.date));

  const emoji = TOPIC_EMOJIS[slug] ?? "📋";
  const label =
    slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " ");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">{emoji}</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-accent-gold">
          {label}
        </h1>
      </div>
      <p className="text-accent-cream/70 mb-8 text-lg">
        {filtered.length} brief{filtered.length !== 1 ? "s" : ""} on{" "}
        {label.toLowerCase()}.
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((brief) => (
            <BriefCard
              key={brief.date + brief.category}
              brief={brief}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-text-muted text-lg">
            No briefs in this category yet.
          </p>
        </div>
      )}

      <div className="mt-12">
        <NewsletterSignup />
      </div>
    </div>
  );
}
