import {
  FileSpreadsheet,
  FileText,
  Database,
  Workflow,
  ChartNoAxesCombined,
  Check,
  ArrowRight,
  ArrowDown,
  ScanLine,
  PanelsTopLeft,
  ListChecks,
  Link2,
  Settings2,
  MessageCircle,
  FolderCheck,
  CircleCheck,
  GitBranch,
  Target,
  Search,
  Layers3,
} from "lucide-react";
import { Mark } from "./ui";
export function DataTable({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`data-table ${compact ? "compact" : ""}`}
      aria-hidden="true"
    >
      <div className="asset-top">
        <span>
          <FileSpreadsheet /> DRE gerencial
        </span>
        <Sliders />
      </div>
      <div className="ledger-head">
        <span>Gestão financeira</span>
        <span>Dados</span>
        <span>Fechamentos</span>
      </div>
      {["Fluxo de caixa", "CMV", "Margem", "Precificação"].map((x, i) => (
        <div className="ledger-row" key={x}>
          <span>
            <i className={`ledger-key key-${i}`} />
            {x}
          </span>
          <span>
            <Check />
          </span>
          <span>
            <CircleCheck />
          </span>
        </div>
      ))}
      <div className="ledger-bottom">
        <ChartNoAxesCombined />
        <span>Análise gerencial</span>
        <ArrowRight />
      </div>
    </div>
  );
}
function Sliders() {
  return <Settings2 className="asset-control" />;
}
const stageIcons = [
  Search,
  Layers3,
  PanelsTopLeft,
  FolderCheck,
  ChartNoAxesCombined,
];
export function ProcessAsset({ variant = 0 }: { variant?: number }) {
  const labels = [
    ["Processos", "Dados", "Indicadores"],
    ["Responsabilidades", "Regras", "Cadastros"],
    ["Power BI", "ERP", "Automação"],
    ["Dados", "Time", "Ferramenta"],
    ["Indicadores", "Aderência", "Melhoria contínua"],
  ][variant];
  const Icon = stageIcons[variant];
  return (
    <div className={`process-asset process-${variant}`} aria-hidden="true">
      <div className="process-orbit">
        <svg
          className="process-connectors"
          viewBox="0 0 400 260"
          preserveAspectRatio="none"
        >
          <path d="M80 60V126H320V60M200 126V226" />
        </svg>
        <div className="orbit-core">
          <Icon />
        </div>
        {labels.map((label, i) => (
          <div className={`orbit-node orbit-node-${i}`} key={label}>
            {i === 0 ? <FileText /> : i === 1 ? <Database /> : <ListChecks />}
            <span>{label}</span>
          </div>
        ))}
        <span className="orbit-arrow orbit-arrow-a">
          <ArrowRight />
        </span>
        <span className="orbit-arrow orbit-arrow-b">
          <ArrowDown />
        </span>
      </div>
      <div className="process-caption">
        <Mark />
        <span>
          {
            [
              "mapa do problema e prioridades.",
              "operação preparada para receber tecnologia.",
              "solução feita para a operação real.",
              "ferramenta funcionando na operação.",
              "melhoria contínua.",
            ][variant]
          }
        </span>
        <CircleCheck />
      </div>
    </div>
  );
}
export function SystemAsset() {
  return (
    <div className="system-asset" aria-hidden="true">
      <div className="asset-top">
        <span>
          <PanelsTopLeft /> SISTEMA OPERACIONAL
        </span>
        <Mark />
      </div>
      <div className="system-tabs">
        <span>Operação</span>
        <span>Financeiro</span>
        <span>Indicadores</span>
      </div>
      <div className="system-body">
        <div className="system-sidebar">
          <Layers3 />
          <Database />
          <GitBranch />
          <Settings2 />
        </div>
        <div className="system-workspace">
          <div className="system-title">Uma operação. Uma visão.</div>
          <div className="operation-lanes">
            <div>
              <FileText />
              <span>Documentos</span>
            </div>
            <ArrowRight />
            <div>
              <Database />
              <span>Dados</span>
            </div>
            <ArrowRight />
            <div>
              <ChartNoAxesCombined />
              <span>Indicadores</span>
            </div>
          </div>
          <div className="system-records">
            <span>
              <FolderCheck /> Processos
            </span>
            <span>
              <Link2 /> Integrações
            </span>
            <span>
              <Target /> Gestão
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export function AutomationAsset() {
  return (
    <div className="automation-asset" aria-hidden="true">
      <div className="asset-top">
        <span>
          <Workflow /> AUTOMAÇÃO/IA
        </span>
        <Sliders />
      </div>
      <div className="workflow-canvas">
        <div className="workflow-step">
          <FileText />
          <span>Importação de documentos</span>
          <Check />
        </div>
        <div className="workflow-edge">
          <i />
          <ArrowDown />
        </div>
        <div className="workflow-step workflow-focus">
          <ScanLine />
          <span>Análise de dados</span>
          <i className="state-led" />
        </div>
        <div className="workflow-edge">
          <i />
          <ArrowDown />
        </div>
        <div className="workflow-step">
          <ChartNoAxesCombined />
          <span>Apoio à decisão</span>
          <ArrowRight />
        </div>
      </div>
    </div>
  );
}
export function IntegrationMap() {
  return (
    <div className="integration-map" aria-hidden="true">
      <div className="integration-column">
        <span>
          <FileSpreadsheet />
          planilhas
        </span>
        <span>
          <PanelsTopLeft />
          sistemas
        </span>
        <span>
          <MessageCircle />
          mensagens
        </span>
      </div>
      <div className="integration-break">
        <svg viewBox="0 0 110 180">
          <path
            d="M0 30Q55 30 55 90M0 90H40M0 150Q55 150 55 100M70 90H110"
            strokeDasharray="4 5"
          />
        </svg>
        <Link2 />
      </div>
      <div className="integration-person">
        <Layers3 />
        <span>operação</span>
      </div>
    </div>
  );
}
export function BIAsset() {
  return (
    <div className="bi-asset" aria-hidden="true">
      <div className="bi-top">
        <ChartNoAxesCombined />
        <span>Power BI</span>
        <Settings2 />
      </div>
      <div className="bi-hierarchy">
        <div className="bi-parent">
          <Database />
          Centralização
        </div>
        <div className="bi-branches">
          <span>Indicadores</span>
          <span>Drill-down</span>
          <span>Metas</span>
        </div>
        <div className="bi-result">
          <Target />
          Análise gerencial
          <ArrowRight />
        </div>
      </div>
    </div>
  );
}
export function AIAsset() {
  return (
    <div className="ai-asset" aria-hidden="true">
      <div className="ai-sources">
        <span>
          <Database />
          Análise de dados
        </span>
        <span>
          <MessageCircle />
          WhatsApp
        </span>
      </div>
      <svg
        className="ai-connectors"
        viewBox="0 0 520 170"
        preserveAspectRatio="none"
      >
        <path d="M245 22H260V52H365M245 80H260V52M393 91V127" />
      </svg>
      <div className="ai-core">
        <ScanLine />
        <span>Agentes internos</span>
      </div>
      <div className="ai-result">
        <CircleCheck />
        <span>Apoio à decisão</span>
        <ArrowRight />
      </div>
    </div>
  );
}
