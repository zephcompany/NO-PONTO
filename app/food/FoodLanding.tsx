"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, ArrowLeft, Check, ChevronRight, FileText, Layers3, Package, ReceiptText, Store, Network, Utensils, X, Menu, Plus, Minus, Equal, ChartNoAxesCombined } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { assetPath } from "@/lib/asset-path";
import FoodMotion from "./FoodMotion";
import { FoodButton, FoodTag } from "./FoodUI";
import { KitchenHero, RoutineSection, RecipeJourney, FormatsSection, FoodFAQ } from "./FoodSections";

const home = assetPath("/");
const modules = ["Fichas técnicas", "CMV", "DRE"];
const capabilities = ["Financeiro", "CMV", "DRE", "Fichas técnicas", "Estoque", "Multiunidade", "Indicadores", "Integrações"];

function ProductCanvas() {
  const [active, setActive] = useState("0");
  const root = useRef<HTMLDivElement>(null);
  const interacting = useRef(false);
  const selectedAt = useRef(0);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.2 });
    if (root.current) observer.observe(root.current);
    const timer = window.setInterval(() => {
      if (!visible || media.matches || document.hidden || interacting.current || Date.now() - selectedAt.current < 7000) return;
      setActive(current => String((Number(current) + 1) % modules.length));
    }, 5200);
    return () => { observer.disconnect(); window.clearInterval(timer); };
  }, []);
  return <div className="fd-console" ref={root} onPointerEnter={() => { interacting.current = true; }} onPointerLeave={() => { interacting.current = !!root.current?.contains(document.activeElement); }} onFocusCapture={() => { interacting.current = true; }} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) interacting.current = false; }}>
    <div className="fd-console-top"><span><Utensils /> NoPonto Food</span><span className="fd-console-context">Da operação ao resultado</span><Layers3 aria-hidden="true" /></div>
    <Tabs value={active} onValueChange={value => { selectedAt.current = Date.now(); setActive(value); }} className="fd-product-tabs">
      <TabsList className="fd-console-nav" aria-label="Explore a gestão da operação">
        {modules.map((label, i) => <TabsTrigger className="fd-console-tab" key={label} value={String(i)}><span>0{i + 1}</span>{label}<ChevronRight aria-hidden="true" /></TabsTrigger>)}
      </TabsList>
      <div className="fd-console-stage">
        <TabsContent value="0" className="fd-demo fd-recipe">
          <div className="fd-demo-heading"><span>FICHAS TÉCNICAS</span><FileText aria-hidden="true" /></div>
          <h3>O detalhe de cada preparo.</h3>
          <div className="fd-recipe-sheet">
            <div className="fd-recipe-row"><span><Package /> Insumos</span><div className="fd-sheet-lines"><i /><i /><i /></div><Check /></div>
            <div className="fd-recipe-row"><span><Utensils /> Preparo</span><div className="fd-sheet-lines"><i /><i /></div><Check /></div>
            <div className="fd-recipe-row"><span><Layers3 /> Rendimento</span><div className="fd-sheet-lines"><i /><i /><i /><i /></div><Check /></div>
          </div>
          <div className="fd-demo-result"><span>Fichas técnicas</span><ArrowRight /><strong>CMV</strong></div>
        </TabsContent>
        <TabsContent value="1" className="fd-demo fd-cmv">
          <div className="fd-demo-heading"><span>CUSTO DA MERCADORIA VENDIDA</span><Package aria-hidden="true" /></div>
          <h3>Entenda o que compõe o custo.</h3>
          <div className="fd-equation">
            <div><Package /><span>Estoque inicial</span></div><Plus />
            <div><ReceiptText /><span>Compras</span></div><Minus />
            <div><Package /><span>Estoque final</span></div>
          </div>
          <div className="fd-cmv-total"><Equal /><strong>CMV</strong><span>Da movimentação<br />à margem.</span></div>
        </TabsContent>
        <TabsContent value="2" className="fd-demo fd-dre">
          <div className="fd-demo-heading"><span>DRE GERENCIAL</span><ChartNoAxesCombined aria-hidden="true" /></div>
          <h3>Uma leitura do resultado.</h3>
          <div className="fd-dre-tree">
            <div><span>Receita líquida</span><Plus /></div>
            <div><span>CMV</span><Minus /></div>
            <div className="fd-dre-subtotal"><span>Lucro bruto</span><Equal /></div>
            <div><span>Despesas operacionais</span><Minus /></div>
            <div className="fd-dre-total"><strong>Resultado operacional</strong><ArrowUpRight /></div>
          </div>
        </TabsContent>
      </div>
    </Tabs>
    <div className="fd-console-bottom"><span>Financeiro</span><i /><span>Operação</span><i /><span>Gestão</span><div aria-hidden="true">{modules.map((m, i) => <b key={m} className={active === String(i) ? "is-active" : ""} />)}</div></div>
  </div>;
}

