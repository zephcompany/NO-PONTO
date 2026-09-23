import { assetPath } from "@/lib/asset-path";
import type { Metadata } from "next";
import "./globals.css";
import "./experience.css";
import "./interaction-refinements.css";
import "./preloader.css";
import "./hero-demos.css";
import Preloader from "@/components/noponto/Preloader";

// Decide before the first paint; CSS finishes the intro even if hydration fails.
const introBootstrap = `(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  try {
    if (sessionStorage.getItem('noponto-intro-v8')) return;
    sessionStorage.setItem('noponto-intro-v8', '1');
  } catch (_) {}
  document.documentElement.setAttribute('data-noponto-intro', '');
})();`;
export const metadata: Metadata = {
  title: "NoPonto — Gestão · Dados · Tecnologia",
  description:
    "A NoPonto entra na operação, identifica onde existe perda, retrabalho ou falta de controle e constrói a solução necessária, de processos e indicadores a automações, sistemas e IA.",
  icons: { icon: assetPath("/favicon.svg"), shortcut: assetPath("/favicon.svg") },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preload" href={assetPath("/fonts/instrument-sans.ttf")} as="font" type="font/ttf" crossOrigin="anonymous" />
        <style>{`@font-face{font-family:"Instrument Sans";src:url("${assetPath("/fonts/instrument-sans.ttf")}") format("truetype");font-weight:400 700;font-display:swap;}`}</style>
        <script dangerouslySetInnerHTML={{ __html: introBootstrap }} />
      </head>
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
