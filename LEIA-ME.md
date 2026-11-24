# Site "Dois anos de gestão" | OAB Sorocaba

Site de uma página só, feito em HTML, CSS e JavaScript puros. Não precisa instalar nada nem "compilar": o que está nesta pasta é exatamente o que vai para o ar.

## O que tem em cada pasta

| Arquivo ou pasta | Para que serve |
|---|---|
| `index.html` | Todo o texto do site. É aqui que você vai mexer quase sempre. |
| `css/estilo.css` | Cores, fontes e aparência. As cores ficam logo no começo, em `:root`. |
| `js/script.js` | Filtro "Ano 1 / Ano 2", contagem dos números, menu e botão de compartilhar. |
| `img/fotos/` | Fotos em WebP, cada uma em até 3 tamanhos (`-480`, `-960`, `-1600`). |
| `img/logo-oab-sorocaba-branco.svg` | Logo branco extraído do PDF oficial, fundo transparente. |
| `img/compartilhar-1200x630.jpg` | Imagem que aparece quando o link é enviado no WhatsApp e redes. |
| `fonts/` | Lora e Montserrat, hospedadas no próprio site. |
| `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png` | Ícones da aba e da tela inicial do celular. |

## Como editar um texto

1. Abra o `index.html` no **Bloco de Notas** (botão direito > Abrir com > Bloco de Notas) ou, melhor, no **VS Code** (gratuito).
2. Aperte **Ctrl + F** e procure um pedaço do texto que você quer trocar.
3. Troque **só o texto** entre as etiquetas. Exemplo: em `<h4>Nova Sala da Advocacia Trabalhista</h4>`, mude apenas o que está entre `<h4>` e `</h4>`.
4. Salve (Ctrl + S) e abra o `index.html` com dois cliques para ver no navegador.

Dica: não use travessão nos textos. Prefira vírgula, dois-pontos ou ponto.

## Como resolver os [A CONFIRMAR]

Procure (Ctrl + F) por `A CONFIRMAR`. Cada um aparece assim:

```html
<span class="confirmar">[A CONFIRMAR]</span>
```

Apague a linha inteira do `<span ...>` até `</span>` e escreva a informação no lugar. Exemplo, nos números do ano 2:

```html
<li class="numero"><strong><span class="confirmar">[A CONFIRMAR]</span></strong><span>eventos na Casa da Advocacia</span></li>
```

vira

```html
<li class="numero"><strong data-contar="140">140</strong><span>eventos na Casa da Advocacia</span></li>
```

O `data-contar="140"` faz o número "subir" com animação. Use só para números inteiros e repita o mesmo valor nos dois lugares.

Na **linha do tempo**, para colocar a data de um marco do ano 1, acrescente um parágrafo de data antes do texto:

```html
<li><p class="tempo__data">Março</p><p>Posse da diretoria da gestão 2025-2027</p></li>
```

Quando todas as datas do ano 1 estiverem preenchidas, apague a linha `Datas de cada marco: [A CONFIRMAR]`.

## Como adicionar uma nova conquista do ano 2

1. No `index.html`, procure `MODELO DE CARD`. Copie o bloco que começa em `<article` e termina em `</article>`.
2. Procure o eixo onde ela entra (por exemplo `EIXO: ESTRUTURA`) e cole o bloco logo acima da linha `Espaço para novas conquistas do ano 2 neste eixo`.
3. Troque o título (`<h4>`) e o texto (`<p>`).
4. O ícone é a parte `#i-estrutura`. Opções: `i-estrutura`, `i-prerrogativas`, `i-institucional`, `i-capacitacao`, `i-jovem`, `i-convivencia`, `i-sol`, `i-wifi`, `i-cafe`, `i-porta`, `i-alerta`, `i-balanca`, `i-livro`, `i-video`, `i-tela`, `i-maos`, `i-escudo-x`, `i-luta`.
5. Se for uma conquista com data, inclua também um item na **linha do tempo** de 2026.

O filtro "Ano 1 / Ano 2" funciona sozinho: ele lê o `data-ano="ano2"` de cada card.

## Como trocar ou incluir uma foto

1. Escolha uma foto com boa resolução (de preferência com 1600 px de largura ou mais).
2. Entre em **https://squoosh.app** (gratuito, funciona no navegador, a foto não sai do seu computador).
3. Arraste a foto. Do lado direito, em **Resize**, coloque a largura **480** e, em **Compress**, escolha **WebP** com qualidade **72**. Baixe.
4. Repita com largura **960** e **1600** (se a foto original for menor que isso, faça só os tamanhos possíveis).
5. Dê nomes no padrão `nome-da-foto-480.webp`, `nome-da-foto-960.webp`, `nome-da-foto-1600.webp`, sem acentos nem espaços, e coloque em `img/fotos/`.
6. No card, troque o bloco `<figure class="card__foto">...</figure>` copiando um que já exista e mudando os nomes. Para virar card com foto, troque o bloco `<div class="card__icone">...</div>` pela `<figure>`.
7. **Sempre** escreva o `alt="..."`: uma frase descrevendo o que aparece na foto. Ele é lido por quem usa leitor de tela.
8. Atualize `width` e `height` com as medidas da versão 480 (o Squoosh mostra).

## Depois de publicar: endereço nas meta tags

No começo do `index.html` existem duas linhas com `ENDERECO-DO-SITE`. Troque pelo endereço real, por exemplo:

```html
<meta property="og:url" content="https://conquistas.oabsorocaba.org.br/">
<meta property="og:image" content="https://conquistas.oabsorocaba.org.br/img/compartilhar-1200x630.jpg">
```

Sem isso, a foto de prévia pode não aparecer no WhatsApp. O WhatsApp guarda a prévia por um tempo: se você mandou o link antes de corrigir, teste com `?v=2` no final do endereço.

## Como mandar as mudanças para o ar

O jeito mais simples, sem instalar nada:

1. Entre em github.com, abra o repositório do site e clique no arquivo `index.html`.
2. Clique no lápis (**Edit this file**), faça a alteração e clique em **Commit changes**.
3. Em cerca de 1 minuto a Vercel publica a nova versão sozinha.

Para enviar fotos novas pelo site do GitHub: entre na pasta `img/fotos`, clique em **Add file > Upload files**, arraste os arquivos e clique em **Commit changes**.
