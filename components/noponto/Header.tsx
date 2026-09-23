"use client";
import { assetPath } from "@/lib/asset-path";
import { useState, useEffect, useRef } from "react";
import { Arrow } from "./ui";
const links = [
  ["Método", "#metodo"],
  ["Cases", "#cases"],
  ["Soluções", "#solucoes"],
  ["NoPonto Food", assetPath("/food/")],
  ["FAQ", "#faq"],
];
export default function Header() {
  const root = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let last = window.scrollY,
      anchor = last,
      direction = 0,
      frame = 0;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY),
        next = y > last ? 1 : -1;
      if (next !== direction) {
        anchor = y;
        direction = next;
      }
      setScrolled(y > 40);
      if (y < 100 || (next < 0 && anchor - y > 15)) setHidden(false);
      else if (
        !reduced &&
        y > 240 &&
        y - anchor > 65 &&
        !root.current?.contains(document.activeElement)
      )
        setHidden(true);
      last = y;
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const start = requestAnimationFrame(update);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(start);
    };
  }, []);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header
      ref={root}
      className={`header ${scrolled ? "scrolled" : ""} ${open ? "menu-open" : ""} ${hidden && !open ? "header-hidden" : ""}`}
      onFocusCapture={() => setHidden(false)}
      onPointerEnter={() => setHidden(false)}
    >
      <div className="header-inner">
        <a
          href="#inicio"
          className="logo-link"
          aria-label="NoPonto — início"
          onClick={() => setOpen(false)}
        >
          <img
            src={assetPath("/brand/logo-light.png")}
            width="757"
            height="130"
            alt="NoPonto"
          />
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {links.map(([label, url]) => (
            <a key={url} href={url}>
              <span className="nav-label">
                <span>{label}</span>
                <span aria-hidden="true">{label}</span>
              </span>
            </a>
          ))}
        </nav>
        <a className="header-cta button-sweep" href="#conversa">
          <span className="cta-label">Analisar minha operação</span>
          <i className="cta-orb" aria-hidden="true">
            <Arrow />
          </i>
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Navegação móvel"
        aria-hidden={!open}
        inert={!open}
      >
        {links.map(([label, url], i) => (
          <a
            style={{ transitionDelay: open ? `${i * 35}ms` : "0ms" }}
            key={url}
            href={url}
            onClick={() => setOpen(false)}
          >
            {label}
            <Arrow diagonal />
          </a>
        ))}
        <a href="#conversa" onClick={() => setOpen(false)}>
          Analisar minha operação
          <Arrow />
        </a>
      </nav>
    </header>
  );
}
