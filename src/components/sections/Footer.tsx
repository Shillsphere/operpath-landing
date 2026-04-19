import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/[0.06] bg-[var(--color-ink)]">
      {/* ASCII signature strip */}
      <div className="overflow-hidden border-b border-white/[0.04]">
        <div className="mx-auto max-w-6xl px-6 py-3 text-center font-mono text-[10.5px] uppercase tracking-[0.22em] text-[var(--zone-fg-muted)]">
          <span aria-hidden className="mx-2 text-[var(--color-accent)]">●</span>
          built in madison, wi &nbsp;·&nbsp; shipping since 2026 &nbsp;·&nbsp; running every night
          <span aria-hidden className="mx-2 text-[var(--color-accent)]">●</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href="#" className="inline-flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="OperPath"
              width={480}
              height={204}
              unoptimized
              className="h-8 w-auto opacity-70 invert brightness-[2]"
            />
          </a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--zone-fg-muted)]">
            Custom AI for industrial distributors. Production-grade agents that
            take over the manual work no off-the-shelf tool was built for.
          </p>
        </div>

        <div>
          <div className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--zone-fg-muted)]">
            index
          </div>
          <ul className="space-y-2 text-sm text-[var(--zone-fg-secondary)]">
            <li>
              <a href="#insight" className="hover:text-[var(--zone-fg)]">Insight</a>
            </li>
            <li>
              <a href="#how-it-works" className="hover:text-[var(--zone-fg)]">Method</a>
            </li>
            <li>
              <a href="#capabilities" className="hover:text-[var(--zone-fg)]">What we build</a>
            </li>
            <li>
              <a href="#book" className="hover:text-[var(--zone-fg)]">Book a call</a>
            </li>
          </ul>
        </div>

        <div>
          <div className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--zone-fg-muted)]">
            contact
          </div>
          <ul className="space-y-2 text-sm text-[var(--zone-fg-secondary)]">
            <li>
              <a href="mailto:parkernuttall9@gmail.com" className="hover:text-[var(--zone-fg)]">
                parkernuttall9@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/operpath"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--zone-fg)]"
              >
                LinkedIn
              </a>
            </li>
            <li className="text-[var(--zone-fg-muted)]">Madison, WI</li>
          </ul>
        </div>

        <div>
          <div className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--zone-fg-muted)]">
            status
          </div>
          <ul className="space-y-2 font-mono text-[12px] tabular text-[var(--zone-fg-secondary)]">
            <li className="inline-flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)]" />
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              </span>
              all systems operational
            </li>
            <li className="text-[var(--zone-fg-muted)]">uptime · 99.97%</li>
            <li className="text-[var(--zone-fg-muted)]">last incident · none</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.05]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-[var(--zone-fg-muted)] sm:flex-row">
          <p>&copy; {year} OperPath. All rights reserved.</p>
          <p className="font-mono tracking-wide">
            <span className="serif-italic not-italic" style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic" }}>
              — made by humans, shipped by agents.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
