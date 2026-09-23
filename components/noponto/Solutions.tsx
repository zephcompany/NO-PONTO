import copy from "@/content/copy.json";
import { SectionTag, RichHeading } from "./ui";
import {
  DataTable,
  SystemAsset,
  AutomationAsset,
  ProcessAsset,
  BIAsset,
  AIAsset,
} from "./Assets";
export function SolutionBlock({ index }: { index: number }) {
  const assets = [
    <DataTable key="finance" />,
    <BIAsset key="bi" />,
    <ProcessAsset key="process" variant={1} />,
    <SystemAsset key="software" />,
    <AutomationAsset key="automation" />,
    <AIAsset key="ai" />,
  ];
  return (
    <article className={`solution-block solution-${index}`}>
      <div className="solution-copy">
        <span className="solution-number" aria-hidden="true">
          0{index + 1}
        </span>
        <h3>{copy[6][2 + index * 2]}</h3>
        <p>{copy[6][3 + index * 2]}</p>
      </div>
      <div className="solution-visual">{assets[index]}</div>
    </article>
  );
}
export default function Solutions() {
  return (
    <section id="solucoes" className="solutions section light" data-fold="06">
      <div className="container">
        <div className="section-head">
          <SectionTag>{copy[6][0]}</SectionTag>
          <h2>
            <RichHeading text={copy[6][1]} accent="depende do problema." />
          </h2>
        </div>
        <div className="solutions-grid">
          {Array.from({ length: 6 }, (_, i) => (
            <SolutionBlock key={i} index={i} />
          ))}
        </div>
        <p className="solutions-close">{copy[6][14]}</p>
      </div>
    </section>
  );
}
