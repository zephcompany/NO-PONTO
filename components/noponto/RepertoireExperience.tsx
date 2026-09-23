"use client";
import { useEffect, useRef, type PointerEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Utensils, Truck, Factory, Sprout, Scale, Store } from "lucide-react";
import copy from "@/content/copy.json";
import { SectionTag } from "./ui";
import { SectorVisual } from "./VisualScenes";
export default function RepertoireExperience() {
  const root = useRef<HTMLElement>(null);
  const scrollScene = useRef<ScrollTrigger | null>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 901px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)",
      () => {
        const el = root.current!;
        const track = el.querySelector<HTMLElement>(".sector-track")!;
        const viewport = el.querySelector<HTMLElement>(".sector-viewport")!;
        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: () => `+=${track.scrollWidth - viewport.clientWidth + 250}`,
              pin: el.querySelector(".repertoire-pin"),
              scrub: 0.65,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              refreshPriority: -1,
            },
          });
          tl.to(
            track,
            {
              x: () => -(track.scrollWidth - viewport.clientWidth),
              ease: "none",
            },
            0,
          ).fromTo(
            ".sector-progress i",
            { scaleX: 0 },
            { scaleX: 1, ease: "none" },
            0,
          );
          scrollScene.current = tl.scrollTrigger!;
        }, el);
        return () => {
          scrollScene.current = null;
          ctx.revert();
        };
      },
    );
    return () => mm.revert();
  }, []);
  const icons = [Utensils, Truck, Factory, Sprout, Scale, Store];
  function glow(e: PointerEvent<HTMLElement>) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
  }
  return (
    <section
      ref={root}
      className="repertoire section dark repertoire-horizontal"
      data-fold="08"
    >
      <div className="repertoire-pin">
        <div className="container">
          <div className="repertoire-intro">
            <div>
              <SectionTag>{copy[8][0]}</SectionTag>
              <h2 aria-label={copy[8][1]}>
                <span className="heading-neutral">Diferentes setores. </span>
                <br />
                <span className="heading-accent">
                  Problemas que se repetem.
                </span>
              </h2>
            </div>
          </div>
          <div className="sector-viewport">
            <div className="sector-track">
              {copy[8].slice(2, 8).map((s, i) => {
                const [title, desc] = s.split(" — ");
                const Icon = icons[i];
                return (
                  <article
                    className={`sector-card sector-card-${i}`}
                    tabIndex={0}
                    onFocus={(e) => {
                      const st = scrollScene.current;
                      if (st && e.currentTarget.matches(":focus-visible"))
                        window.scrollTo({
                          top: st.start + (st.end - st.start) * (i / 5),
                          behavior: "instant",
                        });
                    }}
                    onPointerMove={glow}
                    key={title}
                  >
                    <div className="sector-card-top">
                      <Icon />
                      <span aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <SectorVisual index={i} />
                    <div className="sector-card-copy">
                      <h3>{title}</h3>
                      <p>
                        <span className="sr-only"> — </span>
                        {desc}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
          <div className="sector-progress" aria-hidden="true">
            <i />
          </div>
          <p className="repertoire-close">{copy[8][8]}</p>
        </div>
      </div>
    </section>
  );
}
