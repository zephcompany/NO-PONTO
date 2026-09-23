import { ArrowUpRight } from "lucide-react";

export function FoodButton({ children, href, light = false }: {
  children: React.ReactNode; href: string; light?: boolean;
}) {
  return (
    <a className={`fd-button ${light ? "fd-button-light" : ""}`} href={href}>
      <span>{children}</span>
      <i aria-hidden="true"><ArrowUpRight /></i>
    </a>
  );
}

export function FoodTag({ children }: { children: React.ReactNode }) {
  return <div className="fd-tag"><span aria-hidden="true" />{children}</div>;
}
