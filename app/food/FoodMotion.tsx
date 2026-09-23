"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

/** Food's motion layer, scoped to this route and fully reversible. */
export default function FoodMotion({ rootRef }: { rootRef: RefObject<HTMLDivElement | null> }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const media = gsap.matchMedia();
    let disposed = false;

    document.fonts.ready.then(() => {
      if (disposed || !rootRef.current) return;
      media.add({ motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 900px) and (hover: hover) and (pointer: fine)" }, match => {
        if (!match.conditions?.motion || !rootRef.current) return;
        const root = rootRef.current;
        const desktop = !!match.conditions.desktop;
        const splits: SplitText[] = [];
        const cleanups: (() => void)[] = [];
        const loops: { animation: gsap.core.Animation; trigger: ScrollTrigger }[] = [];
        let lenis: Lenis | undefined;
        let ticker: ((time: number) => void) | undefined;
        const intro = document.querySelector<HTMLElement>(".brand-preloader")?.getAnimations()[0];
        const introDelay = intro ? Math.max(0, (Number(intro.effect?.getTiming().duration || 0) - Number(intro.currentTime || 0)) / 1000) : 0;

        const context = gsap.context(() => {
          root.dataset.foodMotion = "ready";
          const headings = [...root.querySelectorAll<HTMLElement>("h1, h2")];
          headings.forEach(heading => {
            heading.classList.add("fd-title-motion");
            const hero = heading.tagName === "H1";
            const centered = getComputedStyle(heading).textAlign === "center";
            const split = SplitText.create(heading, {
              type: "lines", linesClass: "fd-title-line", autoSplit: true, deepSlice: true, aria: "auto",
              onSplit(self) {
                self.lines.forEach(line => {
                  const bar = document.createElement("span");
                  bar.className = "fd-title-bar";
                  bar.setAttribute("aria-hidden", "true");
                  line.appendChild(bar);
                  if (centered) gsap.set(line, { marginLeft: "auto", marginRight: "auto" });
                });
                return gsap.timeline({
                  delay: hero ? introDelay : 0,
                  scrollTrigger: { trigger: heading, start: "top 90%", end: "bottom 6%", toggleActions: "restart complete restart complete" },
                })
                  .fromTo(self.lines, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: .6, stagger: .12, ease: "power3.out" }, 0)
                  .fromTo(self.lines.map(line => line.querySelector(".fd-title-bar")), { xPercent: 0 }, { xPercent: 102, duration: .7, stagger: .12, ease: "power3.inOut" }, .32);
              },
            });
            splits.push(split);
          });
          cleanups.push(() => headings.forEach(heading => heading.classList.remove("fd-title-motion")));

          gsap.from(".fd-hero-copy > :not(h1)", { y: 20, opacity: 0, duration: .8, stagger: .1, delay: introDelay + .18, ease: "power3.out", clearProps: "opacity,transform" });
          gsap.from(".fd-kitchen-hero", { clipPath: "inset(0 0 100% 0 round 10px)", duration: 1.2, delay: introDelay + .12, ease: "power3.inOut", clearProps: "clipPath" });
          gsap.from(".fd-prep-ticket", { y: 32, rotation: -7, opacity: 0, duration: 1.05, delay: introDelay + .65, ease: "power3.out", clearProps: "opacity,transform" });

          // Reveal only content around headings; their masks run independently.
          root.querySelectorAll<HTMLElement>(".fd-reveal").forEach(element => {
            if (element.querySelector("h2")) {
              const contents = element.querySelectorAll(".fd-tag, p, .fd-button");
              gsap.from(contents, { y: 20, opacity: 0, stagger: .08, duration: .75, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 90%", end: "bottom 8%", toggleActions: "restart complete restart complete" } });
            } else {
              gsap.from(element, { y: desktop ? 45 : 25, opacity: 0, duration: .85, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 92%", end: "bottom 6%", toggleActions: "restart complete restart complete" } });
            }
          });
          root.querySelectorAll<HTMLElement>(".fd-restaurant-image, .fd-recipe-photograph").forEach(element => {
            gsap.from(element, { clipPath: "inset(12% 0 12% 0 round 10px)", opacity: .4, duration: 1.15, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 92%", end: "bottom 8%", toggleActions: "restart complete restart complete" } });
          });
          if (desktop) {
            gsap.to(".fd-prep-ticket", { yPercent: -9, ease: "none", scrollTrigger: { trigger: ".fd-hero", start: "top top", end: "bottom top", scrub: .8 } });
            gsap.fromTo(".fd-recipe-photograph > img", { scale: 1.035, yPercent: -1 }, { scale: 1, yPercent: 1, ease: "none", scrollTrigger: { trigger: ".fd-recipe-layout", start: "top 80%", end: "bottom 35%", scrub: 1 } });
          }
          gsap.fromTo(".fd-operation-line", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".fd-operation-flow", start: "top 85%", end: "bottom 45%", scrub: .5 } });
          gsap.utils.toArray<HTMLElement>(".fd-operation-step").forEach((step, i) => {
            gsap.from(step, { y: 30, opacity: .3, ease: "none", scrollTrigger: { trigger: ".fd-operation-flow", start: `top ${88 - i * 8}%`, end: `bottom ${70 - i * 8}%`, scrub: .55 } });
          });
          gsap.from(".fd-routine-note > *", { x: -12, opacity: 0, stagger: .08, duration: .55, ease: "power2.out", scrollTrigger: { trigger: ".fd-routine-note", start: "top 94%", end: "bottom 5%", toggleActions: "restart complete restart complete" } });

          // Asset demonstrations only run while their section is on screen.
          const loop = (selector: string, animation: gsap.core.Animation) => {
            const element = root.querySelector<HTMLElement>(selector);
            if (!element) return;
            const trigger = ScrollTrigger.create({ trigger: element, start: "top bottom", end: "bottom top", onToggle: self => { if (self.isActive && !document.hidden) animation.play(); else animation.pause(); } });
            loops.push({ animation, trigger });
            if (!trigger.isActive || document.hidden) animation.pause();
            const enter = () => animation.pause();
            const leave = () => { if (trigger.isActive && !document.hidden && !element.contains(document.activeElement)) animation.play(); };
            element.addEventListener("pointerenter", enter);
            element.addEventListener("pointerleave", leave);
            element.addEventListener("focusin", enter);
            element.addEventListener("focusout", leave);
            cleanups.push(() => { element.removeEventListener("pointerenter", enter); element.removeEventListener("pointerleave", leave); element.removeEventListener("focusin", enter); element.removeEventListener("focusout", leave); });
          };
          const finance = gsap.timeline({ repeat: -1, repeatDelay: 1.2, paused: true });
          root.querySelectorAll<HTMLElement>(".fd-finance-visual > div").forEach((item, i) => {
            finance.to(item, { y: -6, boxShadow: "0 9px 20px rgba(0,155,212,.14)", duration: .5, ease: "power2.out" }, i * .65)
              .to(item, { y: 0, boxShadow: "0 0 0 rgba(0,155,212,0)", duration: .7, ease: "power2.inOut" }, i * .65 + .7);
          });
          loop(".fd-feature-finance", finance);
          const network = gsap.timeline({ repeat: -1, repeatDelay: 1.5, paused: true })
            .fromTo(".fd-network-branches > i", { scaleY: .05, transformOrigin: "top" }, { scaleY: 1, stagger: .14, duration: .7, ease: "power2.inOut" })
            .to(".fd-network-stores > span", { y: -5, backgroundColor: "rgba(0,176,240,.17)", stagger: .15, duration: .5, ease: "power2.out" }, .45)
            .to(".fd-network-stores > span", { y: 0, backgroundColor: "rgba(0,176,240,0)", stagger: .15, duration: .7, ease: "power2.inOut" }, 1.5);
          loop(".fd-feature-network", network);
          const ticket = gsap.timeline({ repeat: -1, repeatDelay: 1.4, paused: true })
            .fromTo(".fd-ticket-links > span", { opacity: .35 }, { opacity: 1, stagger: .35, duration: .6, ease: "power2.out" })
            .fromTo(".fd-ticket-end > i", { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 1, ease: "power2.inOut" }, .25)
            .to(".fd-ticket-end > svg", { x: 5, repeat: 1, yoyo: true, duration: .6, ease: "power2.inOut" }, 1.2);
          loop(".fd-kitchen-hero", ticket);
          const marquee = gsap.to(".fd-capability-track", { xPercent: -50, repeat: -1, duration: desktop ? 34 : 28, ease: "none", paused: true });
          loop(".fd-capability-band", marquee);

          const visibleAssets = new IntersectionObserver(entries => {
            entries.forEach(entry => entry.target.toggleAttribute("data-motion-visible", entry.isIntersecting));
          }, { threshold: .1 });
          root.querySelectorAll(".fd-console, .fd-feature-kitchen").forEach(element => visibleAssets.observe(element));
          cleanups.push(() => { visibleAssets.disconnect(); root.querySelectorAll("[data-motion-visible]").forEach(element => element.removeAttribute("data-motion-visible")); });
          const visibility = () => {
            loops.forEach(({ animation, trigger }) => { if (!document.hidden && trigger.isActive) animation.play(); else animation.pause(); });
            root.toggleAttribute("data-motion-paused", document.hidden);
          };
          document.addEventListener("visibilitychange", visibility);
          cleanups.push(() => document.removeEventListener("visibilitychange", visibility));

          if (desktop) {
            // Local pointer lighting, no ambient glows or global pointer listener.
            root.querySelectorAll<HTMLElement>(".fd-feature, .fd-routine-item, .fd-console").forEach(card => {
              let bounds: DOMRect | null = null;
              let scrollAtEnter = 0;
              let frame = 0;
              let x = 0, y = 0;
              const paint = () => {
                frame = 0;
                if (!bounds) return;
                const px = Math.max(0, Math.min(1, (x - bounds.left) / bounds.width));
                const py = Math.max(0, Math.min(1, (y - bounds.top + window.scrollY - scrollAtEnter) / bounds.height));
                card.style.setProperty("--pointer-x", `${px * 100}%`);
                card.style.setProperty("--pointer-y", `${py * 100}%`);
                card.style.setProperty("--tilt-x", `${(py - .5) * -3}deg`);
                card.style.setProperty("--tilt-y", `${(px - .5) * 3}deg`);
              };
              const enter = (event: PointerEvent) => { if (event.pointerType === "touch") return; bounds = card.getBoundingClientRect(); scrollAtEnter = window.scrollY; card.classList.add("fd-pointer-active"); };
              const move = (event: PointerEvent) => { if (!bounds) return; x = event.clientX; y = event.clientY; if (!frame) frame = requestAnimationFrame(paint); };
              const leave = () => { bounds = null; cancelAnimationFrame(frame); frame = 0; card.classList.remove("fd-pointer-active"); card.style.setProperty("--tilt-x", "0deg"); card.style.setProperty("--tilt-y", "0deg"); };
              card.addEventListener("pointerenter", enter); card.addEventListener("pointermove", move); card.addEventListener("pointerleave", leave);
              cleanups.push(() => { leave(); card.removeEventListener("pointerenter", enter); card.removeEventListener("pointermove", move); card.removeEventListener("pointerleave", leave); ["--pointer-x", "--pointer-y", "--tilt-x", "--tilt-y"].forEach(name => card.style.removeProperty(name)); });
            });
            lenis = new Lenis({ duration: .85, anchors: true });
            lenis.on("scroll", ScrollTrigger.update);
            ticker = time => lenis?.raf(time * 1000);
            gsap.ticker.add(ticker);
          }
        }, root);
        ScrollTrigger.refresh();
        return () => {
          cleanups.forEach(cleanup => cleanup());
          if (ticker) gsap.ticker.remove(ticker);
          lenis?.destroy();
          context.revert();
          splits.forEach(split => split.revert());
          delete root.dataset.foodMotion;
          root.removeAttribute("data-motion-paused");
        };
      });
    });
    return () => { disposed = true; media.revert(); };
  }, [rootRef]);
  return null;
}
