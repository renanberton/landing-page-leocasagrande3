// ===== CONTADORES ANIMADOS =====
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetNumber = parseInt(target.getAttribute('data-target'));
                let current = 0;
                const increment = targetNumber / 50;
                const stepTime = 3500 / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= targetNumber) {
                        target.textContent = targetNumber;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current);
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

// ===== CARROSSEL HORIZONTAL =====
function initCarousel() {
    const track = document.getElementById('modulesTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    const cards = document.querySelectorAll('.module-card');
    const cardsPerView = getCardsPerView();
    const totalCards = cards.length;
    const totalSlides = Math.ceil(totalCards / cardsPerView);
    let currentIndex = 0;
    
    // Criar dots
    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    // Atualizar dots
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Função para calcular cards por view
    function getCardsPerView() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }
    
    // Função para atualizar o scroll
    function updateCarousel() {
        const cardsPerView = getCardsPerView();
        const cardWidth = cards[0]?.offsetWidth || 320;
        const gap = 25;
        const scrollAmount = currentIndex * (cardWidth + gap) * cardsPerView;
        
        track.style.transform = `translateX(-${scrollAmount}px)`;
        updateDots();
        
        // Atualizar estado dos botões
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalSlides - 1;
        
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex >= totalSlides - 1 ? '0.5' : '1';
        prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
        nextBtn.style.cursor = currentIndex >= totalSlides - 1 ? 'not-allowed' : 'pointer';
    }
    
    // Ir para slide específico
    function goToSlide(index) {
        if (index < 0) index = 0;
        if (index >= totalSlides) index = totalSlides - 1;
        currentIndex = index;
        updateCarousel();
    }
    
    // Próximo slide
    function nextSlide() {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateCarousel();
        }
    }
    
    // Slide anterior
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Atualizar ao redimensionar a tela
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newCardsPerView = getCardsPerView();
            const oldCardsPerView = cardsPerView;
            if (newCardsPerView !== oldCardsPerView) {
                currentIndex = 0;
                updateCarousel();
                // Recriar dots
                const newTotalSlides = Math.ceil(totalCards / newCardsPerView);
                if (newTotalSlides !== totalSlides) {
                    createDots();
                }
            }
        }, 250);
    });
    
    // Inicializar
    createDots();
    updateCarousel();
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

// ===== ANIMAÇÃO DE ENTRADA =====
function initScrollAnimations() {
    const elements = document.querySelectorAll('.learn-item, .bonus-card, .testimonial-card, .module-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== EFEITO PARALLAX =====
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.3 + 'px';
        }
    });
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    animateNumbers();
    initCarousel();
    initSmoothScroll();
    initScrollAnimations();
    initParallax();
    
    console.log('Landing Page DJ Avançado - Leo Casagrande carregada com sucesso!');
});