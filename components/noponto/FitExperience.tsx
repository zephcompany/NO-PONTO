"use client";
import { useEffect, useRef, useState } from "react";
import { Check, Minus } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import copy from "@/content/copy.json";
import { SectionTag, RichHeading } from "./ui";

const groups = [
  { title: copy[10][1], items: copy[10].slice(2, 9) },
  { title: copy[10][9], items: copy[10].slice(10) },
];

export default function FitExperience() {
  const root = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const el = root.current!;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".fit-progress i",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              refreshPriority: -2,
              trigger: el,
              start: "top 60%",
              end: "bottom 65%",
              scrub: 0.45,
            },
          },
        );
        el.querySelectorAll<HTMLElement>(".fit-chapter").forEach(
          (chapter, index) => {
            ScrollTrigger.create({
              refreshPriority: -2,
              trigger: chapter,
              start: "top 55%",
              end: "bottom 55%",
              onEnter: () => setStage(index),
              onEnterBack: () => setStage(index),
              onLeaveBack: () => {
                if (index === 1) setStage(0);
              },
            });
            gsap.fromTo(
              chapter.querySelector(".fit-chapter-line i"),
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                  refreshPriority: -2,
                  trigger: chapter,
                  start: "top 75%",
                  end: "bottom 60%",
                  scrub: 0.4,
                },
              },
            );
            chapter.querySelectorAll<HTMLElement>("li").forEach((row) => {
              gsap.fromTo(
                row,
                { "--row-reveal": 0, x: 12, opacity: 0.55 },
                {
                  "--row-reveal": 1,
                  x: 0,
                  opacity: 1,
                  ease: "none",
                  scrollTrigger: {
                    refreshPriority: -2,
                    trigger: row,
                    start: "top 88%",
                    end: "center 62%",
                    scrub: 0.45,
                  },
                },
              );
            });
          },
        );
      }, el);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="fit fit-story section light" data-fold="10">
      <div className="container fit-shell">
        <div className="fit-intro">
          <SectionTag>GESTÃO + DADOS + TECNOLOGIA</SectionTag>
          <h2>
            <RichHeading text={copy[10][0]} accent="QUALQUER EMPRESA." />
          </h2>
          <div className="fit-index" aria-hidden="true">
            {groups.map((group, i) => (
              <div
                key={group.title}
                className={`fit-index-step ${stage === i ? "is-current" : ""}`}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                <p>{group.title}</p>
                <i />
              </div>
            ))}
            <div className="fit-progress">
              <i />
            </div>
          </div>
        </div>
        <div className="fit-chapters">
          {groups.map((group, i) => {
            const Icon = i === 0 ? Check : Minus;
            return (
              <div
                key={group.title}
                className={`fit-chapter fit-chapter-${i} ${stage === i ? "is-current" : ""}`}
              >
                <div className="fit-chapter-line" aria-hidden="true">
                  <i />
                </div>
                <div className="fit-chapter-heading">
                  <span aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{group.title}</h3>
                </div>
                <ul>
                  {group.items.map((text, n) => (
                    <li key={text}>
                      <span className="fit-row-number" aria-hidden="true">
                        {String(n + 1).padStart(2, "0")}
                      </span>
                      <span className="fit-row-copy">{text}</span>
                      <Icon aria-hidden="true" />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
