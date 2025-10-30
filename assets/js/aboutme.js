// ===========================================
// VARIÁVEIS GLOBAIS DE CONTROLE
// ===========================================
// Nota: 'idiomaBtn' e 'idiomaAtual' serão definidas dentro de DOMContentLoaded ou funções.

const VELOCIDADE_DIGITACAO = 40; // 35ms por caractere
let typewriterTimeout; // Controla a animação


// ===========================================
// FUNÇÕES DE DIGITAÇÃO DO TERMINAL
// ===========================================

/**
 * Função principal que busca o texto correto e inicia a digitação.
 */
window.updateTerminalText = function(idioma) {
    // Busca o elemento a cada chamada para garantir que seja encontrado
    const terminalElement = document.querySelector('.texto-digitado');
    if (!terminalElement) return;

    const langKey = (idioma === 'en') ? 'en' : 'pt';
    const textoParaDigitar = terminalElement.getAttribute(`data-text-${langKey}`);

    if (textoParaDigitar) {
        iniciarDigitacao(textoParaDigitar, terminalElement);
    } else {
        console.error(`[Terminal JS] Erro: Texto não encontrado para o idioma '${langKey}'.`);
    }
}

/**
 * Inicia a animação de digitação.
 * * * CORREÇÃO: Adicionando o prompt de terminal "$ " antes de iniciar a digitação.
 */
function iniciarDigitacao(texto, element) {
    if (!element) return;
    
    // Limpa a animação anterior
    if (typewriterTimeout) {
        clearTimeout(typewriterTimeout);
    }
    
    // 1. Define o prompt com a tag <strong> para negrito e a classe de terminal
    const prompt = '<strong class="prompt-text">daniel: ~$ </strong>';
    
    // Limpa o conteúdo (necessário para usar innerHTML)
    element.textContent = ''; 
    element.classList.remove('typing-done');

    // Insere o prompt usando innerHTML (para renderizar o <strong>)
    element.innerHTML = prompt; 

    let i = 0;
    
    function digitarProximoCaractere() {
        if (i < texto.length) {
            // 2. Adiciona o próximo caractere usando textContent, mantendo o HTML do prompt
            const novoConteudo = element.innerHTML + texto.charAt(i);
            element.innerHTML = novoConteudo;

            i++;
            typewriterTimeout = setTimeout(digitarProximoCaractere, VELOCIDADE_DIGITACAO);
        } else {
            element.classList.add('typing-done');
        }
    }
    
    // Inicia a digitação após um pequeno atraso
    typewriterTimeout = setTimeout(digitarProximoCaractere, 50); 
}


// ===========================================
// LÓGICA DE INICIALIZAÇÃO E LISTENERS
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Definição das variáveis APÓS o DOM carregar
    const idiomaBtn = document.getElementById("idioma-toggle");
    let idiomaAtual;

    // Define o idioma inicial: Tenta 'en' se no HTML, senão 'pt'.
    const langFromHTML = document.documentElement.lang;
    idiomaAtual = (langFromHTML && langFromHTML.startsWith('en')) ? 'en' : 'pt';
    
    // 2. Configuração do Listener de Troca de Idioma
    if (idiomaBtn) {
        // Aplica o ícone inicial correto
        idiomaBtn.textContent = idiomaAtual === "pt" ? "🇧🇷" : "🇺🇸"; 
        
        idiomaBtn.addEventListener("click", () => {
            // Lógica de Troca de Idioma (Sua lógica original + Gatilho)
            idiomaAtual = idiomaAtual === "pt" ? "en" : "pt";
            idiomaBtn.textContent = idiomaAtual === "pt" ? "🇧🇷" : "🇺🇸";
            
            // Troca textos simples e esconde/mostra elementos
            document.querySelectorAll("[data-lang-text-pt]").forEach(el => {
                el.textContent = idiomaAtual === "pt"
                    ? el.dataset.langTextPt
                    : el.dataset.langTextEn;
            });

            document.querySelectorAll("[data-lang]").forEach(el => {
                el.hidden = el.getAttribute("data-lang") !== idiomaAtual;
            });

            // GATILHO: Reinicia o terminal com o novo idioma
            window.updateTerminalText(idiomaAtual);
        });

        // 3. Aplica o Estado Inicial (Garante que o estado visual esteja certo)
        document.querySelectorAll("[data-lang-text-pt]").forEach(el => {
            el.textContent = idiomaAtual === "pt"
                ? el.dataset.langTextPt
                : el.dataset.langTextEn;
        });

        document.querySelectorAll("[data-lang]").forEach(el => {
            el.hidden = el.getAttribute("data-lang") !== idiomaAtual;
        });

    } else {
        console.warn("Elemento 'idioma-toggle' não encontrado. Troca de idioma por botão desabilitada.");
    }

    // 4. Inicia a digitação do terminal no carregamento
    window.updateTerminalText(idiomaAtual);
});