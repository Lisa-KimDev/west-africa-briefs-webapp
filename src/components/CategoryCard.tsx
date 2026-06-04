import Link from "next/link";

export function CategoryCard({
  slug,
  label,
  emoji,
  count,
}: {
  slug: string;
  label: string;
  emoji: string;
  count: number;
}) {
  return (
    <Link
      href={`/category/${slug}`}
      className="group flex items-center gap-4 p-4 sm:p-5 rounded-card border border-border-subtle bg-bg-card hover:bg-bg-card-hover hover:border-accent-gold/30 hover:shadow-card-hover transition-all duration-200"
    >
      <span className="text-2xl sm:text-3xl">{emoji}</span>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-accent-cream group-hover:text-accent-gold transition-colors text-sm sm:text-base">
          {label}
        </h3>
        <p className="text-text-muted text-xs mt-0.5">
          {count} brief{count !== 1 ? "s" : ""}
        </p>
      </div>
      <span className="text-text-muted group-hover:text-accent-gold transition-colors text-lg">
        →
      </span>
    </Link>
  );
}
