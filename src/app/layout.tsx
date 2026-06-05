import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "West Africa Daily Briefs",
  description:
    "Daily research on West African business, markets, and investment opportunities. Covering crypto, agribusiness, energy, stocks, governance, and trade.",
  openGraph: {
    title: "West Africa Daily Briefs",
    description:
      "Daily research on West African business, markets, and investment opportunities.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-bg-primary text-accent-cream font-sans">
        <Link
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-accent-gold focus:text-bg-primary focus:px-4 focus:py-2 focus:rounded-button"
        >
          Skip to main content
        </Link>

        <header className="sticky top-0 z-40 border-b border-border-subtle bg-bg-primary/95 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-3 group">
                <span className="text-accent-gold font-bold text-xl tracking-tight group-hover:text-accent-gold-dark transition-colors">
                  WEST AFRICA
                </span>
                <span className="text-text-muted font-light text-sm hidden sm:block">
                  Daily Briefs
                </span>
              </Link>

              <nav className="flex items-center gap-5" aria-label="Main navigation">
                <Link
                  href="/"
                  className="text-sm text-accent-cream/80 hover:text-accent-gold transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/calendar"
                  className="text-sm text-accent-cream/80 hover:text-accent-gold transition-colors"
                >
                  Calendar
                </Link>
                <Link
                  href="/archive"
                  className="text-sm text-accent-cream/80 hover:text-accent-gold transition-colors"
                >
                  Archive
                </Link>
                <Link
                  href="/newsletter"
                  className="text-sm text-accent-cream/80 hover:text-accent-gold transition-colors"
                >
                  Newsletter
                </Link>
                <Link
                  href="/about"
                  className="text-sm text-accent-cream/80 hover:text-accent-gold transition-colors"
                >
                  About
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main id="main-content">{children}</main>

        <footer className="border-t border-border-subtle mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-accent-gold font-bold text-lg mb-2">
                  West Africa Daily Briefs
                </p>
                <p className="text-text-muted text-sm leading-relaxed">
                  Daily research on West African business, markets, and
                  investment opportunities. Published every morning.
                </p>
              </div>

              <div>
                <p className="text-accent-cream font-semibold text-sm mb-3">
                  Topics
                </p>
                <ul className="space-y-1.5 text-sm">
                  <li>
                    <Link
                      href="/category/tech"
                      className="text-text-muted hover:text-accent-gold transition-colors"
                    >
                      📱 App Ideas
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/crypto"
                      className="text-text-muted hover:text-accent-gold transition-colors"
                    >
                      ₿ Crypto & Digital Assets
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/agribusiness"
                      className="text-text-muted hover:text-accent-gold transition-colors"
                    >
                      🌾 Agribusiness
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/energy"
                      className="text-text-muted hover:text-accent-gold transition-colors"
                    >
                      ⚡ Energy & Power
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/stocks"
                      className="text-text-muted hover:text-accent-gold transition-colors"
                    >
                      📈 Stocks & IPOs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/governance"
                      className="text-text-muted hover:text-accent-gold transition-colors"
                    >
                      🌍 Governance
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/trade"
                      className="text-text-muted hover:text-accent-gold transition-colors"
                    >
                      📦 Trade
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-accent-cream font-semibold text-sm mb-3">
                  Links
                </p>
                <ul className="space-y-1.5 text-sm">
                  <li>
                    <Link
                      href="/calendar"
                      className="text-text-muted hover:text-accent-gold transition-colors"
                    >
                      Calendar View
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/archive"
                      className="text-text-muted hover:text-accent-gold transition-colors"
                    >
                      Full Archive
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/newsletter"
                      className="text-text-muted hover:text-accent-gold transition-colors"
                    >
                      Weekly Newsletter
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-text-muted hover:text-accent-gold transition-colors"
                    >
                      About This Project
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://github.com/Webara-Studio/west-africa-daily-briefs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-accent-gold transition-colors"
                    >
                      GitHub ↗
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://webarastudio.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-accent-gold transition-colors"
                    >
                      Webara Studio ↗
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border-subtle mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-text-muted text-xs">
                © {new Date().getFullYear()} West Africa Daily Briefs. Built by{" "}
                <a
                  href="https://webarastudio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-gold hover:text-accent-gold-dark"
                >
                  Webara Studio
                </a>
                .
              </p>
              <p className="text-text-muted text-xs">
                Data updated daily at 02:14 UTC
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
