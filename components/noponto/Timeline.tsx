"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import copy from "@/content/copy.json";
import { SectionTag, RichHeading } from "./ui";
import { MethodVisual } from "./VisualScenes";
const steps = Array.from({ length: 5 }, (_, i) => ({
  number: copy[5][2 + i * 3].slice(0, 2),
  title: copy[5][2 + i * 3].slice(5),
  description: copy[5][3 + i * 3],
  output: copy[5][4 + i * 3],
}));
export default function Timeline() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add(
      "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
      () => {
        const el = root.current!;
        const ctx = gsap.context(() => {
          const stages = gsap.utils.toArray<HTMLElement>(".method-step", el);
          stages.forEach((stage, i) => {
            ScrollTrigger.create({
              trigger: stage,
              start: "top 56%",
              end: "bottom 56%",
              onEnter: () => setActive(i),
              onEnterBack: () => setActive(i),
            });
          });
          gsap.fromTo(
            ".method-progress-fill",
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: ".method-steps",
                start: "top 55%",
                end: "bottom 55%",
                scrub: true,
              },
            },
          );
        }, el);
        return () => ctx.revert();
      },
    );
    return () => media.revert();
  }, []);
  return (
    <section
      className="method section dark"
      id="metodo"
      ref={root}
      data-fold="05"
    >
      <div className="container">
        <div className="method-heading">
          <SectionTag>{copy[5][0]}</SectionTag>
          <h2>
            <RichHeading text={copy[5][1]} accent="operação organizada." />
          </h2>
        </div>
        <div className="method-layout">
          <div className="method-stage" data-step={active}>
            <div className="method-stage-top">
              <span className="method-counter">{steps[active].number}</span>
              <span className="method-stage-name">{steps[active].title}</span>
            </div>
            <div className="method-visuals">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className={`method-visual ${active === i ? "active" : ""}`}
                  aria-hidden="true"
                >
                  <MethodVisual index={i} />
                </div>
              ))}
            </div>
            <div className="method-stage-bottom">
              <span>{steps[active].output}</span>
              <div className="method-dots">
                {steps.map((s, i) => (
                  <i className={i <= active ? "active" : ""} key={s.number} />
                ))}
              </div>
            </div>
          </div>
          <div className="method-steps">
            <div className="method-progress" aria-hidden="true">
              <i className="method-progress-fill" />
            </div>
            {steps.map((step, i) => (
              <article
                key={step.number}
                className={`method-step ${active === i ? "active" : ""}`}
              >
                <span className="step-index">{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <p className="step-output">{step.output}</p>
                  <div className="mobile-method-asset" data-step={i}>
                    <MethodVisual index={i} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
