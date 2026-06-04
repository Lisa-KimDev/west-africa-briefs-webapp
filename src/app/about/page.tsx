import { NewsletterSignup } from "@/components/NewsletterSignup";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-accent-gold mb-6">
        About
      </h1>

      <div className="prose-brief space-y-6">
        <p>
          <strong className="text-accent-gold">West Africa Daily Briefs</strong>{" "}
          is a daily research project covering business, markets, and investment
          opportunities across West Africa. Every morning at 02:14 UTC, a new
          brief is published on a rotating schedule of seven topics.
        </p>

        <h2>Research Schedule</h2>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="text-left py-2 pr-4 text-accent-gold font-semibold">
                Day
              </th>
              <th className="text-left py-2 pr-4 text-accent-gold font-semibold">
                Topic
              </th>
              <th className="text-left py-2 text-accent-gold font-semibold">
                Focus
              </th>
            </tr>
          </thead>
          <tbody className="text-accent-cream/80">
            <tr className="border-b border-border-subtle/50">
              <td className="py-2.5 pr-4">Monday</td>
              <td className="py-2.5 pr-4">📱 App Ideas</td>
              <td className="py-2.5">
                Local app and digital product opportunities
              </td>
            </tr>
            <tr className="border-b border-border-subtle/50">
              <td className="py-2.5 pr-4">Tuesday</td>
              <td className="py-2.5 pr-4">₿ Crypto</td>
              <td className="py-2.5">
                Digital assets, regulation, and DeFi in West Africa
              </td>
            </tr>
            <tr className="border-b border-border-subtle/50">
              <td className="py-2.5 pr-4">Wednesday</td>
              <td className="py-2.5 pr-4">🌾 Agribusiness</td>
              <td className="py-2.5">
                Commodity prices, production, and agri-investment
              </td>
            </tr>
            <tr className="border-b border-border-subtle/50">
              <td className="py-2.5 pr-4">Thursday</td>
              <td className="py-2.5 pr-4">⚡ Energy</td>
              <td className="py-2.5">
                Renewable energy, power sector, and infrastructure
              </td>
            </tr>
            <tr className="border-b border-border-subtle/50">
              <td className="py-2.5 pr-4">Friday</td>
              <td className="py-2.5 pr-4">📈 Stocks & IPOs</td>
              <td className="py-2.5">
                African and Caribbean capital markets
              </td>
            </tr>
            <tr className="border-b border-border-subtle/50">
              <td className="py-2.5 pr-4">Saturday</td>
              <td className="py-2.5 pr-4">🌍 Governance</td>
              <td className="py-2.5">
                Elections, regulation, trade deals, and mining
              </td>
            </tr>
            <tr>
              <td className="py-2.5 pr-4">Sunday</td>
              <td className="py-2.5 pr-4">📦 Trade</td>
              <td className="py-2.5">
                Import and export trends (alternating weekly)
              </td>
            </tr>
          </tbody>
        </table>

        <h2>Data & Sources</h2>
        <p>
          Each brief is researched using Google Trends, social sentiment
          analysis, news aggregation, and market data. All sources are cited
          within each brief. The raw data and Markdown files are stored in the
          open-source repository on GitHub.
        </p>

        <h2>Open Source</h2>
        <p>
          All research briefs are published under an open-source model. The
          data feeds powering this site are freely available for anyone to use,
          analyse, or build upon.
        </p>

        <h2>Built by Webara Studio</h2>
        <p>
          This project is built and maintained by{" "}
          <a
            href="https://webarastudio.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Webara Studio
          </a>
          , a digital product studio specialising in SaaS, B2B platforms, and
          AI-powered web applications.
        </p>
      </div>

      <div className="mt-12">
        <NewsletterSignup />
      </div>
    </div>
  );
}
