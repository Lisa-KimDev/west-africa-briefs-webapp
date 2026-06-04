import Link from "next/link";
import {
  getBriefs,
  getLatestBrief,
  getWeekBriefs,
  TOPIC_EMOJIS,
  SENTIMENT_COLORS,
} from "@/lib/data";
import { BriefCard } from "@/components/BriefCard";
import { CategoryCard } from "@/components/CategoryCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export const revalidate = 3600;

export default async function HomePage() {
  const allBriefs = await getBriefs();
  const latestBrief = await getLatestBrief();
  const weekBriefs = getWeekBriefs(allBriefs);

  const categories = [
    { slug: "tech", label: "App Ideas", emoji: "📱" },
    { slug: "crypto", label: "Crypto & Digital Assets", emoji: "₿" },
    { slug: "agribusiness", label: "Agribusiness", emoji: "🌾" },
    { slug: "energy", label: "Energy & Power", emoji: "⚡" },
    { slug: "stocks", label: "Stocks & IPOs", emoji: "📈" },
    { slug: "governance", label: "Governance", emoji: "🌍" },
    { slug: "trade", label: "Trade", emoji: "📦" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero */}
      <section className="mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent-gold mb-4">
          West Africa Daily Briefs
        </h1>
        <p className="text-accent-cream/80 text-lg sm:text-xl max-w-2xl leading-relaxed">
          Daily research on West African business, markets, and investment
          opportunities. Covering crypto, agribusiness, energy, stocks,
          governance, and trade.
        </p>
      </section>

      {/* Today's Brief */}
      {latestBrief && (
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-accent-gold">
              Latest Brief
            </h2>
            <span className="text-text-muted text-sm">
              {new Date(latestBrief.date).toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <BriefCard brief={latestBrief} featured />
        </section>
      )}

      {/* Week at a Glance */}
      {weekBriefs.length > 0 && (
        <section className="mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-accent-gold mb-6">
            This Week
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {weekBriefs.map((brief) => (
              <BriefCard key={brief.date + brief.category} brief={brief} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="mb-12 sm:mb-16">
        <h2 className="text-xl sm:text-2xl font-bold text-accent-gold mb-6">
          Browse by Topic
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.slug}
              slug={cat.slug}
              label={cat.label}
              emoji={cat.emoji}
              count={
                allBriefs.filter((b) => b.category === cat.slug).length
              }
            />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mb-12">
        <NewsletterSignup />
      </section>
    </div>
  );
}
