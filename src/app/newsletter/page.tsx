import { NewsletterSignup } from "@/components/NewsletterSignup";

export default function NewsletterPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-accent-gold mb-2">
        Weekly Newsletter
      </h1>
      <p className="text-accent-cream/70 mb-8 text-lg leading-relaxed">
        Every Sunday, we compile all 7 daily briefs into one engaging weekly
        digest. Delivered straight to your inbox.
      </p>

      <div className="mb-12">
        <NewsletterSignup />
      </div>

      <div className="rounded-card border border-border-subtle bg-bg-card p-6 sm:p-8">
        <h2 className="text-xl font-bold text-accent-gold mb-4">
          What&apos;s Inside
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <span className="text-xl">📱</span>
            <div>
              <p className="text-accent-cream font-semibold text-sm">
                Monday — App Ideas
              </p>
              <p className="text-text-muted text-xs">
                Trending digital product opportunities in West Africa
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">₿</span>
            <div>
              <p className="text-accent-cream font-semibold text-sm">
                Tuesday — Crypto
              </p>
              <p className="text-text-muted text-xs">
                Regulation, adoption, and digital asset markets
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">🌾</span>
            <div>
              <p className="text-accent-cream font-semibold text-sm">
                Wednesday — Agribusiness
              </p>
              <p className="text-text-muted text-xs">
                Commodity prices, production, and investment
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">⚡</span>
            <div>
              <p className="text-accent-cream font-semibold text-sm">
                Thursday — Energy
              </p>
              <p className="text-text-muted text-xs">
                Renewable projects, power sector reform, investment
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">📈</span>
            <div>
              <p className="text-accent-cream font-semibold text-sm">
                Friday — Stocks & IPOs
              </p>
              <p className="text-text-muted text-xs">
                African and Caribbean exchange activity
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">🌍</span>
            <div>
              <p className="text-accent-cream font-semibold text-sm">
                Saturday — Governance
              </p>
              <p className="text-text-muted text-xs">
                Elections, regulation, trade deals, mining
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">📦</span>
            <div>
              <p className="text-accent-cream font-semibold text-sm">
                Sunday — Trade
              </p>
              <p className="text-text-muted text-xs">
                Import and export trends and opportunities
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
