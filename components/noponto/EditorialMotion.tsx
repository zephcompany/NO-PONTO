"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
export default function EditorialMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const splits: SplitText[] = [];
      const ctx = gsap.context(() => {
        document
          .querySelectorAll<HTMLElement>(
            ".pain h2,.cases h2,.solutions h2,.fit h2,.repertoire h2",
          )
          .forEach((heading) => {
            const split = SplitText.create(heading, {
              type: "lines",
              linesClass: "title-reveal-line",
              autoSplit: true,
              deepSlice: true,
              aria: "auto",
              onSplit(self) {
                self.lines.forEach((line) => {
                  const bar = document.createElement("em");
                  bar.className = "title-reveal-bar";
                  bar.setAttribute("aria-hidden", "true");
                  line.appendChild(bar);
                });
                const bars = self.lines.map((l) =>
                  l.querySelector(".title-reveal-bar"),
                );
                return gsap
                  .timeline({
                    scrollTrigger: {
                      trigger: heading,
                      refreshPriority: heading.closest(".fit") ? -2 : 0,
                      start: "top 88%",
                      end: "bottom 8%",
                      toggleActions: "restart none restart none",
                    },
                  })
                  .fromTo(
                    self.lines,
                    { clipPath: "inset(0 100% 0 0)" },
                    {
                      clipPath: "inset(0 0% 0 0)",
                      duration: 0.55,
                      stagger: 0.1,
                      ease: "power3.out",
                    },
                    0,
                  )
                  .fromTo(
                    bars,
                    { xPercent: 0 },
                    {
                      xPercent: 101,
                      duration: 0.65,
                      stagger: 0.1,
                      ease: "power3.inOut",
                    },
                    0.35,
                  );
              },
            });
            splits.push(split);
          });
        gsap.from(".pain-close-symbol", {
          rotation: -30,
          scale: 0.8,
          opacity: 0.25,
          scrollTrigger: {
            trigger: ".pain-close",
            start: "top 90%",
            end: "bottom 65%",
            scrub: 0.6,
          },
        });
      });
      return () => {
        ctx.revert();
        splits.forEach((s) => s.revert());
      };
    });
    return () => mm.revert();
  }, []);
  return null;
}
