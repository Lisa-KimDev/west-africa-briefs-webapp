export function NewsletterSignup() {
  return (
    <div className="rounded-card border border-border-subtle bg-bg-card p-6 sm:p-8">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-accent-gold mb-3">
          Weekly Newsletter
        </h2>
        <p className="text-accent-cream/70 text-sm sm:text-base mb-6 leading-relaxed">
          Get the weekly digest every Sunday. All 7 daily briefs compiled into
          one engaging read. No spam, unsubscribe anytime.
        </p>
        <form
          action="#"
          method="POST"
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="your@email.com"
            required
            className="flex-1 px-4 py-2.5 rounded-button bg-bg-primary border border-border-subtle text-accent-cream placeholder:text-text-muted text-sm focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold/50 transition-colors"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-button bg-accent-gold text-bg-primary font-semibold text-sm hover:bg-accent-gold-dark transition-colors shrink-0"
          >
            Subscribe
          </button>
        </form>
        <p className="text-text-muted text-xs mt-3">
          Free. Delivered every Sunday morning.
        </p>
      </div>
    </div>
  );
}
