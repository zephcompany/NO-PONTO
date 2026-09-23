"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export default function AnimatedEvidence({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  const root = useRef<HTMLDivElement>(null);
  const hover = useRef<((x: number, y: number) => void) | null>(null);
  useEffect(() => {
    const el = root.current!;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion:reduce)",
    ).matches;
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const restore: (() => void)[] = [];
    const ctx = gsap.context(() => {
      const select = gsap.utils.selector(el);
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });
      tl.from(select(".evidence-title"), { y: 10, opacity: 0, duration: 0.4 });
      if (index === 0) {
        tl.from(
          select(".fiscal-document"),
          {
            x: -35,
            y: 28,
            rotation: -7,
            opacity: 0,
            stagger: 0.16,
            duration: 0.65,
          },
          0.1,
        )
          .from(
            select(".fiscal-document>span"),
            {
              clipPath: "inset(0 100% 0 0)",
              stagger: 0.2,
              duration: 0.55,
              ease: "none",
            },
            0.55,
          )
          .from(
            select(".doc-lines i"),
            {
              scaleX: 0,
              transformOrigin: "left",
              stagger: 0.07,
              duration: 0.35,
              ease: "power2.out",
            },
            0.5,
          )
          .fromTo(
            select(".document-scan"),
            { top: "10%", opacity: 0 },
            { top: "82%", opacity: 0.8, stagger: 0.15, duration: 0.55 },
            0.9,
          )
          .to(select(".document-scan"), { opacity: 0, duration: 0.15 }, 1.7)
          .from(
            select(".fiscal-document>svg:last-child"),
            { scale: 0, opacity: 0, stagger: 0.14, duration: 0.3 },
            1.3,
          );
      } else if (index === 1) {
        tl.from(
          select(".migration-sheet>div"),
          { x: -24, opacity: 0, stagger: 0.18, duration: 0.5 },
          0.1,
        )
          .from(
            select(".migration-sheet>div>svg"),
            { scale: 0, opacity: 0, stagger: 0.15, duration: 0.35 },
            0.5,
          )
          .from(
            select(".migration-flow"),
            { clipPath: "inset(0 0 100% 0)", duration: 0.5 },
            0.7,
          )
          .from(
            select(".migration-result"),
            { y: 20, opacity: 0, duration: 0.6 },
            1,
          );
      } else {
        tl.from(
          select(".compare-block>span"),
          { opacity: 0, y: 8, stagger: 0.5, duration: 0.4 },
          0.1,
        )
          .from(
            select(".compare-bar"),
            {
              scaleX: 0,
              transformOrigin: "left",
              stagger: 0.8,
              duration: 0.9,
              ease: "power2.inOut",
            },
            0.35,
          )
          .from(
            select(".compare-connector"),
            { clipPath: "inset(0 0 100% 0)", opacity: 0, duration: 0.5 },
            0.6,
          );
      }
      el.querySelectorAll<HTMLElement>("[data-counter]").forEach((node, i) => {
        const target = Number(node.dataset.counter),
          format = node.dataset.format;
        const state = { value: 0 };
        const prefix = node.dataset.prefix || "",
          suffix = node.dataset.suffix || "";
        const final =
          prefix +
          target.toLocaleString("pt-BR", {
            minimumFractionDigits: format === "decimal" ? 1 : 0,
            maximumFractionDigits: format === "decimal" ? 1 : 0,
          }) +
          suffix;
        restore.push(() => {
          node.textContent = final;
        });
        tl.from(
          node,
          {
            autoAlpha: 0,
            y: 10,
            duration: 0.4,
          },
          index === 2 ? 0.25 + i * 0.85 : 1.25 + i * 0.3,
        );
        tl.fromTo(
          state,
          { value: 0 },
          {
            value: target,
            duration: 1.45,
            ease: "power2.out",
            onUpdate: () => {
              node.textContent =
                prefix +
                state.value.toLocaleString("pt-BR", {
                  minimumFractionDigits: format === "decimal" ? 1 : 0,
                  maximumFractionDigits: format === "decimal" ? 1 : 0,
                }) +
                suffix;
            },
            onComplete: () => {
              node.textContent = final;
            },
          },
          index === 2 ? 0.25 + i * 0.85 : 1.25 + i * 0.3,
        );
      });
      const captions = select(
        ".metric-main>span,.metric-bottom>span,.migration-result>span",
      );
      if (captions.length)
        tl.from(
          captions,
          {
            clipPath: "inset(0 100% 0 0)",
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "none",
          },
          1.3,
        );
      if (index === 0)
        tl.from(
          select(".metric-bottom"),
          { y: 18, opacity: 0, duration: 0.6 },
          1.7,
        );
      ScrollTrigger.create({
        trigger: el,
        start: "top 78%",
        end: "bottom 10%",
        onEnter: () => tl.restart(),
        onEnterBack: () => tl.restart(),
      });
      if (window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
        const card = el.querySelector(".case-visual");
        const x = gsap.quickTo(card, "rotationX", {
          duration: 0.45,
          ease: "power2.out",
        });
        const y = gsap.quickTo(card, "rotationY", {
          duration: 0.45,
          ease: "power2.out",
        });
        hover.current = (rx, ry) => {
          x(rx);
          y(ry);
        };
      }
    }, el);
    return () => {
      ctx.revert();
      restore.forEach((fn) => fn());
      hover.current = null;
    };
  }, [index]);
  return (
    <div
      ref={root}
      className="case-interactive"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        hover.current?.(
          (-(e.clientY - r.top - r.height / 2) / r.height) * 4,
          ((e.clientX - r.left - r.width / 2) / r.width) * 4,
        );
      }}
      onPointerLeave={() => hover.current?.(0, 0)}
    >
      {children}
    </div>
  );
}
