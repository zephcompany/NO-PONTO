"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, ClipboardList, CookingPot, Package, ReceiptText, ShoppingBasket, Store, Utensils, Wine } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { assetPath } from "@/lib/asset-path";
import { FoodTag } from "./FoodUI";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function KitchenHero() {
  return (
    <div className="fd-kitchen-hero">
      <img className="fd-hero-photo" src={assetPath("/food/kitchen-service.webp")} width="1200" height="800" alt="Cozinheiro finalizando um prato no passe de uma cozinha profissional." fetchPriority="high" />
      <div className="fd-photo-corner"><span>NA COZINHA, CADA DETALHE CONTA.</span><Utensils aria-hidden="true" /></div>
      <div className="fd-prep-ticket">
        <div className="fd-ticket-top"><ClipboardList /><span>Do preparo ao resultado</span><span className="fd-ticket-live" aria-hidden="true" /></div>
        <div className="fd-ticket-dish"><span>O prato é só<br /><strong>o começo.</strong></span><div className="fd-ticket-stamp"><Utensils /><span>FOOD<br />SERVICE</span></div></div>
        <div className="fd-ticket-links"><span><Check /> Ficha técnica</span><span><Check /> Estoque</span><span><Check /> CMV</span></div>
        <div className="fd-ticket-end"><span>Operação</span><i /><ArrowRight /><strong>Gestão</strong></div>
      </div>
      <div className="fd-hero-photo-label"><span>INSUMOS. PREPARO. SERVIÇO.</span><span>UMA OPERAÇÃO CONECTADA.</span></div>
    </div>
  );
}

export function RoutineSection() {
  const items = [
    { icon: ShoppingBasket, title: "Na compra", text: "O custo começa antes de o ingrediente chegar à cozinha.", tags: ["Compras", "Insumos"] },
    { icon: CookingPot, title: "No preparo", text: "Porção, rendimento e perdas fazem parte da conta de cada prato.", tags: ["Ficha técnica", "Estoque"] },
    { icon: ReceiptText, title: "No fechamento", text: "O movimento do salão precisa fazer sentido no resultado.", tags: ["CMV", "DRE"] },
  ];
  return (
    <section className="fd-routine fd-section" id="rotina">
      <div className="fd-wrap">
        <div className="fd-section-heading fd-reveal"><div><FoodTag>A GESTÃO ACONTECE NOS DETALHES</FoodTag><h2>Seu cliente vê o prato.<br /><em>Você precisa ver o todo.</em></h2></div><p>Por trás de cada pedido, existem compras, pessoas, preparos e custos. É nessa rotina que a gestão precisa entrar.</p></div>
        <div className="fd-routine-grid">
          {items.map(({ icon: Icon, title, text, tags }, i) => <article className="fd-routine-item fd-reveal" key={title}>
            <div className="fd-routine-icon"><Icon /><span>0{i + 1}</span></div>
            <h3>{title}</h3><p>{text}</p>
            <div className="fd-routine-tags">{tags.map(t => <span key={t}>{t}</span>)}</div>
          </article>)}
        </div>
        <div className="fd-routine-note"><span>COMPRA</span><ArrowRight /><span>COZINHA</span><ArrowRight /><span>SALÃO</span><ArrowRight /><span>RESULTADO</span></div>
      </div>
    </section>
  );
}

const recipeSteps = [
  { title: "Tudo começa no ingrediente.", text: "O que entra na cozinha tem origem, unidade de medida e custo. Organizar essa base é o primeiro passo para entender o prato.", label: "Insumos", icon: ShoppingBasket, details: ["Cadastro", "Unidade de medida", "Custo de compra"], conclusion: "Uma base organizada." },
  { title: "O preparo ganha uma referência.", text: "Ingredientes, quantidades, rendimento e porção na mesma ficha. O conhecimento da cozinha se transforma em informação para a gestão.", label: "Ficha técnica", icon: ClipboardList, details: ["Ingredientes", "Rendimento", "Porção"], conclusion: "Um padrão para cada preparo." },
  { title: "O consumo conversa com o estoque.", text: "Entradas, saídas e perdas precisam ser lidas junto do que acontece no preparo. É assim que o estoque deixa de ser uma informação isolada.", label: "Estoque", icon: Package, details: ["Entradas", "Consumo", "Perdas"], conclusion: "A movimentação no contexto." },
  { title: "O custo encontra o resultado.", text: "CMV e DRE aproximam o detalhe da operação da visão financeira. Para entender o resultado, é preciso conhecer o caminho do número.", label: "CMV + DRE", icon: ReceiptText, details: ["CMV", "Receita", "Resultado"], conclusion: "Do ingrediente à decisão." },
];

