"use client";

/**
 * EmailLink — click-only mailto button.
 *
 * The email address is NEVER rendered in static HTML. The `user` prop plus
 * a hardcoded domain are joined at click time to compose the mailto, so
 * naive scrapers that don't execute JS or simulate clicks won't harvest
 * the address.
 */
export function EmailLink({
  user,
  children,
  className = "",
  subject = "OPERPATH: quick question",
}: {
  user: string;
  children: React.ReactNode;
  className?: string;
  subject?: string;
}) {
  const open = () => {
    if (typeof window === "undefined") return;
    const addr = `${user}@${["operpath", "com"].join(".")}`;
    window.location.href = `mailto:${addr}?subject=${encodeURIComponent(subject)}`;
  };

  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
