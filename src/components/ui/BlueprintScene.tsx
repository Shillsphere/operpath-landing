"use client";

/**
 * GetInTouch — hero right-column contact card.
 *
 * Replaces the ops-board concept with a direct contact beat for landed
 * buyers. A CEO reads the headline on the left, looks right, and the
 * "book / email a founder" decision is one click away.
 *
 * Spam protection:
 *   • No `mailto:` hrefs in rendered HTML — emails are split into
 *     `user` + `domain` parts and assembled at CLICK time in JS
 *   • Email strings never sit in the static markup for scrapers
 *
 * Exported under the original name so HeroChapter doesn't need rewiring.
 */

import { useCallback, useEffect, useState } from "react";

// Split into parts so no literal `parker@operpath.com` string lives in
// the rendered HTML source. Constructed only at click time.
const DOMAIN_PARTS = ["operpath", "com"] as const;
const CONTACTS: Array<{
  user: string;
  name: string;
  role: string;
  initial: string;
}> = [
  { user: "parker", name: "Parker", role: "Engineering", initial: "P" },
  { user: "keaton", name: "Keaton", role: "Operations",  initial: "K" },
];

const BOOK_URL = "https://calendly.com/parkernuttall9/30min";

function buildEmail(user: string): string {
  return `${user}@${DOMAIN_PARTS[0]}.${DOMAIN_PARTS[1]}`;
}