export default function FoodLanding() {
  const root = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let last = window.scrollY, anchor = last, direction = 0, frame = 0;
    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY), next = y > last ? 1 : -1;
      if (next !== direction) { anchor = y; direction = next; }
      setScrolled(y > 30);
      if (y < 140 || (next < 0 && anchor - y > 15)) setHidden(false);
      else if (y > 350 && y - anchor > 90 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches && !root.current?.querySelector(".fd-header")?.contains(document.activeElement)) setHidden(true);
      last = y;
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const escape = (e: KeyboardEvent) => { if (e.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); } };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("keydown", escape);
    return () => { window.removeEventListener("scroll", scroll); cancelAnimationFrame(frame); window.removeEventListener("keydown", escape); };
  }, []);
  return <div className="food-page" ref={root}>
    <style>{`body:has(.food-page){--food-intro-logo:url("${assetPath("/food/logo-dark.webp")}");}`}</style>
    <a className="fd-skip" href="#food-main">Ir para o conteúdo</a>
    <header className={`fd-header ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "is-open" : ""} ${hidden && !menuOpen ? "fd-header-hidden" : ""}`} onFocusCapture={() => setHidden(false)} onPointerEnter={() => setHidden(false)}>
      <div className="fd-wrap fd-header-inner">
        <a href="#food-inicio" aria-label="NoPonto Food — início" className="fd-logo" onClick={() => setMenuOpen(false)}><img src={assetPath("/food/logo-light.webp")} width="640" height="314" alt="NoPonto Food Service" /></a>
        <nav className="fd-desktop-nav" aria-label="Navegação principal">{[["O produto", "#produto"], ["Para quem", "#para-quem"], ["O método", "#operacao"], ["FAQ", "#food-faq"], ["NoPonto", home]].map(([label, href]) => <a key={label} href={href}><span className="fd-nav-word"><span>{label}</span><span aria-hidden="true">{label}</span></span>{href === home && <ArrowUpRight />}</a>)}</nav>
        <a className="fd-header-contact" href={`${home}#conversa`}>Analisar minha operação <ArrowUpRight /></a>
        <button ref={menuButton} className="fd-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="food-mobile-menu">{menuOpen ? <X /> : <Menu />}</button>
      </div>
      <nav id="food-mobile-menu" className="fd-mobile-nav" aria-label="Navegação móvel" inert={!menuOpen} aria-hidden={!menuOpen}>
        <a href="#produto" onClick={() => setMenuOpen(false)}>O produto <ArrowRight /></a><a href="#para-quem" onClick={() => setMenuOpen(false)}>Para quem <ArrowRight /></a><a href="#operacao" onClick={() => setMenuOpen(false)}>O método <ArrowRight /></a><a href="#food-faq" onClick={() => setMenuOpen(false)}>FAQ <ArrowRight /></a><a href={home}>NoPonto <ArrowUpRight /></a><a href={`${home}#conversa`}>Analisar minha operação <ArrowUpRight /></a>
      </nav>
    </header>
    <main id="food-main">
      <section className="fd-hero" id="food-inicio">
        <div className="fd-wrap fd-hero-grid">
          <div className="fd-hero-copy">
            <FoodTag>GESTÃO PARA FOOD SERVICE</FoodTag>
            <h1>Sua operação.<br />Cada detalhe.<br /><em>No ponto.</em></h1>
            <p>Financeiro, CMV, fichas técnicas e estoque. Uma visão conectada da gestão de restaurantes.</p>
            <FoodButton href="#produto" light>Conhecer o NoPonto Food</FoodButton>
            <span className="fd-hero-audience">Restaurantes · Bares · Delivery · Multiunidades</span>
          </div>
          <div className="fd-hero-visual"><KitchenHero /></div>
        </div>
        <div className="fd-hero-bottom fd-wrap"><span>Especializado na sua operação.</span><a href="#produto" aria-label="Explorar o produto"><ArrowRight /></a><span>Uma vertical NoPonto.</span></div>
      </section>
      <div className="fd-capability-band" aria-label="Áreas de gestão"><div className="fd-capability-track">{[0, 1].map(repeat => <div className="fd-band-group" key={repeat} aria-hidden={repeat === 1 ? true : undefined}>{capabilities.map(label => <span key={label}>{label}</span>)}</div>)}</div></div>
      <RoutineSection />
      <section className="fd-product fd-section" id="produto">
        <div className="fd-wrap">
          <div className="fd-section-heading fd-reveal"><div><FoodTag>DA OPERAÇÃO AO RESULTADO</FoodTag><h2>O que acontece na cozinha<br /><em>aparece na gestão.</em></h2></div><p>Compras, preparo, estoque e resultado fazem parte da mesma operação. A gestão precisa enxergar essas conexões.</p></div>
          <div className="fd-feature-grid">
            <article className="fd-feature fd-feature-finance fd-reveal">
              <div className="fd-feature-head"><span>01 / FINANCEIRO</span><ReceiptText aria-hidden="true" /></div>
              <h3>Conheça o resultado.<br /><em>Entenda a composição.</em></h3><p>Financeiro, CMV e DRE para colocar custos e resultado no mesmo contexto.</p>
              <div className="fd-finance-visual" aria-hidden="true"><div><span>Financeiro</span><ReceiptText /></div><i /><div><span>CMV</span><Package /></div><i /><div className="fd-finance-end"><span>DRE</span><ArrowUpRight /></div></div>
              <div className="fd-feature-labels"><span>Financeiro</span><span>CMV</span><span>DRE</span></div>
            </article>
            <article className="fd-feature fd-feature-kitchen fd-reveal">
              <div className="fd-feature-head"><span>02 / OPERAÇÃO</span><Utensils aria-hidden="true" /></div>
              <div className="fd-kitchen-visual" aria-hidden="true"><img src={assetPath("/food/ingredients.webp")} width="600" height="400" alt="" loading="lazy" /><div><FileText /><span>Ficha técnica</span><b>Insumos · Preparo · Rendimento</b></div></div>
              <h3>O controle começa<br /><em>no detalhe.</em></h3><p>Fichas técnicas e estoque aproximam o planejamento da rotina da operação.</p><div className="fd-feature-labels"><span>Fichas técnicas</span><span>Estoque</span></div>
            </article>
            <article className="fd-feature fd-feature-network fd-reveal"><div className="fd-network-copy"><div className="fd-feature-head"><span>03 / VISÃO DO TODO</span></div><h3>Cada unidade.<br /><em>O mesmo contexto.</em></h3><p>Multiunidade, indicadores e integrações para conectar as diferentes partes da gestão.</p><div className="fd-feature-labels"><span>Multiunidade</span><span>Indicadores</span><span>Integrações</span></div></div><div className="fd-network-visual" aria-hidden="true"><div className="fd-network-center"><Network /><span>Gestão</span></div><div className="fd-network-branches"><i /><i /><i /></div><div className="fd-network-stores">{[0,1,2].map(i=><span key={i}><Store /></span>)}</div></div></article>
          </div>
        </div>
      </section>
      <RecipeJourney />
      <section className="fd-management fd-section" id="gestao"><div className="fd-wrap fd-management-layout"><div className="fd-management-copy fd-reveal"><FoodTag>GESTÃO CONECTADA</FoodTag><h2>Não é só o que vende.<br /><em>É o que fica.</em></h2><p>Uma cozinha movimentada conta parte da história. CMV, despesas e resultado completam a leitura.</p><div className="fd-management-points"><div><span>01</span><p><strong>Ficha técnica</strong>A referência do que compõe cada preparo.</p></div><div><span>02</span><p><strong>CMV</strong>O custo da mercadoria no contexto da operação.</p></div><div><span>03</span><p><strong>DRE</strong>Receita, custos e despesas na leitura do resultado.</p></div></div></div><div className="fd-management-console fd-reveal"><ProductCanvas /><p>Explore as três visões da gestão.</p></div></div></section>
      <FormatsSection />
      <section className="fd-operation fd-section" id="operacao"><div className="fd-wrap">
        <div className="fd-operation-heading fd-reveal"><FoodTag>EXPERIÊNCIA QUE VEM DA OPERAÇÃO</FoodTag><h2>A ferramenta muda.<br /><em>O método permanece.</em></h2><p>A experiência acumulada em operações de alimentação está sendo transformada em uma solução especializada para restaurantes.</p></div>
        <div className="fd-operation-flow"><div className="fd-operation-line" aria-hidden="true" />{[{name:"Entender",text:"A rotina, os processos e os pontos de perda."},{name:"Organizar",text:"As informações, as responsabilidades e os indicadores."},{name:"Conectar",text:"Operação e financeiro no mesmo contexto."}].map((step,i)=><div className="fd-operation-step" key={step.name}><span className="fd-step-number">0{i+1}</span><h3>{step.name}</h3><p>{step.text}</p></div>)}</div>
        <div className="fd-operation-foot"><span>QUANDO UM PROBLEMA SE REPETE,<br />O CONHECIMENTO VIRA PRODUTO.</span><a href={home}>Conheça a NoPonto <ArrowUpRight /></a></div>
      </div></section>
      <FoodFAQ />
      <section className="fd-contact fd-section"><div className="fd-wrap fd-contact-inner"><div className="fd-reveal"><FoodTag>NOPONTO FOOD</FoodTag><h2>Primeiro, vamos<br /><em>entender sua operação.</em></h2><FoodButton href={`${home}#conversa`} light>Analisar minha operação</FoodButton></div><img className="fd-contact-logo" src={assetPath("/food/logo-light.webp")} width="640" height="314" alt="NoPonto Food Service" loading="lazy" /></div></section>
    </main>
    <FoodMotion rootRef={root} />
    <footer className="fd-footer"><div className="fd-wrap"><span>NoPonto Food Service</span><a href={home}><ArrowLeft /> Voltar para a NoPonto</a></div></footer>
  </div>;
}