export function RecipeJourney() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".fd-recipe-step").forEach((step, index) => {
        ScrollTrigger.create({ trigger: step, start: "top 64%", end: "bottom 64%", onEnter: () => setActive(index), onEnterBack: () => setActive(index) });
      });
    }, root);
    return () => context.revert();
  }, []);
  const current = recipeSteps[active];
  const CurrentIcon = current.icon;
  return (
    <section className="fd-recipe-journey fd-section" id="do-ingrediente" ref={root}>
      <div className="fd-wrap">
        <div className="fd-section-heading fd-reveal"><div><FoodTag>DO INGREDIENTE AO RESULTADO</FoodTag><h2>Antes de chegar à mesa,<br /><em>já tem muita gestão.</em></h2></div><p>Acompanhe o caminho de um preparo e veja como as informações se conectam.</p></div>
        <div className="fd-recipe-layout">
          <div className="fd-recipe-sticky">
            <div className="fd-recipe-photograph"><img src={assetPath("/food/ingredients.webp")} width="1200" height="800" alt="Hambúrguer em prato de cerâmica e ingredientes organizados em uma bancada de preparo." loading="lazy" /><span className="fd-recipe-photo-label"><Utensils /> DA COZINHA À GESTÃO</span></div>
            <div className="fd-recipe-overlay" key={active}>
              <div className="fd-recipe-overlay-top"><span>0{active + 1} / 04</span><CurrentIcon /></div>
              <h3>{current.label}</h3><div className="fd-recipe-fields">{current.details.map(detail => <span key={detail}><Check />{detail}</span>)}</div>
              <div className="fd-recipe-overlay-foot">{current.conclusion}<ArrowUpRight /></div>
            </div>
            <div className="fd-recipe-progress" aria-hidden="true">{recipeSteps.map((step, i) => <span className={active >= i ? "is-active" : ""} key={step.label} />)}</div>
          </div>
          <div className="fd-recipe-steps">{recipeSteps.map((step, i) => <article key={step.title} className={`fd-recipe-step ${active === i ? "is-active" : ""}`}><span className="fd-recipe-step-index">0{i + 1}</span><div><span className="fd-recipe-step-tag">{step.label}</span><h3>{step.title}</h3><p>{step.text}</p></div></article>)}</div>
        </div>
      </div>
    </section>
  );
}

const formats = [
  { name: "Restaurantes", icon: Utensils, title: "Do pré-preparo ao fechamento.", text: "Fichas técnicas, estoque e financeiro fazem parte da mesma rotina. Uma visão que acompanha o que acontece dentro e fora da cozinha.", focus: ["Preparo", "Salão", "Resultado"] },
  { name: "Bares", icon: Wine, title: "Cada dose também entra na conta.", text: "Insumos, receitas e movimentações precisam de referência. Organização para olhar o estoque e o custo de bebidas junto da operação.", focus: ["Receitas", "Insumos", "Estoque"] },
  { name: "Delivery", icon: Package, title: "O pedido sai. A gestão acompanha.", text: "Preparo, embalagem e custos compõem a operação de delivery. Informações organizadas para entender o resultado por trás do pedido.", focus: ["Ficha técnica", "Embalagem", "Custos"] },
  { name: "Multiunidades", icon: Store, title: "Cada casa tem sua rotina. A visão é do todo.", text: "Olhar cada unidade com critérios comuns ajuda a reconhecer diferenças e prioridades. O detalhe local dentro do contexto da gestão.", focus: ["Unidades", "Indicadores", "Visão consolidada"] },
];

export function FormatsSection() {
  return (
    <section className="fd-formats fd-section" id="para-quem"><div className="fd-wrap">
      <div className="fd-section-heading fd-reveal"><div><FoodTag>FEITO A PARTIR DA OPERAÇÃO</FoodTag><h2>Seu jeito de servir.<br /><em>Uma gestão no ponto.</em></h2></div><p>O formato muda. A necessidade de entender custos, processos e resultado continua.</p></div>
      <Tabs defaultValue="0" className="fd-formats-layout">
        <div className="fd-restaurant-image"><img src={assetPath("/food/restaurant.webp")} width="1200" height="800" loading="lazy" alt="Salão de restaurante contemporâneo, com mesas de madeira e assentos azuis, preparado para o serviço." /><div><span>DO SALÃO À COZINHA.</span><strong>Uma visão<br />da operação inteira.</strong></div></div>
        <div className="fd-formats-content"><TabsList className="fd-format-tabs" aria-label="Formatos de operação">{formats.map(({ name, icon: Icon }, i) => <TabsTrigger key={name} value={String(i)}><Icon /><span>{name}</span></TabsTrigger>)}</TabsList>
          {formats.map(({ name, title, text, focus }, i) => <TabsContent className="fd-format-panel" key={name} value={String(i)}><span className="fd-format-number">0{i + 1} / {name}</span><h3>{title}</h3><p>{text}</p><div className="fd-format-focus">{focus.map(item => <span key={item}>{item}</span>)}</div></TabsContent>)}
        </div>
      </Tabs>
    </div></section>
  );
}

const questions = [
  ["O que é o NoPonto Food?", "É a vertical da NoPonto dedicada a operações de alimentação. A experiência acumulada em restaurantes está sendo transformada em uma solução especializada, conectando financeiro, CMV, DRE, fichas técnicas, estoque, multiunidade, indicadores e integrações."],
  ["O NoPonto Food serve para qual tipo de operação?", "O foco está em restaurantes, bares, delivery e operações com mais de uma unidade. O ponto de partida é entender a rotina e as necessidades de cada negócio."],
  ["Preciso substituir os sistemas que já utilizo?", "Essa definição vem depois do diagnóstico. Avaliamos processos, dados e ferramentas existentes para entender o que precisa ser organizado, integrado ou construído."],
  ["Por onde começamos?", "Pela operação. Primeiro, entendemos onde a informação se perde, onde existe retrabalho e quais números orientam as decisões. A partir disso, definimos as prioridades e o caminho de implementação."],
];

export function FoodFAQ() {
  return <section className="fd-faq fd-section" id="food-faq"><div className="fd-wrap fd-faq-layout"><div className="fd-faq-heading fd-reveal"><FoodTag>ANTES DA CONVERSA</FoodTag><h2>Vamos deixar<br /><em>mais claro.</em></h2><p>Algumas respostas para entender o próximo passo.</p></div><Accordion className="fd-faq-list" type="single" collapsible>{questions.map(([question, answer], i) => <AccordionItem value={String(i)} key={question}><AccordionTrigger><span className="fd-faq-number">0{i + 1}</span><span>{question}</span></AccordionTrigger><AccordionContent><p>{answer}</p></AccordionContent></AccordionItem>)}</Accordion></div></section>;
}
