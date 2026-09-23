import { siteLinks } from "@/content/links";
import copy from "@/content/copy.json";
import {
  ListChecks,
  Database,
  Code2,
  ChartNoAxesCombined,
  ArrowRight,
  Utensils,
  Target,
  ShieldCheck,
  Layers3,
  MessageCircle,
  Workflow,
  GitBranch,
  Unplug,
} from "lucide-react";
import { CTAButton, Mark, SectionTag, RichHeading } from "./ui";
import CaseCard from "./CaseCard";
import { DataTable } from "./Assets";
export { default as Pain } from "./PainExperience";
export { default as Positioning } from "./Positioning";
export function Cases() {
  return (
    <section className="cases section light" id="cases" data-fold="04">
      <div className="container">
        <div className="section-head">
          <SectionTag>{copy[4][0]}</SectionTag>
          <h2>
            <RichHeading
              text={copy[4][1]}
              accent="na operação, não na ferramenta."
            />
          </h2>
        </div>
        <div className="cases-list">
          {[0, 1, 2].map((i) => (
            <CaseCard index={i} key={i} />
          ))}
        </div>
        <div className="cases-close">
          <div>
            <ShieldCheck />
            <p>{copy[4][20]}</p>
          </div>
          <p>{copy[4][21]}</p>
        </div>
      </div>
    </section>
  );
}
export function Marquee() {
  const words = [
    "GESTÃO",
    "DADOS",
    "PROCESSOS",
    "SOFTWARE",
    "AUTOMAÇÃO",
    "IA APLICADA",
  ];
  const icons = [Target, Database, GitBranch, Code2, Workflow, MessageCircle];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((n) => (
          <div className="marquee-group" key={n}>
            {words.map((word, i) => {
              const Icon = icons[i];
              return (
                <span key={word}>
                  <Icon />
                  {word}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
export { default as Outcomes } from "./OutcomesExperience";
export { default as Repertoire } from "./RepertoireExperience";
export function Food() {
  return (
    <section id="food" className="food section" data-fold="09">
      <div className="container">
        <div className="food-layout">
          <div className="food-copy">
            <SectionTag>{copy[9][0]}</SectionTag>
            <div className="food-wordmark">
              <Mark />
              <h2>
                NoPonto <span>Food</span>
              </h2>
            </div>
            <p>{copy[9][2]}</p>
            <p className="food-topics">{copy[9][3]}</p>
            <CTAButton href={siteLinks.food}>Conhecer o NoPonto Food</CTAButton>
          </div>
          <div className="food-visual">
            <div className="food-app">
              <div className="food-app-top">
                <Utensils />
                <span>NoPonto Food</span>
                <span className="food-multi">
                  <Layers3 />
                  Multiunidade
                </span>
              </div>
              <div className="food-app-nav">
                <span>Financeiro</span>
                <span>CMV</span>
                <span>Estoque</span>
              </div>
              <div className="food-app-main">
                <DataTable />
                <div className="food-recipe">
                  <ListChecks />
                  <span>Fichas técnicas</span>
                  <div>
                    <span>CMV</span>
                    <ArrowRight />
                    <span>Margem</span>
                  </div>
                </div>
              </div>
              <div className="food-app-bottom">
                <ChartNoAxesCombined />
                Indicadores
                <Unplug />
                Integrações
              </div>
            </div>
            <div className="food-badge">
              <Utensils />
              <span>Food Service</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export { default as Fit } from "./FitExperience";
export function FinalCTA() {
  return (
    <section id="conversa" className="final-cta section dark" data-fold="11">
      <div className="container">
        <SectionTag>GESTÃO + DADOS + TECNOLOGIA</SectionTag>
        <h2>
          <RichHeading text={copy[11][0]} accent="SUA EMPRESA PRECISA." />
        </h2>
        <p className="final-subtitle">{copy[11][1]}</p>
        <p className="final-description">{copy[11][2]}</p>
        <CTAButton light href={siteLinks.consultation} />
        <p className="final-note">{copy[11][4]}</p>
        <div className="cta-signature" aria-hidden="true">
          <i />
          <Mark />
          <i />
        </div>
      </div>
    </section>
  );
}
