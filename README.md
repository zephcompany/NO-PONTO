# NoPonto — Landing page

Landing page em português, com a identidade oficial e todas as dobras 00–13. React, TypeScript, Vinext/Vite, GSAP + ScrollTrigger e Lenis. Fonte Instrument Sans hospedada no próprio projeto.

## GitHub Pages

Página publicada: https://zephcompany.github.io/NO-PONTO/

O workflow `.github/workflows/pages.yml` gera uma exportação estática e publica automaticamente os commits da branch `main`. Para gerar o mesmo build localmente:

```sh
npm ci
npm run build:pages
```

Os arquivos prontos ficam em `out/`, com os assets e fontes configurados para `/NO-PONTO/`. O build original para Sites continua disponível em `npm run build`.

## Executar

Requer Node.js 22.13 ou posterior.

```sh
npm ci
npm run dev
```

A prévia local fica em `http://localhost:5173`.

```sh
npx tsc --noEmit
npm run build
npm start
```

O build produz `dist/client` e `dist/server`, compatíveis com Cloudflare Workers. O manifesto `.openai/hosting.json` identifica a publicação no Sites.

## Conteúdo e destinos

- `content/copy-original.txt`: fonte integral recebida.
- `content/copy.json`: trechos da copy usados nos componentes, sem reformulação.
- `content/links.ts`: links oficiais dos CTAs e redes sociais. Foram deixados sem configuração por autorização do cliente. Os botões sem destino ficam desativados; os links do menu navegam pela página.
- `components/noponto`: componentes da landing page.
- `app/globals.css`: identidade visual e composição base.
- `app/experience.css`: refinamentos, assets, estados de interação e adaptações responsivas.
- `public/brand` e `public/fonts`: materiais oficiais da marca e licença da fonte.

A ficha técnica, notas entre colchetes e a instrução “TRÊS RECORTES REAIS” são marcações de produção; não são apresentadas como copy comercial. As interfaces são diagramas explicativos, sem afirmação de serem screenshots de clientes. Os cases reproduzem os números recebidos, sem nomes ou logos não fornecidos.

## Verificações

```sh
# Com a prévia local rodando:
python3 scripts/qa/copy-audit.py
```

A auditoria compara 147 trechos/labels com o HTML renderizado (a legenda da hero foi removida por solicitação expressa), verifica um único H1 e a presença de todas as dobras com conteúdo. Os testes de navegador cobriram 1920, 1440, 1280, 1024, 768, 430 e 390 px, navegação móvel, teclado no FAQ, alternância de viewport e atualização da timeline. A versão com movimento reduzido usa fluxo natural e mantém todo o conteúdo legível.


## Redesign visual — versão 2

A composição foi refeita: hero central com três interfaces conectadas, contraste entre dobras claras e roxas, títulos compactos com destaques em gradiente, tags com ícones, faixas contínuas, cases com evidências visuais e bento assimétrico. A timeline usa um painel sticky no desktop e fluxo vertical no mobile. A revisão adicional ajustou contraste, conexões dos diagramas e encaixe das palavras.

### Fotografia editorial

`public/brand/editorial-operation.webp` é uma imagem gerada com a ferramenta imagegen integrada, em modo de geração a partir de texto, para apoiar a direção de arte. Não representa cliente ou integrante identificado da empresa. Foi convertida para WebP de 960 px, carregada com lazy loading e dimensões reservadas. Logos e símbolo continuam sendo os arquivos oficiais.

Prompt utilizado:

> Use case: photorealistic-natural. Create one premium editorial corporate photograph for the Brazilian management/technology brand NoPonto. Portrait 4:5 composition. Very close cropped view of a mature Black professional wearing a dark charcoal knit turtleneck, seated in a clean modern office, holding a dark smartphone naturally with both hands near the chest. Crop face above the mouth; focus on hands and tactile knit fabric, professional quietly looking down, no smile or pointing. Architectural light gray background with precise soft side daylight. Restrained nearly monochrome palette: charcoal, off-white, extremely subtle deep violet fabric undertone. Luxury magazine campaign photography, natural skin texture, clean controlled light, thoughtful and mature. Strong authentic photographic composition, 85mm lens look, soft background, crisp hands and phone. No text, no logo, no UI, no floating cards, no data, no holograms, no glow, no decorative lighting, no generic stock-photo gestures. Image will be a supporting editorial panel beside process information, not proof of a particular client.

## Interações e alinhamento — versão 3

- Grid compartilhado de 12 colunas para os blocos editoriais, com cases agrupados em uma superfície única.
- Posicionamento em sete etapas com pin de viewport, progresso contínuo e interfaces por etapa; botões também permitem selecionar a etapa. A fixação exige desktop com altura suficiente. No celular e com movimento reduzido, a seção segue o fluxo da página.
- Cases com entrada de documentos, escrita das linhas, leitura visual, contadores, desenho de barras, reação ao ponteiro e botão acessível para repetir a animação. Os valores finais são sempre os valores oficiais.
- Menu de vidro com hover, recolhimento ao descer, reaparecimento ao subir e retenção de visibilidade para navegação por teclado. A navegação móvel inclui transições e fechamento por Escape.
- Interfaces do hero, soluções e Food com revelação sequencial dos elementos. `prefers-reduced-motion` preserva a apresentação estática e desativa a repetição de animações.


## Refinamento de interação — versão 4

- Hero com três interfaces alternando a posição principal, DRE com blur de fundo e composição específica no mobile. A alternância é suspensa fora da tela e desativada com movimento reduzido.
- Seis problemas selecionáveis por hover, teclado ou toque, cada um com seu próprio asset. No mobile os problemas ficam em uma coluna e o visual acompanha a leitura em telas com altura suficiente.
- Sete representações distintas no posicionamento e cinco novas composições no método: auditoria, matriz de responsabilidades, construção modular, validação e acompanhamento.
- Casos e interfaces repetem suas entradas ao retornar pelo scroll, sem botões de pausa ou repetição.
- Resultados com destaque único na linha mais próxima do centro e pequenas interfaces em perspectiva no hover/foco. Movimento reduzido e contraste aumentado mantêm todas as linhas legíveis.
- Repertório com seis assets próprios, trilho horizontal fixado no desktop, rolagem nativa em telas menores e brilho de borda seguindo o ponteiro.
- Revelação de alguns títulos por linhas com GSAP SplitText e faixas na paleta da marca; listas de qualificação com progresso ligado ao scroll.
- A fotografia editorial permanece no acervo do projeto; o repertório atual usa representações da operação.


## Contraste e composição — versão 5

- Cards da hero com opacidade integral e gradientes opacos, incluindo os cards laterais; a alternância continua ativa.
- Remoção autorizada de “Uma operação. Uma visão. As ferramentas certas para cada problema.” abaixo da hero. A copy de origem foi preservada para rastreabilidade; a auditoria verifica a ausência dessa frase e a presença do conteúdo restante.
- Quebra explícita entre “Diferentes setores.” e “Problemas que se repetem.”.
- Contraste próprio para cada visual dos problemas, alternando materiais claros e escuros, e uma composição editorial em duas partes para o fechamento da seção.
- Painéis do método com tratamentos diferentes para auditoria, organização, construção, implementação e acompanhamento.
