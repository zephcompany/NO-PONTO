"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChartNoAxesCombined,
  Database,
  MousePointer2,
} from "lucide-react";
import { DataTable, SystemAsset, AutomationAsset } from "./Assets";

export type PanelKind = "finance" | "system" | "automation";

export default function HeroPanelDemo({
  kind,
  active,
  playing,
  onComplete,
}: {
  kind: PanelKind;
  active: boolean;
  playing: boolean;
  onComplete: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [step, setStep] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver(() =>
      setWidth(root.current!.clientWidth),
    );
    observer.observe(root.current!);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = root.current!;
    setStep(0);
    if (!active) return;
    const ctx = gsap.context(() => {
      const pointer = el.querySelector<HTMLElement>(".demo-pointer")!;
      const icon = pointer.querySelector("svg");
      const ring = pointer.querySelector("i");
      // Offset coordinates stay accurate inside the carousel's perspective transforms.
      const point = (selector: string, axis: "x" | "y") => {
        const target = el.querySelector<HTMLElement>(selector)!;
        let result =
          axis === "x" ? target.offsetWidth * 0.7 : target.offsetHeight * 0.6;
        for (
          let node: HTMLElement | null = target;
          node && node !== el;
          node = node.offsetParent as HTMLElement | null
        ) {
          result += axis === "x" ? node.offsetLeft : node.offsetTop;
        }
        return result;
      };
      const tl = gsap.timeline({ paused: true, onComplete });
      timeline.current = tl;
      gsap.set(pointer, {
        x: el.clientWidth * 0.82,
        y: el.clientHeight * 0.82,
        opacity: 0,
      });
      const action = (selector: string, next: number, at: number) => {
        tl.to(
          pointer,
          {
            x: () => point(selector, "x"),
            y: () => point(selector, "y"),
            opacity: 1,
            duration: 0.72,
            ease: "power2.inOut",
          },
          at,
        )
          .to(
            icon,
            {
              scale: 0.82,
              duration: 0.1,
              repeat: 1,
              yoyo: true,
              ease: "power2.out",
            },
            at + 0.72,
          )
          .fromTo(
            ring,
            { opacity: 0.65, scale: 0.3 },
            { opacity: 0, scale: 2.2, duration: 0.5, ease: "power2.out" },
            at + 0.72,
          )
          .call(() => setStep(next), [], at + 0.78);
      };
      if (kind === "finance") {
        [0, 1, 2, 3].forEach((_, i) =>
          action(`.ledger-row:nth-child(${i + 3})`, i + 1, 0.5 + i * 1.65),
        );
        action(".ledger-bottom", 5, 7.4);
      } else if (kind === "system") {
        action(".operation-lanes > div:first-child", 0, 0.5);
        action(".system-tabs span:nth-child(2)", 1, 2.5);
        action(".demo-finance-row:nth-child(3)", 1, 4.1);
        action(".system-tabs span:nth-child(3)", 2, 5.6);
        action(".demo-insight-result", 2, 7.3);
        action(".system-tabs span:first-child", 0, 9.0);
      } else {
        action(".workflow-step:first-child", 1, 0.5);
        tl.call(() => setStep(2), [], 3.0);
        action(".workflow-focus", 2, 3.1);
        tl.call(() => setStep(3), [], 5.6);
        action(".workflow-step:last-child", 3, 6.0);
        tl.call(() => setStep(4), [], 8.1);
      }
      tl.to(pointer, { opacity: 0, duration: 0.5 }, 10.2);
      tl.to({}, { duration: 0.5 }, 11.2);
    }, el);
    return () => {
      timeline.current = null;
      ctx.revert();
    };
  }, [kind, active, onComplete, width]);

  useEffect(() => {
    if (playing && active) timeline.current?.play();
    else timeline.current?.pause();
  }, [playing, active, width]);

  return (
    <div
      ref={root}
      className={`hero-slide-content hero-demo hero-demo-${kind}`}
      data-step={step}
      data-playing={active && playing}
    >
      {kind === "finance" ? (
        <DataTable />
      ) : kind === "automation" ? (
        <AutomationAsset />
      ) : (
        <>
          <SystemAsset />
          <div className="demo-system-view demo-system-finance">
            <div className="demo-view-title">
              Gestão financeira <Database />
            </div>
            {["Fluxo de caixa", "CMV", "Margem"].map((text) => (
              <div className="demo-finance-row" key={text}>
                <span>{text}</span>
                <Check />
              </div>
            ))}
            <div className="demo-view-foot">
              DRE gerencial <ArrowRight />
            </div>
          </div>
          <div className="demo-system-view demo-system-insights">
            <div className="demo-view-title">
              Indicadores <ChartNoAxesCombined />
            </div>
            <div className="demo-insight-sources">
              <span>Operação</span>
              <span>Financeiro</span>
            </div>
            <div className="demo-insight-connect">
              <i />
              <ArrowDown />
              <i />
            </div>
            <div className="demo-insight-result">
              <ChartNoAxesCombined />
              <span>Análise gerencial</span>
              <Check />
            </div>
          </div>
        </>
      )}
      <div className="demo-pointer">
        <MousePointer2 />
        <i />
      </div>
      <div className="demo-activity-track">
        <i />
      </div>
    </div>
  );
}
