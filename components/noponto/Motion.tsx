"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
export default function Motion() {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    let lenis: Lenis | undefined;
    let ticker: ((time: number) => void) | undefined;
    mm.add("(min-width: 901px) and (pointer: fine)", () => {
      lenis = new Lenis({ duration: 0.8, smoothWheel: true, anchors: true });
      lenis.on("scroll", ScrollTrigger.update);
      ticker = (time) => lenis?.raf(time * 1000);
      gsap.ticker.add(ticker);
      return () => {
        if (ticker) gsap.ticker.remove(ticker);
        lenis?.destroy();
        lenis = undefined;
      };
    });
    const ctx = gsap.context(() => {
      gsap.from(".hero h1", {
        y: 24,
        opacity: 0,
        duration: 1,
        delay: 0.15,
        ease: "power3.out",
      });
      gsap.from(".hero-description,.hero-manifesto", {
        y: 16,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
      });
      gsap.to(".marquee-track", {
        xPercent: -50,
        duration: 35,
        ease: "none",
        repeat: -1,
      });
    });
    let move: ((e: PointerEvent) => void) | undefined;
    let over: ((e: PointerEvent) => void) | undefined;
    if (
      window.matchMedia("(pointer:fine) and (min-width:901px)").matches &&
      cursor.current
    ) {
      const x = gsap.quickTo(cursor.current, "x", {
        duration: 0.18,
        ease: "power2.out",
      });
      const y = gsap.quickTo(cursor.current, "y", {
        duration: 0.18,
        ease: "power2.out",
      });
      move = (e) => {
        x(e.clientX);
        y(e.clientY);
        cursor.current!.style.opacity = "1";
      };
      over = (e) => {
        const target = e.target as Element;
        cursor.current?.classList.toggle(
          "cursor-active",
          !!target.closest("a,button:not(:disabled),.case-card"),
        );
      };
      window.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("pointerover", over, { passive: true });
    }
    let anchorFrame = 0;
    let disposed = false;
    const initialHash = window.location.hash;
    const refresh = () => {
      if (disposed) return;
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      if (
        [
          "#inicio",
          "#cases",
          "#metodo",
          "#solucoes",
          "#food",
          "#conversa",
          "#faq",
          "#posicionamento",
        ].includes(initialHash)
      ) {
        anchorFrame = requestAnimationFrame(() =>
          document
            .getElementById(initialHash.slice(1))
            ?.scrollIntoView({ behavior: "instant", block: "start" }),
        );
      }
    };
    document.fonts.ready.then(refresh);
    return () => {
      disposed = true;
      cancelAnimationFrame(anchorFrame);
      ctx.revert();
      mm.revert();
      if (move) window.removeEventListener("pointermove", move);
      if (over) window.removeEventListener("pointerover", over);
    };
  }, []);
  return (
    <>
      <div className="custom-cursor" ref={cursor} aria-hidden="true" />
    </>
  );
}
