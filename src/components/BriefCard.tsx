import Link from "next/link";
import { Brief, TOPIC_EMOJIS, SENTIMENT_COLORS } from "@/lib/data";

function SentimentDot({ sentiment }: { sentiment: Brief["sentiment"] }) {
  const color = SENTIMENT_COLORS[sentiment] ?? SENTIMENT_COLORS.neutral;
  return (
    <span
      className="inline-block w-2 h-2 rounded-full shrink-0"
      style={{ backgroundColor: color }}
      title={sentiment}
      aria-label={`Sentiment: ${sentiment}`}
    />
  );
}

function CategoryTag({ category }: { category: string }) {
  const emoji = TOPIC_EMOJIS[category] ?? "📋";
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium bg-bg-card px-2 py-0.5 rounded text-text-muted border border-border-subtle">
      {emoji} {category}
    </span>
  );
}

export function BriefCard({
  brief,
  featured = false,
}: {
  brief: Brief;
  featured?: boolean;
}) {
  const emoji = TOPIC_EMOJIS[brief.category] ?? "📋";
  const formattedDate = new Date(brief.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
  const slug = `${brief.date}-${brief.category}`;

  return (
    <Link
      href={`/briefs/${slug}`}
      className={`
        group block rounded-card border border-border-subtle bg-bg-card
        hover:bg-bg-card-hover hover:shadow-card-hover hover:border-accent-gold/30
        transition-all duration-200
        ${featured ? "p-6 sm:p-8" : "p-4 sm:p-5"}
      `}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className={featured ? "text-2xl" : "text-xl"}>{emoji}</span>
          <CategoryTag category={brief.category} />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <SentimentDot sentiment={brief.sentiment} />
          <span className="text-text-muted text-xs font-mono">
            {formattedDate}
          </span>
        </div>
      </div>

      <h3
        className={`
          font-semibold text-accent-cream group-hover:text-accent-gold
          transition-colors leading-snug mb-2
          ${featured ? "text-xl sm:text-2xl" : "text-base sm:text-lg"}
        `}
      >
        {brief.topic}
      </h3>

      {brief.key_takeaways.length > 0 && (
        <ul className="space-y-1 mt-3">
          {brief.key_takeaways.slice(0, featured ? 3 : 2).map((t, i) => (
            <li
              key={i}
              className="text-sm text-accent-cream/70 leading-relaxed flex items-start gap-2"
            >
              <span className="text-accent-gold mt-1 shrink-0">→</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex items-center gap-2 text-xs text-text-muted group-hover:text-accent-gold/70 transition-colors">
        <span>Read full brief</span>
        <span>→</span>
      </div>
    </Link>
  );
}
