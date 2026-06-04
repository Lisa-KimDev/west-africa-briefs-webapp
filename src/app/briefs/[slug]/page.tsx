import { getBriefBySlug, TOPIC_EMOJIS, SENTIMENT_COLORS } from "@/lib/data";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export default async function BriefPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { brief, content } = await getBriefBySlug(slug);

  if (!brief || !content) {
    notFound();
  }

  // Strip YAML frontmatter
  const markdownContent = content.replace(/^---\n[\s\S]*?\n---\n/, "");

  const emoji = TOPIC_EMOJIS[brief.category] ?? "📋";
  const sentimentColor =
    SENTIMENT_COLORS[brief.sentiment] ?? SENTIMENT_COLORS.neutral;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-text-muted">
          <li>
            <Link
              href="/"
              className="hover:text-accent-gold transition-colors"
            >
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href="/archive"
              className="hover:text-accent-gold transition-colors"
            >
              Archive
            </Link>
          </li>
          <li>/</li>
          <li className="text-accent-cream/60">{brief.topic}</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-8 pb-6 border-b border-border-subtle">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{emoji}</span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-bg-card px-2.5 py-1 rounded text-text-muted border border-border-subtle">
            {brief.category}
          </span>
          <span
            className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded border"
            style={{
              borderColor: sentimentColor + "40",
              color: sentimentColor,
              backgroundColor: sentimentColor + "15",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: sentimentColor }}
            />
            {brief.sentiment}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent-gold mb-3 leading-tight">
          {brief.topic}
        </h1>

        <div className="flex items-center gap-4 text-sm text-text-muted">
          <time dateTime={brief.date}>
            {new Date(brief.date).toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <span>•</span>
          <span>Week {brief.week_number}</span>
        </div>

        {brief.key_takeaways.length > 0 && (
          <div className="mt-6 p-4 rounded-card bg-bg-card border border-border-subtle">
            <p className="text-xs font-semibold text-accent-gold uppercase tracking-wider mb-2">
              Key Takeaways
            </p>
            <ul className="space-y-1">
              {brief.key_takeaways.map((t, i) => (
                <li
                  key={i}
                  className="text-sm text-accent-cream/80 flex items-start gap-2"
                >
                  <span className="text-accent-gold shrink-0">→</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Content */}
      <article className="prose-brief">
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </article>

      {/* Watch List */}
      {brief.watch_list.length > 0 && (
        <section className="mt-8 p-5 rounded-card bg-bg-card border border-border-subtle">
          <p className="text-xs font-semibold text-accent-gold uppercase tracking-wider mb-3">
            Watch List
          </p>
          <ul className="space-y-2">
            {brief.watch_list.map((item, i) => (
              <li
                key={i}
                className="text-sm text-accent-cream/80 flex items-start gap-2"
              >
                <span className="text-accent-gold shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Sources */}
      {brief.sources.length > 0 && (
        <section className="mt-6 p-5 rounded-card bg-bg-card border border-border-subtle">
          <p className="text-xs font-semibold text-accent-gold uppercase tracking-wider mb-3">
            Sources
          </p>
          <ul className="space-y-1.5">
            {brief.sources.map((source, i) => (
              <li key={i}>
                <a
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-muted hover:text-accent-gold transition-colors break-all"
                >
                  {source} ↗
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Back link */}
      <div className="mt-10 pt-6 border-t border-border-subtle">
        <Link
          href="/archive"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent-gold transition-colors"
        >
          ← Back to Archive
        </Link>
      </div>
    </div>
  );
}