function openEmail(user: string): void {
  if (typeof window === "undefined") return;
  const addr = buildEmail(user);
  const subject = "OPERPATH — quick question";
  const body =
    "Hey,\n\nI'm reaching out about a process we'd like automated.\n\n—";
  window.location.href = `mailto:${addr}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// ────────────────────────────────────────────────────────────────────────────

export function BlueprintScene({ className = "" }: { className?: string }) {
  const [copiedUser, setCopiedUser] = useState<string | null>(null);

  const copy = useCallback(async (user: string) => {
    try {
      await navigator.clipboard.writeText(buildEmail(user));
      setCopiedUser(user);
      window.setTimeout(() => setCopiedUser((c) => (c === user ? null : c)), 1800);
    } catch {
      // Fallback — just open the email client
      openEmail(user);
    }
  }, []);

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center ${className}`}
    >
      {/* Soft warm halation behind the panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-8%] -z-10"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(255, 138, 74, 0.14) 0%, rgba(255, 106, 34, 0.06) 38%, transparent 78%)",
          filter: "blur(48px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Panel */}
      <div
        className="editorial-rise relative mx-6 w-full max-w-[540px] overflow-hidden rounded-2xl border border-[color:var(--color-hairline-bright)] md:mx-0"
        style={{
          animationDelay: "0.45s",
          background:
            "linear-gradient(180deg, rgba(14, 18, 17, 0.75) 0%, rgba(6, 9, 9, 0.9) 100%)",
          backdropFilter: "blur(16px) saturate(1.3)",
          WebkitBackdropFilter: "blur(16px) saturate(1.3)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 4px rgba(0,0,0,0.3), 0 60px 110px -40px rgba(0,0,0,0.7)",
        }}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between border-b border-[color:var(--color-hairline)] px-7 py-4">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-[color:var(--color-ember-core)]" />
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--color-ember-core)]" />
            </span>
            <span
              className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-cream-muted)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Get in touch
            </span>
          </div>
          <span
            className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-cream-subtle)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Madison · WI
          </span>
        </div>

        {/* ── Body ── */}
        <div className="px-7 pb-6 pt-7">
          <h3
            className="editorial-display leading-[1.12]"
            style={{
              fontSize: "clamp(1.4rem, 1rem + 0.6vw, 1.75rem)",
              color: "var(--color-cream)",
              maxWidth: "18ch",
            }}
          >
            Have a process you want{" "}
            <em className="text-editorial-gradient">automated</em>?
          </h3>

          <p
            className="mt-3 text-[14px] leading-[1.55] text-[color:var(--color-cream-muted)]"
          >
            Send one of us a note!
          </p>

          {/* Contact rows — whole card is the click target */}
          <div className="mt-6 space-y-2.5">
            {CONTACTS.map((c) => {
              const copied = copiedUser === c.user;
              return (
                <button
                  key={c.user}
                  type="button"
                  onClick={() => openEmail(c.user)}
                  className="group relative flex w-full items-center gap-4 overflow-hidden rounded-xl border border-[color:var(--color-hairline)] bg-[color:var(--color-cream)]/[0.015] px-3.5 py-3 text-left transition-all duration-300 hover:bg-[color:var(--color-cream)]/[0.04] focus-visible:outline-none"
                  aria-label={`Email ${c.name}`}
                >
                  {/* Ember halo — blooms on hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      boxShadow:
                        "inset 0 0 0 1px rgba(255, 138, 74, 0.5), 0 0 36px -6px rgba(255, 106, 34, 0.3)",
                    }}
                  />
                  {/* Sheen streak that sweeps across on hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full rounded-xl opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 35%, rgba(255, 200, 144, 0.07) 50%, transparent 65%)",
                      mixBlendMode: "screen",
                    }}
                  />

                  {/* Initial badge */}
                  <span
                    aria-hidden
                    className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] transition-all duration-300 group-hover:scale-[1.04]"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255, 138, 74, 0.18), rgba(255, 106, 34, 0.06))",
                      border: "1px solid rgba(255, 138, 74, 0.35)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255, 200, 144, 0.25), 0 0 20px -4px rgba(255, 106, 34, 0.3)",
                    }}
                  >
                    <span
                      className="text-[18px] italic"
                      style={{
                        fontFamily: "var(--font-editorial)",
                        color: "var(--color-cream)",
                      }}
                    >
                      {c.initial}
                    </span>
                  </span>

                  {/* Name + role */}
                  <div className="flex min-w-0 flex-col">
                    <span
                      className="text-[15.5px] font-medium text-[color:var(--color-cream)]"
                      style={{
                        fontFamily: "var(--font-editorial)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {c.name}
                    </span>
                    <span
                      className="mt-0.5 text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-cream-subtle)]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {c.role}
                    </span>
                  </div>

                  {/* Right cluster — copy + arrow */}
                  <div className="ml-auto flex items-center gap-1">
                    {/* Copy — silent secondary action (stopPropagation so it doesn't open email) */}
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        copy(c.user);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.stopPropagation();
                          e.preventDefault();
                          copy(c.user);
                        }
                      }}
                      aria-label={`Copy ${c.name}'s email to clipboard`}
                      className="inline-flex h-7 items-center gap-1 rounded-md px-2 text-[9.5px] uppercase tracking-[0.18em] text-[color:var(--color-cream-subtle)] opacity-0 transition-all duration-200 hover:text-[color:var(--color-cream)] group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {copied ? (
                        <>
                          <svg width="9" height="9" viewBox="0 0 8 8" fill="none">
                            <path
                              d="M1.5 4L3.5 6L6.5 2"
                              stroke="currentColor"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          copied
                        </>
                      ) : (
                        "copy"
                      )}
                    </span>

                    {/* Arrow — slides on hover */}
                    <span
                      aria-hidden
                      className="relative flex h-9 w-9 items-center justify-center rounded-[10px] text-[color:var(--color-cream-muted)] transition-all duration-300 group-hover:text-[color:var(--color-ember-core)]"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      >
                        <path
                          d="M3 7h8m-3-3 3 3-3 3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Secondary — book a call */}
          <div className="mt-4 flex items-center gap-3 text-[11px] text-[color:var(--color-cream-subtle)]">
            <span
              aria-hidden
              className="h-px flex-1"
              style={{ background: "var(--color-hairline-dim)" }}
            />
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group/book inline-flex items-center gap-1.5 uppercase tracking-[0.18em] text-[color:var(--color-cream-muted)] transition-colors hover:text-[color:var(--color-cream)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              or book 30 min
              <svg
                width="11"
                height="11"
                viewBox="0 0 14 14"
                fill="none"
                className="transition-transform duration-200 group-hover/book:translate-x-0.5"
              >
                <path
                  d="M3 7h8m-3-3 3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <span
              aria-hidden
              className="h-px flex-1"
              style={{ background: "var(--color-hairline-dim)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlueprintScene;
