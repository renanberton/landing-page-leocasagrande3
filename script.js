// ===== CONTADORES ANIMADOS =====
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetNumber = parseInt(target.getAttribute('data-target'));
                let current = 0;
                const increment = targetNumber / 50; // Divide em 50 passos
                const duration = 2000; // 2 segundos
                const stepTime = duration / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= targetNumber) {
                        target.textContent = targetNumber + (targetNumber === 3500 ? '+' : '');
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current) + (targetNumber === 3500 ? '+' : '');
                    }
                }, stepTime);
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        observer.observe(stat);
    });
}

// ===== FAQ ACCORDION =====
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fecha todos os outros
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Se não estava ativo, abre
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ===== COUNTDOWN TIMER =====
function initCountdown() {
    // Define 2 horas a partir de agora
    const countDownDate = new Date();
    countDownDate.setHours(countDownDate.getHours() + 2);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(x);
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }
    
    updateCountdown();
    const x = setInterval(updateCountdown, 1000);
}

// ===== SCROLL SUAVE PARA ÂNCORAS =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== EFEITO DE GLITCH NO HOVER =====
function initGlitchEffect() {
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        glitchText.addEventListener('mouseenter', () => {
            glitchText.style.animation = 'none';
            setTimeout(() => {
                glitchText.style.animation = 'glitch 500ms infinite';
            }, 10);
        });
    }
}

// ===== PARALLAX EFFECT NOS FUNDOS =====
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });
}

// ===== VALIDAÇÃO DE FORMULÁRIO (se houver) =====
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Aqui você pode adicionar a lógica de envio do formulário
            alert('Formulário enviado com sucesso! (Demonstração)');
        });
    });
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    animateNumbers();
    initFAQ();
    initCountdown();
    initSmoothScroll();
    initGlitchEffect();
    initParallax();
    initFormValidation();
    
    // Log para confirmar carregamento
    console.log('Landing Page DJ Profissional carregada com sucesso!');
});

// ===== OBSERVER PARA ANIMAÇÕES DE ENTRADA =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.module-card, .testimonial-card, .pain-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});