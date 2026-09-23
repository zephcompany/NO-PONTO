import {
  FileText,
  Database,
  SearchCheck,
  FileSpreadsheet,
  ShieldCheck,
  ArrowDown,
  Check,
  ArrowRight,
} from "lucide-react";
import AnimatedEvidence from "./AnimatedEvidence";
import copy from "@/content/copy.json";
import { SectionTag, RichHeading } from "./ui";
function CaseVisual({ index }: { index: number }) {
  if (index === 0)
    return (
      <div className="case-visual case-docs" aria-hidden="true">
        <div className="evidence-title">
          <FileText />
          Documentos
          <ArrowRight />
          <Database />
          Dados
        </div>
        <div className="documents-stream">
          {[0, 1, 2].map((i) => (
            <div className="fiscal-document" key={i}>
              <FileText />
              <span>Documentos</span>
              <i className="document-scan" />
              <div className="doc-lines">
                <i />
                <i />
                <i />
              </div>
              <Check />
            </div>
          ))}
        </div>
        <div className="metric-main">
          <b data-counter="11494">11.494</b>
          <span>documentos analisados</span>
        </div>
        <div className="metric-bottom">
          <b
            data-counter="1.3"
            data-format="decimal"
            data-prefix="R$ "
            data-suffix=" milhão"
          >
            R$ 1,3 milhão
          </b>
          <span>em devoluções mapeadas.</span>
          <SearchCheck />
        </div>
      </div>
    );
  if (index === 1)
    return (
      <div className="case-visual case-migration" aria-hidden="true">
        <div className="evidence-title">
          <FileSpreadsheet />
          Financeiro
          <ArrowRight />
          <Database />
          Sistema
        </div>
        <div className="migration-sheet">
          <div>
            auditoria <Check />
          </div>
          <div>
            organização <Check />
          </div>
          <div>
            migração <Check />
          </div>
        </div>
        <div className="migration-flow">
          <ArrowDown />
        </div>
        <div className="migration-result">
          <ShieldCheck />
          <b data-counter="2180">2.180</b>
          <span>lançamentos migrados e auditados.</span>
        </div>
      </div>
    );
  return (
    <div className="case-visual case-reconcile" aria-hidden="true">
      <div className="evidence-title">
        <ShieldCheck />
        estrutura financeira
      </div>
      <div className="compare-block">
        <span>valores &apos;a confirmar&apos;</span>
        <b data-counter="296" data-prefix="R$ " data-suffix=" mil">
          R$ 296 mil
        </b>
        <div className="compare-bar before" />
      </div>
      <div className="compare-connector">
        <ArrowDown />
        <span>revisão de regras</span>
      </div>
      <div className="compare-block resolved">
        <span>aproximadamente</span>
        <b
          data-counter="12.5"
          data-format="decimal"
          data-prefix="R$ "
          data-suffix=" mil"
        >
          R$ 12,5 mil
        </b>
        <div className="compare-bar after" />
      </div>
    </div>
  );
}
export default function CaseCard({ index }: { index: number }) {
  const c = copy[4].slice(2 + index * 6, 8 + index * 6);
  return (
    <article className={`case-card case-${index}`}>
      <AnimatedEvidence index={index}>
        <CaseVisual index={index} />
      </AnimatedEvidence>
      <div className="case-content">
        <SectionTag>{c[0]}</SectionTag>
        <h3>
          <RichHeading text={c[1]} />
        </h3>
        <div className="case-facts">
          <p>{c[2]}</p>
          <p>{c[3]}</p>
        </div>
        <p className="case-evidence">{c[4]}</p>
        <p className="case-takeaway">{c[5]}</p>
      </div>
    </article>
  );
}
