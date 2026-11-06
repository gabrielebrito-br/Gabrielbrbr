// Tema claro/escuro (lembra a escolha)
const raiz = document.documentElement;
const btnTema = document.getElementById('tema');
let salvo = null;
try { salvo = localStorage.getItem('tema'); } catch (e) {}
const escuroPadrao = window.matchMedia('(prefers-color-scheme: dark)').matches;
aplicarTema(salvo || (escuroPadrao ? 'escuro' : 'claro'));

function aplicarTema(t) {
    raiz.dataset.tema = t;
    btnTema.textContent = t === 'escuro' ? '☀️ Tema' : '🌙 Tema';
    try { localStorage.setItem('tema', t); } catch (e) {}
}
btnTema.addEventListener('click', () => aplicarTema(raiz.dataset.tema === 'escuro' ? 'claro' : 'escuro'));

// Salvar como PDF
document.getElementById('imprimir').addEventListener('click', () => window.print());

// Copiar e-mail
const btnCopiar = document.getElementById('copiar');
btnCopiar.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(btnCopiar.dataset.email);
        btnCopiar.textContent = 'Copiado!';
    } catch (e) {
        btnCopiar.textContent = 'Erro ao copiar';
    }
    setTimeout(() => (btnCopiar.textContent = 'Copiar'), 1800);
});

// Digitação do subtítulo
const alvo = document.getElementById('digitando');
const texto = alvo.dataset.texto;
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    alvo.textContent = texto;
} else {
    let i = 0;
    const digitar = () => {
        alvo.textContent = texto.slice(0, ++i);
        if (i < texto.length) setTimeout(digitar, 55);
    };
    setTimeout(digitar, 500);
}

// Filtro por tecnologia: destaca as competências ligadas às tags ativas
const tags = document.querySelectorAll('.tag');
const lista = document.querySelector('.competencias');
const itens = lista.querySelectorAll('li');
tags.forEach(tag => tag.addEventListener('click', () => {
    tag.classList.toggle('ativa');
    const ativas = [...document.querySelectorAll('.tag.ativa')].map(t => t.dataset.tech);
    lista.classList.toggle('filtrando', ativas.length > 0);
    itens.forEach(li => {
        const techs = li.dataset.techs.split(' ');
        li.classList.toggle('casou', ativas.some(a => techs.includes(a)));
    });
}));

// Brilho que segue o mouse no fundo
window.addEventListener('pointermove', e => {
    raiz.style.setProperty('--mx', e.clientX + 'px');
    raiz.style.setProperty('--my', e.clientY + 'px');
});
