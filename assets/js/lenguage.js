const idiomaBtn = document.getElementById("idioma-toggle");
let idiomaAtual = "pt";

idiomaBtn.addEventListener("click", () => {
  idiomaAtual = idiomaAtual === "pt" ? "en" : "pt";
  idiomaBtn.textContent = idiomaAtual === "pt" ? "🇧🇷" : "🇺🇸";

  // Atualiza todos os textos com base nos atributos personalizados
  document.querySelectorAll("[data-lang-text-pt]").forEach(el => {
    el.textContent = idiomaAtual === "pt"
      ? el.dataset.langTextPt
      : el.dataset.langTextEn;
  });

  // Alterna visibilidade de blocos com data-lang
  document.querySelectorAll("[data-lang]").forEach(el => {
    el.hidden = el.getAttribute("data-lang") !== idiomaAtual;
  });
});
