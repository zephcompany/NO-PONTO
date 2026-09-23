"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import HeroPanelDemo, { type PanelKind } from "./HeroPanelDemo";
export default function HeroCarousel() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(1);
  const [playing, setPlaying] = useState(false);
  const advance = useCallback(() => setActive((n) => (n + 1) % 3), []);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () =>
      setPlaying(visible && !media.matches && !document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.15 },
    );
    observer.observe(root.current!);
    media.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      media.removeEventListener("change", sync);
    };
  }, []);
  return (
    <div ref={root} className="hero-assets hero-carousel" aria-hidden="true">
      <div className="hero-rails">
        <i />
        <i />
        <i />
      </div>
      {(["finance", "system", "automation"] as PanelKind[]).map((kind, i) => (
        <div
          key={i}
          className={`hero-panel hero-slide panel-${kind} slot-${(i - active + 3) % 3}`}
        >
          <HeroPanelDemo
            kind={kind}
            active={active === i}
            playing={playing}
            onComplete={advance}
          />
        </div>
      ))}
    </div>
  );
}
