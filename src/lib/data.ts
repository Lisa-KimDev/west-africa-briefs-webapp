const DATA_BASE =
  "https://raw.githubusercontent.com/Webara-Studio/west-africa-daily-briefs/master/site/data";

export interface Brief {
  date: string;
  day: string;
  topic: string;
  category: string;
  week_number: number;
  sentiment: "bullish" | "bearish" | "neutral" | "mixed";
  key_takeaways: string[];
  opportunities: string[];
  watch_list: string[];
  sources: string[];
  _file: string;
}

export interface CategoryMap {
  [category: string]: Brief[];
}

const fetchJSON = async <T>(url: string): Promise<T | null> => {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
};

export async function getBriefs(): Promise<Brief[]> {
  const data = await fetchJSON<Brief[]>(`${DATA_BASE}/briefs.json`);
  return data ?? [];
}

export async function getLatestByCategory(): Promise<Record<string, Brief>> {
  const data = await fetchJSON<Record<string, Brief>>(
    `${DATA_BASE}/latest.json`
  );
  return data ?? {};
}

export async function getCategories(): Promise<CategoryMap> {
  const data = await fetchJSON<CategoryMap>(`${DATA_BASE}/categories.json`);
  return data ?? {};
}

export async function getLatestBrief(): Promise<Brief | null> {
  const briefs = await getBriefs();
  if (briefs.length === 0) return null;
  return briefs.sort((a, b) => b.date.localeCompare(a.date))[0];
}

export async function getBriefsByWeek(
  year: number,
  week: number
): Promise<Brief[]> {
  const briefs = await getBriefs();
  return briefs
    .filter((b) => {
      const d = new Date(b.date);
      const bw = getISOWeek(d);
      const by = d.getFullYear();
      return bw === week && by === year;
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function getBriefBySlug(
  slug: string
): Promise<{ brief: Brief | null; content: string | null }> {
  const briefs = await getBriefs();
  const brief = briefs.find((b) => b._file.includes(slug)) ?? null;

  let content: string | null = null;
  if (brief) {
    const rawUrl = `https://raw.githubusercontent.com/Webara-Studio/west-africa-daily-briefs/master/${brief._file}`;
    try {
      const res = await fetch(rawUrl, { next: { revalidate: 3600 } });
      if (res.ok) content = await res.text();
    } catch {
      // silence
    }
  }

  return { brief, content };
}

export function getWeekBriefs(briefs: Brief[]): Brief[] {
  const now = new Date();
  const currentWeek = getISOWeek(now);
  const currentYear = now.getFullYear();

  return briefs
    .filter((b) => {
      const d = new Date(b.date);
      return getISOWeek(d) === currentWeek && d.getFullYear() === currentYear;
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}

function getISOWeek(date: Date): number {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export const TOPIC_EMOJIS: Record<string, string> = {
  tech: "📱",
  crypto: "₿",
  agribusiness: "🌾",
  energy: "⚡",
  stocks: "📈",
  governance: "🌍",
  trade: "📦",
};

export const SENTIMENT_COLORS: Record<string, string> = {
  bullish: "#22c55e",
  bearish: "#ef4444",
  mixed: "#eab308",
  neutral: "#8a9aa3",
};

export const DAY_LABELS: Record<string, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};
