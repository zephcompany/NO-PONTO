"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Target,
  ShieldCheck,
  GitBranch,
  Gauge,
  Eye,
  Layers3,
} from "lucide-react";
import copy from "@/content/copy.json";
import { SectionTag, RichHeading } from "./ui";
import { OutcomeVisual } from "./VisualScenes";
export default function OutcomesExperience() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current!;
    const rows = Array.from(el.querySelectorAll<HTMLElement>(".outcome"));
    const update = () => {
      let nearest = 0,
        distance = Infinity;
      rows.forEach((row, i) => {
        const r = row.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - window.innerHeight / 2);
        if (d < distance) {
          distance = d;
          nearest = i;
        }
      });
      setActive(nearest);
    };
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: update,
      onRefresh: update,
    });
    update();
    return () => trigger.kill();
  }, []);
  const icons = [Target, ShieldCheck, GitBranch, Gauge, Eye, Layers3];
  return (
    <section ref={root} className="outcomes section dark" data-fold="07">
      <div className="container">
        <div className="outcome-heading">
          <SectionTag>{copy[7][0]}</SectionTag>
          <h2>
            <RichHeading text={copy[7][1]} accent="mais controle." />
          </h2>
        </div>
        <div className="outcome-list">
          {icons.map((Icon, i) => (
            <article
              tabIndex={0}
              className={`outcome ${active === i ? "is-current" : ""}`}
              key={i}
            >
              <div className="outcome-content">
                <Icon aria-hidden="true" />
                <h3>{copy[7][2 + i * 2]}</h3>
                <p>{copy[7][3 + i * 2]}</p>
              </div>
              <div className="outcome-preview">
                <OutcomeVisual index={i} />
              </div>
              <span className="outcome-line" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
