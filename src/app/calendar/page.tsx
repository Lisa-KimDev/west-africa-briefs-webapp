import { getBriefs, TOPIC_EMOJIS } from "@/lib/data";
import Link from "next/link";

export const revalidate = 3600;

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday = 0
}

export default async function CalendarPage() {
  const briefs = await getBriefs();

  // Build a map: "YYYY-MM-DD" -> Brief
  const briefMap: Record<string, (typeof briefs)[0]> = {};
  for (const b of briefs) {
    briefMap[b.date] = b;
  }

  // Determine month range
  const now = new Date();
  const months: { year: number; month: number }[] = [];

  if (briefs.length > 0) {
    const dates = briefs.map((b) => new Date(b.date));
    const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

    // Show from first brief month to current month (or last brief month, whichever is later)
    const endYear = Math.max(now.getFullYear(), maxDate.getFullYear());
    const endMonth = Math.max(now.getMonth(), maxDate.getMonth());
    const startYear = minDate.getFullYear();
    const startMonth = minDate.getMonth();

    let y = startYear;
    let m = startMonth;
    while (y < endYear || (y === endYear && m <= endMonth)) {
      months.push({ year: y, month: m });
      m++;
      if (m > 11) {
        m = 0;
        y++;
      }
    }
  } else {
    // Default: show last 3 months
    for (let i = 2; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({ year: d.getFullYear(), month: d.getMonth() });
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-accent-gold mb-2">
        Calendar
      </h1>
      <p className="text-accent-cream/70 mb-8 text-lg">
        Browse briefs by date. Click any day to read the full report.
      </p>

      <div className="space-y-12">
        {months.map(({ year, month }) => {
          const daysInMonth = getDaysInMonth(year, month);
          const firstDay = getFirstDayOfWeek(year, month);
          const today = new Date();
          const isCurrentMonth =
            today.getFullYear() === year && today.getMonth() === month;

          return (
            <section
              key={`${year}-${month}`}
              className="rounded-card border border-border-subtle bg-bg-card p-4 sm:p-6"
            >
              <h2 className="text-xl font-bold text-accent-gold mb-4">
                {MONTH_NAMES[month]} {year}
              </h2>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAY_NAMES.map((d) => (
                  <div
                    key={d}
                    className="text-center text-xs font-semibold text-text-muted uppercase tracking-wider py-2"
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for offset */}
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {/* Day cells */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const brief = briefMap[dateStr];
                  const isToday =
                    isCurrentMonth && today.getDate() === day;

                  if (brief) {
                    const emoji = TOPIC_EMOJIS[brief.category] ?? "📋";
                    const slug = `${brief.date}-${brief.category}`;

                    return (
                      <Link
                        key={dateStr}
                        href={`/briefs/${slug}`}
                        className={`
                          group relative aspect-square rounded-lg border flex flex-col items-center justify-center
                          transition-all duration-200
                          ${
                            isToday
                              ? "border-accent-gold bg-accent-gold/10 hover:bg-accent-gold/20"
                              : "border-border-subtle bg-bg-primary hover:bg-bg-card-hover hover:border-accent-gold/30"
                          }
                        `}
                        title={`${brief.topic} — ${brief.date}`}
                      >
                        <span className="text-xs font-mono text-text-muted group-hover:text-accent-cream transition-colors absolute top-1 left-1.5">
                          {day}
                        </span>
                        <span className="text-lg sm:text-xl leading-none">
                          {emoji}
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-text-muted group-hover:text-accent-gold transition-colors mt-0.5 truncate max-w-full px-1 hidden sm:block">
                          {brief.topic.split(" ").slice(0, 2).join(" ")}
                        </span>
                        {/* Sentiment dot */}
                        <span
                          className="absolute bottom-1 right-1.5 w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor:
                              brief.sentiment === "bullish"
                                ? "#22c55e"
                                : brief.sentiment === "bearish"
                                  ? "#ef4444"
                                  : brief.sentiment === "mixed"
                                    ? "#eab308"
                                    : "#8a9aa3",
                          }}
                        />
                      </Link>
                    );
                  }

                  // No brief for this day
                  return (
                    <div
                      key={dateStr}
                      className={`
                        aspect-square rounded-lg border flex items-center justify-center
                        ${
                          isToday
                            ? "border-accent-gold/40 bg-accent-gold/5"
                            : "border-border-subtle/30 bg-bg-primary/50"
                        }
                      `}
                    >
                      <span
                        className={`text-xs font-mono ${isToday ? "text-accent-gold/60" : "text-text-muted/40"}`}
                      >
                        {day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 p-4 rounded-card border border-border-subtle bg-bg-card">
        <p className="text-xs font-semibold text-accent-gold uppercase tracking-wider mb-3">
          Legend
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-text-muted">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#22c55e]" /> Bullish
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#eab308]" /> Mixed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#8a9aa3]" /> Neutral
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ef4444]" /> Bearish
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full border border-accent-gold" /> Today
          </span>
        </div>
      </div>
    </div>
  );
}
