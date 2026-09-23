"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
/** Content stays complete in HTML; each interface is revealed as a connected unit. */
export default function InterfaceMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>(".solution-block,.food-app,.mobile-method-asset")
        .forEach((panel) => {
          const inside = gsap.utils.selector(panel);
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: "top 86%",
              end: "bottom 10%",
              toggleActions: "restart none restart none",
            },
          });
          const rows = inside(
            ".viz-piece,.ledger-row,.workflow-step,.operation-lanes>div,.bi-branches>span,.ai-sources>span,.integration-column>span",
          );
          if (rows.length)
            tl.from(rows, {
              y: 12,
              opacity: 0,
              duration: 0.5,
              stagger: 0.11,
              ease: "power2.out",
            });
          const connections = inside(
            ".workflow-edge,.bi-branches,.process-connectors,.ai-connectors,.integration-break",
          );
          if (connections.length)
            tl.from(connections, { opacity: 0, duration: 0.8 }, 0.35);
          const endings = inside(
            ".ledger-bottom,.bi-result,.ai-result,.system-records,.integration-person",
          );
          if (endings.length)
            tl.from(endings, { y: 8, opacity: 0, duration: 0.55 }, 0.7);
        });
    });
    return () => ctx.revert();
  }, []);
  return null;
}
