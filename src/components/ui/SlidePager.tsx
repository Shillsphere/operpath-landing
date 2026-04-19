"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";

type Chapter = {
  id: string;
  num: string;
  name: string;
};

type Ctx = {
  activeIndex: number;
  chapters: Chapter[];
  go: (i: number) => void;
};

const PagerContext = createContext<Ctx | null>(null);

export function useSlidePager() {
  const ctx = useContext(PagerContext);
  if (!ctx) throw new Error("useSlidePager must be inside <SlidePager>");
  return ctx;
}

/**
 * Wheel-scroll pager.
 *
 * Each slide sits on the surface of an imaginary vertical drum. As the user
 * scrolls, slides above recede + tilt back, the centered slide faces the
 * camera dead-on, and slides below peel forward from the bottom of the drum.
 * The transform is driven entirely by each slide's center offset from the
 * viewport center — no framer-motion, no IntersectionObserver, just rAF +
 * CSS custom properties.
 */
export function SlidePager({
  chapters,
  children,
}: {
  chapters: Chapter[];
  children: ReactNode;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const go = useCallback((i: number) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const bounded = Math.max(0, Math.min(chapters.length - 1, i));
    const target = vp.querySelectorAll<HTMLElement>(".slide")[bounded];
    if (target) {
      vp.scrollTo({ top: target.offsetTop, behavior: "smooth" });
    }
    setActive(bounded);
  }, [chapters.length]);

  // Scroll loop: tracks active slide + drives the wheel transform.
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    let raf = 0;
    const apply = () => {
      raf = 0;
      const vh = vp.clientHeight;
      const mid = vp.scrollTop + vh * 0.5;
      const slides = vp.querySelectorAll<HTMLElement>(".slide");
      let idx = 0;
      slides.forEach((slide, i) => {
        const top = slide.offsetTop;
        const height = slide.clientHeight;
        const center = top + height * 0.5;
        // Normalized offset: -1 (fully above) → 0 (centered) → +1 (fully below).
        const raw = (center - mid) / (vh * 0.9);
        const offset = Math.max(-1.2, Math.min(1.2, raw));

        // rotateX: slides above tilt toward the camera's chin (positive angle
        // so the bottom of the slide comes closer); slides below tilt up.
        const rotateX = offset * 62;
        // Depth: both directions recede so the centered slide is closest.
        const translateZ = -Math.abs(offset) * 420;
        // Gentle vertical shift to suggest curvature of the drum surface.
        const translateY = -Math.abs(offset) * 44;

        // Sharper opacity curve — adjacent slides can't both be visible.
        // Previous curve (1 - |offset| * 0.9) left a slide at offset 0.5
        // rendering at 55% opacity, which caused two slides to overlap
        // mid-scroll. The squared falloff goes to zero by |offset| ≈ 0.8.
        const a = Math.abs(offset);
        const opacity = Math.max(0, 1 - a * 1.55 - a * a * 0.6);
        // Blur ramps faster so off-center slides defocus before they
        // cross into the neighbor's space.
        const blur = Math.min(14, a * 18);

        slide.style.setProperty("--wheel-rx", `${rotateX}deg`);
        slide.style.setProperty("--wheel-tz", `${translateZ}px`);
        slide.style.setProperty("--wheel-ty", `${translateY}px`);
        slide.style.setProperty("--wheel-op", String(opacity));
        slide.style.setProperty("--wheel-blur", `${blur}px`);

        if (Math.abs(center - mid) < Math.abs(
          (slides[idx].offsetTop + slides[idx].clientHeight * 0.5) - mid
        )) {
          idx = i;
        }
      });
      setActive(idx);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(apply);
    };

    // Prime once so slides get a transform before first scroll.
    apply();
    vp.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", apply);
    return () => {
      vp.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", apply);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Keyboard navigation — accessibility only, no on-screen hint.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        go(active + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        go(active - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        go(0);
      } else if (e.key === "End") {
        e.preventDefault();
        go(chapters.length - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go, chapters.length]);

  const ctx = useMemo(() => ({ activeIndex: active, chapters, go }), [active, chapters, go]);

  return (
    <PagerContext.Provider value={ctx}>
      {/* Minimal dot rail — no labels, no progress bar, no keyboard hints. */}
      <DotRail />

      <div ref={viewportRef} className="slide-viewport">
        <div className="slide-track">{children}</div>
      </div>
    </PagerContext.Provider>
  );
}

function DotRail() {
  const { chapters, activeIndex, go } = useSlidePager();
  return (
    <nav aria-label="chapters" className="dot-rail hidden md:flex">
      {chapters.map((c, i) => (
        <button
          key={c.id}
          onClick={() => go(i)}
          className="dot-rail-btn"
          data-active={i === activeIndex}
          aria-label={`go to section ${i + 1}`}
          aria-current={i === activeIndex ? "true" : undefined}
        />
      ))}
    </nav>
  );
}

/* Slide wrapper — wheel-transform lives here, applied via CSS vars. */
export function Slide({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`slide zone-dark ${className}`}>
      <div className="slide-wheel">{children}</div>
    </section>
  );
}
