import { getBriefs } from "@/lib/data";
import { BriefCard } from "@/components/BriefCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export const revalidate = 3600;

export default async function ArchivePage() {
  const briefs = await getBriefs();
  const sorted = briefs.sort((a, b) => b.date.localeCompare(a.date));

  // Group by month
  const grouped: Record<string, typeof briefs> = {};
  for (const brief of sorted) {
    const d = new Date(brief.date);
    const key = d.toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    });
    grouped[key] ??= [];
    grouped[key].push(brief);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-accent-gold mb-2">
        Archive
      </h1>
      <p className="text-accent-cream/70 mb-8 text-lg">
        All daily briefs, organised by date.
      </p>

      {Object.entries(grouped).map(([month, monthBriefs]) => (
        <section key={month} className="mb-10">
          <h2 className="text-lg font-semibold text-accent-cream/80 mb-4 pb-2 border-b border-border-subtle">
            {month}
            <span className="text-text-muted font-normal text-sm ml-2">
              {monthBriefs.length} brief{monthBriefs.length !== 1 ? "s" : ""}
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {monthBriefs.map((brief) => (
              <BriefCard
                key={brief.date + brief.category}
                brief={brief}
              />
            ))}
          </div>
        </section>
      ))}

      {sorted.length === 0 && (
        <div className="text-center py-20">
          <p className="text-text-muted text-lg">
            No briefs available yet. Check back soon.
          </p>
        </div>
      )}

      <div className="mt-12">
        <NewsletterSignup />
      </div>
    </div>
  );
}
