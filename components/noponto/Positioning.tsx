"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Target,
  Search,
  ListChecks,
  Database,
  Code2,
  Rocket,
  ChartNoAxesCombined,
  ArrowDown,
  Check,
} from "lucide-react";
import copy from "@/content/copy.json";
import { SectionTag, RichHeading } from "./ui";
import { PositionVisual } from "./VisualScenes";
const icons = [
  Target,
  Search,
  ListChecks,
  Database,
  Code2,
  Rocket,
  ChartNoAxesCombined,
];
const names = copy[3][3].split(" → ");
export default function Positioning() {
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 901px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)",
      () => {
        const el = root.current!;
        const ctx = gsap.context(() => {
          const progress = el.querySelector(".journey-progress-fill");
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: () => `+=${Math.max(2100, window.innerHeight * 3.2)}`,
              pin: el.querySelector(".position-pin"),
              scrub: 0.45,
              anticipatePin: 1,
              refreshPriority: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) =>
                setActive(Math.min(6, Math.floor(self.progress * 7))),
            },
          });
          timeline.fromTo(
            progress,
            { scaleX: 0 },
            { scaleX: 1, ease: "none", duration: 7 },
          );
          trigger.current = timeline.scrollTrigger!;
        }, el);
        return () => {
          trigger.current = null;
          ctx.revert();
        };
      },
    );
    const refresh = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    document.fonts.ready.then(refresh);
    return () => mm.revert();
  }, []);
  function select(index: number) {
    const st = trigger.current;
    if (st)
      window.scrollTo({
        top: st.start + (st.end - st.start) * ((index + 0.35) / 7),
        behavior: "instant",
      });
    setActive(index);
  }
  return (
    <section
      ref={root}
      className="positioning section position-experience"
      data-fold="03"
      id="posicionamento"
    >
      <div className="position-pin">
        <div className="container">
          <div className="position-intro">
            <div>
              <SectionTag>{copy[3][0]}</SectionTag>
              <h2>
                <RichHeading
                  text={copy[3][1]}
                  accent="entrega um PDF e vai embora."
                />
              </h2>
            </div>
            <p>{copy[3][2]}</p>
          </div>
          <div className="journey-console">
            <ol className="journey-nav" aria-label="Gestão antes da tecnologia">
              {names.map((name, i) => {
                const Icon = icons[i];
                return (
                  <li
                    key={name}
                    className={
                      i === active
                        ? "is-active"
                        : i < active
                          ? "is-complete"
                          : ""
                    }
                  >
                    <button
                      type="button"
                      onClick={() => select(i)}
                      aria-current={i === active ? "step" : undefined}
                      aria-controls="journey-screen"
                    >
                      <span className="journey-index">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Icon aria-hidden="true" />
                      <span>{name}</span>
                      <Check className="journey-check" aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ol>
            <div
              id="journey-screen"
              className="journey-screen"
              aria-label={names[active]}
            >
              <div className="journey-screen-top">
                <span>{names[active]}</span>
                <span className="journey-counter" aria-hidden="true">
                  {String(active + 1).padStart(2, "0")}
                  <small> / 07</small>
                </span>
              </div>
              <div className="journey-scenes">
                {names.map((name, i) => (
                  <div
                    key={name}
                    className={`journey-scene ${i === active ? "is-active" : ""}`}
                    aria-hidden={i !== active}
                  >
                    <PositionVisual index={i} />
                  </div>
                ))}
              </div>
              <div className="journey-progress" aria-hidden="true">
                <i className="journey-progress-fill" />
                <span>
                  {names[active]}
                  <ArrowDown />
                </span>
              </div>
            </div>
          </div>
          <div className="position-end">
            <p>{copy[3][4]}</p>
            <p>
              A ferramenta muda.
              <br />O método permanece.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
