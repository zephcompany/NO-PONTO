import {
  FileText,
  FileSpreadsheet,
  MessageCircle,
  UserRound,
  Users,
  Check,
  CircleCheck,
  Database,
  ArrowRight,
  ArrowDown,
  Search,
  GitBranch,
  PanelsTopLeft,
  Code2,
  Link2,
  ShieldCheck,
  ScanLine,
  Target,
  Layers3,
  Truck,
  Package,
  Utensils,
  Sprout,
  Scale,
  Store,
  Factory,
  Settings2,
  Workflow,
  ChartNoAxesCombined,
} from "lucide-react";
import type { ReactNode } from "react";

function Tile({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`viz-tile viz-piece ${className}`}>{children}</div>;
}
function Lines() {
  return (
    <div className="viz-lines">
      <i />
      <i />
      <i />
    </div>
  );
}
function Frame({ children, kind }: { children: ReactNode; kind: string }) {
  return (
    <div className={`visual-scene scene-${kind}`} aria-hidden="true">
      {children}
    </div>
  );
}
export function PainVisual({ index }: { index: number }) {
  if (index === 0)
    return (
      <Frame kind="scattered">
        <Tile className="scatter-sheet">
          <FileSpreadsheet />
          <span>Planilhas</span>
          <div className="sheet-cells">
            {Array.from({ length: 12 }, (_, i) => (
              <i key={i} />
            ))}
          </div>
        </Tile>
        <Tile className="scatter-system">
          <PanelsTopLeft />
          <span>Sistemas</span>
          <Lines />
        </Tile>
        <Tile className="scatter-chat">
          <MessageCircle />
          <span>Mensagens</span>
          <Lines />
        </Tile>
        <div className="broken-link viz-piece">
          <Link2 />
        </div>
      </Frame>
    );
  if (index === 1)
    return (
      <Frame kind="bottleneck">
        <div className="people-queue">
          {[0, 1, 2].map((i) => (
            <Tile key={i}>
              <UserRound />
            </Tile>
          ))}
        </div>
        <div className="queue-lines">
          <i />
          <i />
          <i />
        </div>
        <Tile className="decision-owner">
          <UserRound />
          <span>Dono</span>
        </Tile>
        <span className="viz-caption">Decisão concentrada</span>
      </Frame>
    );
  if (index === 2)
    return (
      <Frame kind="dependency">
        <Tile>
          <Users />
          <span>Equipe</span>
        </Tile>
        <div className="dependency-steps">
          <span>Processo</span>
          <ArrowRight />
          <div className="missing-person">
            <UserRound />
            <i />
          </div>
          <ArrowRight />
          <span>Operação</span>
        </div>
        <div className="dependency-track">
          <i />
          <i />
          <i className="is-missing" />
          <i />
        </div>
      </Frame>
    );
  if (index === 3)
    return (
      <Frame kind="verification">
        <Tile className="verify-document">
          <FileText />
          <span>Relatórios</span>
          <Lines />
          <Lines />
        </Tile>
        <Tile className="verify-lens">
          <Search />
          <span>Conferência</span>
        </Tile>
        <div className="verify-source">
          <Database />
          <span>Dados</span>
          <Link2 />
        </div>
      </Frame>
    );
  if (index === 4)
    return (
      <Frame kind="rework">
        <div className="rework-stack">
          {["Digitada", "Conferida", "Corrigida"].map((x, i) => (
            <Tile key={x} className={`rework-${i}`}>
              <FileSpreadsheet />
              <span>{x}</span>
              <Lines />
            </Tile>
          ))}
        </div>
        <svg className="rework-loop" viewBox="0 0 300 60">
          <path d="M270 5v20q0 20-20 20H40Q20 45 20 25V5" />
          <path d="m12 15 8-10 8 10" />
        </svg>
      </Frame>
    );
  return (
    <Frame kind="disconnected">
      <Tile>
        <PanelsTopLeft />
        <span>Sistema</span>
        <Lines />
      </Tile>
      <div className="disconnected-gap">
        <Link2 />
        <i />
      </div>
      <div className="external-tools">
        <Tile>
          <FileSpreadsheet />
          <span>Planilhas</span>
        </Tile>
        <Tile>
          <MessageCircle />
          <span>Mensagens</span>
        </Tile>
      </div>
    </Frame>
  );
}
export function PositionVisual({ index }: { index: number }) {
  if (index === 0) return <PainVisual index={0} />;
  if (index === 1)
    return (
      <Frame kind="priorities">
        <div className="priority-axis">
          <span>Problema</span>
          <span>Prioridades</span>
        </div>
        <div className="priority-map">
          <div />
          <div />
          <div />
          <div />
          <span className="priority-point p-one">
            <Search />
            Processos
          </span>
          <span className="priority-point p-two">
            <Database />
            Dados
          </span>
          <span className="priority-point p-three">
            <Target />
            Decisão
          </span>
        </div>
      </Frame>
    );
  if (index === 2)
    return (
      <Frame kind="swimlanes">
        {["Processos", "Responsabilidades", "Regras"].map((x, i) => (
          <div className="swimlane viz-piece" key={x}>
            <span>{x}</span>
            <div>
              <i style={{ marginLeft: `${i * 16}%` }}>
                <Check />
              </i>
              <b />
              <i>
                <ArrowRight />
              </i>
            </div>
          </div>
        ))}
      </Frame>
    );
  if (index === 3)
    return (
      <Frame kind="database">
        <Tile className="database-main">
          <Database />
          <span>Dados</span>
          {["Cadastros", "Financeiro", "Operação"].map((x) => (
            <div className="database-row" key={x}>
              <i />
              {x}
              <Check />
            </div>
          ))}
        </Tile>
        <div className="database-link">
          <i />
          <Link2 />
          <i />
        </div>
        <div className="database-outputs">
          <Tile>
            <ChartNoAxesCombined />
            <span>Indicadores</span>
          </Tile>
          <Tile>
            <Target />
            <span>Decisão</span>
          </Tile>
        </div>
      </Frame>
    );
  if (index === 4)
    return (
      <Frame kind="architecture">
        <div className="architecture-tabs">
          <span>
            <PanelsTopLeft /> ERP
          </span>
          <span>
            <Code2 /> Software
          </span>
          <span>
            <Workflow /> Automação
          </span>
        </div>
        <Tile className="architecture-editor">
          <div className="editor-rail">
            <i />
            <i />
            <i />
          </div>
          <div className="editor-code">
            <Code2 />
            {[70, 85, 48, 75].map((w, i) => (
              <i style={{ width: `${w}%` }} key={i} />
            ))}
          </div>
          <div className="editor-preview">
            <Layers3 />
            <span>Operação</span>
            <Check />
          </div>
        </Tile>
      </Frame>
    );
  if (index === 5)
    return (
      <Frame kind="deployment">
        <Tile className="deploy-source">
          <Database />
          <span>Dados</span>
          <Lines />
        </Tile>
        <div className="deploy-path">
          <i />
          <span>
            <Check />
          </span>
          <i />
          <span>
            <ShieldCheck />
          </span>
          <i />
        </div>
        <Tile className="deploy-target">
          <PanelsTopLeft />
          <span>Operação</span>
          <CircleCheck />
        </Tile>
        <span className="viz-caption">Testes · Migração · Homologação</span>
      </Frame>
    );
  return (
    <Frame kind="monitoring">
      <div className="monitor-ring">
        <svg viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="66" />
          <path d="M80 14a66 66 0 1 1-57 33" />
        </svg>
        <Target />
        <span>Gestão</span>
      </div>
      <div className="monitor-list">
        {["Indicadores", "Aderência", "Melhoria contínua"].map((x) => (
          <Tile key={x}>
            <CircleCheck />
            <span>{x}</span>
          </Tile>
        ))}
      </div>
    </Frame>
  );
}
export function MethodVisual({ index }: { index: number }) {
  if (index === 0)
    return (
      <Frame kind="audit">
        <div className="audit-header">
          <Search />
          <span>Mapa do problema</span>
        </div>
        {["Processo", "Retrabalho", "Informação", "Decisão"].map((x, i) => (
          <div className="audit-row viz-piece" key={x}>
            <span>{x}</span>
            <div className={`audit-route route-${i}`}>
              <i />
              <i />
              <i />
              <Target />
            </div>
          </div>
        ))}
        <div className="audit-scan" />
      </Frame>
    );
  if (index === 1)
    return (
      <Frame kind="responsibility">
        <div className="matrix-top">
          <span>Processos</span>
          <Users />
          <Settings2 />
          <Database />
        </div>
        {["Responsabilidades", "Regras", "Cadastros", "Indicadores"].map(
          (x, i) => (
            <div className="matrix-row viz-piece" key={x}>
              <span>{x}</span>
              {[0, 1, 2].map((j) => (
                <i className={(i + j) % 3 === 0 ? "matrix-filled" : ""} key={j}>
                  {(i + j) % 3 === 0 ? <Check /> : <span />}
                </i>
              ))}
            </div>
          ),
        )}
      </Frame>
    );
  if (index === 2)
    return (
      <Frame kind="construction">
        <div className="build-platform">
          <div className="build-grid">
            {["Power BI", "ERP", "CRM", "IA"].map((x, i) => (
              <Tile key={x} className={`build-module module-${i}`}>
                <Code2 />
                <span>{x}</span>
              </Tile>
            ))}
          </div>
        </div>
        <div className="build-output viz-piece">
          <Layers3 />
          <span>Solução feita para a operação real.</span>
        </div>
      </Frame>
    );
  if (index === 3)
    return (
      <Frame kind="validation">
        <div className="validation-column">
          {["Testamos", "Migramos dados", "Treinamos", "Homologamos"].map(
            (x) => (
              <div className="validation-row viz-piece" key={x}>
                <CircleCheck />
                <span>{x}</span>
                <i />
              </div>
            ),
          )}
        </div>
        <div className="validation-seal viz-piece">
          <ShieldCheck />
          <span>Operação</span>
        </div>
      </Frame>
    );
  return (
    <Frame kind="feedback">
      <div className="feedback-loop">
        <svg viewBox="0 0 280 230">
          <path d="M70 35H200Q250 35 250 85V160Q250 195 215 195H65Q25 195 25 160V80Q25 35 70 35" />
          <path d="m130 27 10 8-10 8M145 187l-10 8 10 8" />
        </svg>
        <span className="feedback-top">Indicadores</span>
        <span className="feedback-bottom">Melhoria contínua</span>
        <div className="feedback-center">
          <ChartNoAxesCombined />
          <span>Acompanhamento</span>
        </div>
      </div>
    </Frame>
  );
}
export function OutcomeVisual({ index }: { index: number }) {
  const icons = [
    Target,
    ShieldCheck,
    GitBranch,
    Workflow,
    Layers3,
    PanelsTopLeft,
  ];
  const Icon = icons[index];
  return (
    <Frame kind={`outcome-mini outcome-mini-${index}`}>
      <div className="mini-emblem">
        <Icon />
      </div>
      {index === 0 ? (
        <div className="mini-focus">
          <i />
          <i />
          <i />
        </div>
      ) : index === 1 ? (
        <div className="mini-trace">
          <FileText />
          <Link2 />
          <Database />
          <Check />
        </div>
      ) : index === 2 ? (
        <div className="mini-lanes">
          <i />
          <i />
          <i />
        </div>
      ) : index === 3 ? (
        <div className="mini-workflow">
          <span />
          <ArrowRight />
          <span />
          <ArrowRight />
          <CircleCheck />
        </div>
      ) : index === 4 ? (
        <div className="mini-split">
          <span>Operação</span>
          <span>Financeiro</span>
        </div>
      ) : (
        <div className="mini-scale">
          <i />
          <i />
          <i />
          <i />
        </div>
      )}
    </Frame>
  );
}
export function SectorVisual({ index }: { index: number }) {
  if (index === 0)
    return (
      <Frame kind="restaurant">
        <div className="restaurant-plan">
          {[0, 1, 2, 3].map((i) => (
            <div className="restaurant-table viz-piece" key={i}>
              <Utensils />
              <i />
              <i />
            </div>
          ))}
        </div>
        <div className="restaurant-ticket viz-piece">
          <FileText />
          <span>Fichas técnicas</span>
          <Lines />
          <span>CMV</span>
          <span>Estoque</span>
        </div>
      </Frame>
    );
  if (index === 1)
    return (
      <Frame kind="distribution">
        <div className="warehouse viz-piece">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Package key={i} />
          ))}
        </div>
        <div className="logistics-route">
          <i />
          <span>
            <Truck />
          </span>
          <i />
        </div>
        <Tile>
          <Store />
          <span>Distribuição</span>
        </Tile>
      </Frame>
    );
  if (index === 2)
    return (
      <Frame kind="production">
        <div className="production-top">
          <Factory />
          <span>Produção</span>
        </div>
        <div className="production-line">
          {[0, 1, 2].map((i) => (
            <Tile key={i}>
              <Settings2 />
              <span />
              <Check />
            </Tile>
          ))}
        </div>
        <div className="conveyor">
          {Array.from({ length: 14 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
      </Frame>
    );
  if (index === 3)
    return (
      <Frame kind="agro">
        <div className="agro-fields">
          {[0, 1, 2].map((i) => (
            <div className="viz-piece" key={i}>
              <Sprout />
              <i />
              <i />
              <i />
            </div>
          ))}
        </div>
        <div className="agro-chain">
          <span>Operação</span>
          <ArrowRight />
          <span>Packing house</span>
          <ArrowRight />
          <Truck />
        </div>
      </Frame>
    );
  if (index === 4)
    return (
      <Frame kind="legal">
        <div className="legal-folders">
          {["Financeiro", "Gestão", "Sistemas internos"].map((x, i) => (
            <Tile key={x} className={`legal-folder folder-${i}`}>
              <Scale />
              <span>{x}</span>
              <Lines />
            </Tile>
          ))}
        </div>
      </Frame>
    );
  return (
    <Frame kind="retail">
      <div className="retail-window">
        <Store />
        <span>Comercial</span>
        <div className="retail-products">
          <i />
          <i />
          <i />
        </div>
      </div>
      <Tile className="retail-crm">
        <UserRound />
        <span>CRM</span>
        <Lines />
      </Tile>
      <div className="retail-bottom">
        <FileSpreadsheet />
        <span>Gestão financeira</span>
        <ArrowRight />
      </div>
    </Frame>
  );
}
