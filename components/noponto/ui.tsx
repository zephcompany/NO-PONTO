import { assetPath } from "@/lib/asset-path";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Crosshair } from "lucide-react";
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <ArrowUpRight aria-hidden="true" />
  ) : (
    <ArrowRight aria-hidden="true" />
  );
}
export function SectionTag({ children }: { children: ReactNode }) {
  return (
    <div className="section-tag">
      <Crosshair aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}
export function GradientText({ children }: { children: ReactNode }) {
  return <span className="gradient-text">{children}</span>;
}
export function CTAButton({
  children = "ANALISAR MINHA OPERAÇÃO",
  href,
  light = false,
}: {
  children?: ReactNode;
  href?: string;
  light?: boolean;
}) {
  const content = (
    <>
      <span className="cta-label">{children}</span>
      <i className="cta-orb" aria-hidden="true">
        <Arrow />
      </i>
    </>
  );
  return href ? (
    <a href={href} className={`cta button-sweep ${light ? "cta-light" : ""}`}>
      {content}
    </a>
  ) : (
    <button
      type="button"
      disabled
      className={`cta button-sweep ${light ? "cta-light" : ""}`}
    >
      {content}
    </button>
  );
}
export function Mark({ className = "" }: { className?: string }) {
  return (
    <img
      className={`brand-mark ${className}`}
      src={assetPath("/brand/mark.svg")}
      width="313"
      height="319"
      alt=""
    />
  );
}
export function RichHeading({
  text,
  accent,
}: {
  text: string;
  accent?: string;
}) {
  const focus = accent ?? text.split(" ").slice(-2).join(" ");
  const i = text.lastIndexOf(focus);
  return (
    <>
      {i >= 0 ? (
        <>
          <span className="heading-neutral">{text.slice(0, i)}</span>
          <span className="heading-accent">{focus}</span>
        </>
      ) : (
        <span className="heading-accent">{text}</span>
      )}
    </>
  );
}
