"use client";
import { useEffect, useRef, useState } from "react";
import {
  FileSpreadsheet,
  UserRoundCog,
  GitBranch,
  ShieldQuestion,
  Copy,
  Unplug,
} from "lucide-react";
import copy from "@/content/copy.json";
import { SectionTag, RichHeading, Mark } from "./ui";
import { PainVisual } from "./VisualScenes";
const icons = [
  FileSpreadsheet,
  UserRoundCog,
  GitBranch,
  ShieldQuestion,
  Copy,
  Unplug,
];
export default function PainExperience() {
  const [active, setActive] = useState(0);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelHover = () => {
    if (hoverTimer.current !== null) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };
  const select = (index: number) => {
    cancelHover();
    setActive(index);
  };
  useEffect(() => cancelHover, []);

  return (
    <section className="pain section light" data-fold="02">
      <div className="container">
        <div className="pain-intro">
          <div>
            <SectionTag>{copy[2][0]}</SectionTag>
            <h2>
              <RichHeading text={copy[2][1]} accent="não cresce junto." />
            </h2>
          </div>
          <p>{copy[2][2]}</p>
        </div>
        <div className="pain-composition">
          <div className="pain-map" aria-hidden="true">
            {icons.map((_, i) => (
              <div
                className={`pain-visual-state ${active === i ? "is-active" : ""}`}
                data-visual={i}
                key={i}
              >
                <div className="pain-visual-frame">
                  <PainVisual index={i} />
                </div>
                <div className="pain-map-label">
                  <span className="pain-selection-number">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{copy[2][i + 3].split(" — ")[0]}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="pain-grid">
            {copy[2].slice(3, 9).map((text, i) => {
              const Icon = icons[i];
              const [title, desc] = text.split(" — ");
              return (
                <button
                  type="button"
                  key={title}
                  className={`pain-item pain-${i} ${active === i ? "is-selected" : ""}`}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "touch") return;
                    cancelHover();
                    hoverTimer.current = setTimeout(() => select(i), 90);
                  }}
                  onPointerLeave={cancelHover}
                  onFocus={() => select(i)}
                  onClick={() => select(i)}
                  aria-pressed={active === i}
                >
                  <Icon aria-hidden="true" />
                  <span className="pain-item-copy">
                    <strong>{title}</strong>
                    <span className="sr-only"> — </span>
                    <span>{desc}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="pain-close">
          <div className="pain-close-symbol">
            <Mark />
            <span aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </div>
          <p>
            <RichHeading
              text={copy[2][9]}
              accent="Precisa entender onde a tecnologia realmente deve entrar."
            />
          </p>
        </div>
      </div>
    </section>
  );
}
