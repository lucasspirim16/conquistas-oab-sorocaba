/* OAB Sorocaba | Dois anos de gestão
   Tudo aqui é opcional: sem JavaScript o site continua completo. */
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  var semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var temObserver = "IntersectionObserver" in window;

  /* ---------- Filtro de conquistas por ano ---------- */
  var botoes = document.querySelectorAll(".filtro__botao");
  var cards = document.querySelectorAll(".conquistas .card");
  var eixos = document.querySelectorAll(".conquistas .eixo");
  var status = document.querySelector(".filtro__status");

  function filtrar(ano) {
    var visiveis = 0;
    cards.forEach(function (card) {
      var mostra = ano === "todos" || card.getAttribute("data-ano") === ano;
      card.hidden = !mostra;
      if (mostra) visiveis++;
    });
    eixos.forEach(function (eixo) {
      eixo.hidden = !eixo.querySelector(".card:not([hidden])");
    });
    botoes.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-filtro") === ano));
    });
    if (status) {
      status.textContent = ano === "todos" ? "" :
        "Mostrando " + visiveis + " conquistas do " + (ano === "ano1" ? "ano 1" : "ano 2") + ".";
    }
    document.querySelectorAll(".eixos-atalhos a").forEach(function (a) {
      var alvo = document.querySelector(a.getAttribute("href"));
      a.hidden = !!(alvo && alvo.hidden);
    });
  }
  botoes.forEach(function (b) {
    b.addEventListener("click", function () { filtrar(b.getAttribute("data-filtro")); });
  });

  /* ---------- Menu: destaca a seção visível ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".menu a"));
  var secoes = links.map(function (a) { return document.querySelector(a.getAttribute("href")); });

  function marcarAtivo() {
    var meio = window.innerHeight * 0.35;
    var ativo = -1;
    secoes.forEach(function (s, i) {
      if (s && s.getBoundingClientRect().top <= meio) ativo = i;
    });
    links.forEach(function (a, i) {
      if (i === ativo) {
        if (a.getAttribute("aria-current") !== "true") {
          a.setAttribute("aria-current", "true");
          // mantém o item ativo visível no menu do celular
          var ul = a.closest("ul");
          if (ul && ul.scrollWidth > ul.clientWidth) {
            ul.scrollTo({ left: a.parentNode.offsetLeft - 8, behavior: semMovimento ? "auto" : "smooth" });
          }
        }
      } else {
        a.removeAttribute("aria-current");
      }
    });
  }
  var agendado = false;
  window.addEventListener("scroll", function () {
    if (agendado) return;
    agendado = true;
    window.requestAnimationFrame(function () { marcarAtivo(); agendado = false; });
  }, { passive: true });
  marcarAtivo();

  /* ---------- Contagem dos números ---------- */
  function contar(el) {
    var fim = parseInt(el.getAttribute("data-contar"), 10);
    if (isNaN(fim) || semMovimento) return;
    var duracao = 1200, inicio = null;
    function passo(t) {
      if (!inicio) inicio = t;
      var p = Math.min((t - inicio) / duracao, 1);
      el.textContent = Math.round(fim * (1 - Math.pow(1 - p, 3))).toLocaleString("pt-BR");
      if (p < 1) window.requestAnimationFrame(passo);
    }
    window.requestAnimationFrame(passo);
  }

  /* ---------- Entrada suave dos blocos ---------- */
  var animaveis = document.querySelectorAll(".numero, .card, .tempo__lista li, .diretoria__lista li, .presidente__texto");
  if (temObserver && !semMovimento) {
    animaveis.forEach(function (el) { el.classList.add("revelar"); });
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("visivel");
        e.target.querySelectorAll("[data-contar]").forEach(contar);
        if (e.target.hasAttribute("data-contar")) contar(e.target);
        obs.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    animaveis.forEach(function (el) { obs.observe(el); });
  }

  /* ---------- Compartilhar ---------- */
  var botaoCompartilhar = document.getElementById("compartilhar");
  if (botaoCompartilhar) {
    botaoCompartilhar.addEventListener("click", function () {
      var dados = { title: document.title, text: "Dois anos de gestão da OAB Sorocaba. Confira as conquistas:", url: location.href.split("#")[0] };
      if (navigator.share) {
        navigator.share(dados).catch(function () {});
      } else {
        window.open("https://wa.me/?text=" + encodeURIComponent(dados.text + " " + dados.url), "_blank", "noopener");
      }
    });
  }
})();
