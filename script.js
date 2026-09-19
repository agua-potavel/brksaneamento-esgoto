// ===== MENU MOBILE =====
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const icon = menuToggle.querySelector('i');
    if (nav.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        backToTop.classList.add('visible');
    } else {
        header.classList.remove('scrolled');
        backToTop.classList.remove('visible');
    }
});

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== NAV LINK ATIVO =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== ANIMAÇÃO DE ENTRADA (SCROLL REVEAL) =====
const revealElements = document.querySelectorAll(
    '.diferencial-card, .servico-card, .atendimento-card, .info-card, .stat, .parceiro-card, .contato-item, .cycle-step'
);

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    revealElements.forEach(el => {
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - revealPoint) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
};

// Inicializar estado
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== FORMULÁRIO CONTATO -> WHATSAPP =====
const contatoForm = document.getElementById('contatoForm');

contatoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const email = document.getElementById('email').value.trim();
    const servico = document.getElementById('servico').value;
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!nome || !telefone || !servico) {
        alert('Por favor, preencha os campos obrigatórios: Nome, Telefone e Serviço.');
        return;
    }

    let texto = `*Solicitação de Orçamento - Prado Desentupidora*%0A%0A`;
    texto += `*Nome:* ${nome}%0A`;
    texto += `*Telefone:* ${telefone}%0A`;
    if (email) texto += `*E-mail:* ${email}%0A`;
    texto += `*Serviço:* ${servico}%0A`;
    if (mensagem) texto += `*Mensagem:* ${mensagem}`;

    const numero = '5511964026349';
    const url = `https://wa.me/${numero}?text=${texto}`;

    window.open(url, '_blank');

    contatoForm.reset();
});

// ===== MÁSCARA TELEFONE =====
const telefoneInput = document.getElementById('telefone');

telefoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 10) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (value.length > 6) {
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    } else if (value.length > 0) {
        value = value.replace(/^(\d{0,2})$/, '($1');
    }

    e.target.value = value;
});

// ===== SCROLL SUAVE PARA LINKS INTERNOS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 85;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ANIMAÇÃO DE CONTADORES (STATS) =====
const stats = document.querySelectorAll('.stat h4');
let countersAnimated = false;

const animateCounters = () => {
    if (countersAnimated) return;

    const statsSection = document.querySelector('.sobre-stats');
    if (!statsSection) return;

    const sectionTop = statsSection.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 100) {
        countersAnimated = true;
        stats.forEach(stat => {
            const text = stat.textContent;
            const target = parseInt(text.replace(/\D/g, ''));
            const prefix = text.startsWith('+') ? '+' : '';
            const suffix = text.includes('h') ? 'h' : '';

            if (isNaN(target)) return;

            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = prefix + target + suffix;
                    clearInterval(timer);
                } else {
                    stat.textContent = prefix + Math.floor(current) + suffix;
                }
            }, 25);
        });
    }
};

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// ===== CONSOLE INFO =====
console.log('%c Prado Desentupidora e Limpa Fossa ', 'background: #0077b6; color: #fff; font-size: 16px; font-weight: bold; padding: 8px; border-radius: 4px;');
console.log('%c Site desenvolvido com qualidade e transparência! ', 'color: #ff8c00; font-size: 12px;');
