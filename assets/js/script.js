/* ================================================
   MUNDIAL FORRAÇÕES T.A - Modern JavaScript
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initYear();
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initCounters();
    initAvaliacoesSlider();
    initPortfolioLightbox();
    initLeafletMap();
    initActiveNavOnScroll();
});

/* ---------- Year ---------- */
function initYear() {
    const el = document.getElementById('current-year');
    if (el) el.textContent = new Date().getFullYear();
}

/* ---------- Navbar Scroll Effect ---------- */
function initNavbar() {
    const header = document.getElementById('header');
    if (!header) return;

    const onScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial check
}

/* ---------- Mobile Menu ---------- */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (menu.classList.contains('active') && !menu.contains(e.target) && !toggle.contains(e.target)) {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ---------- Scroll Animations ---------- */
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-animate]');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Add slight stagger delay to children
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/* ---------- Counter Animation ---------- */
function initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    if (!counters.length) return;

    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const start = performance.now();

        const update = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        };

        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

/* ---------- Active Nav Link on Scroll ---------- */
function initActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;

    const onScroll = () => {
        const scrollY = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- Smooth Scroll ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ---------- Slider de Avaliações ---------- */
function initAvaliacoesSlider() {
    const track = document.querySelector('.avaliacoes-track');
    const wrapper = document.querySelector('.avaliacoes-track-wrapper');
    const cards = document.querySelectorAll('.avaliacao-card');
    const prevBtn = document.querySelector('.slider-btn-prev');
    const nextBtn = document.querySelector('.slider-btn-next');
    const dotsContainer = document.querySelector('.slider-dots');

    if (!track || !wrapper || !cards.length || !prevBtn || !nextBtn || !dotsContainer) return;

    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    let maxIndex = Math.max(0, cards.length - cardsPerView);
    let autoPlayInterval = null;
    const GAP = 24;

    function getCardsPerView() {
        const width = window.innerWidth;
        if (width <= 768) return 1;
        if (width <= 1024) return 2;
        return 3;
    }

    function updateCardSizes() {
        const wrapperWidth = wrapper.offsetWidth;
        const totalGaps = GAP * (cardsPerView - 1);
        const cardWidth = (wrapperWidth - totalGaps) / cardsPerView;
        cards.forEach(card => {
            card.style.width = cardWidth + 'px';
            card.style.minWidth = cardWidth + 'px';
        });
    }

    function getCardWidth() {
        const card = cards[0];
        return card.offsetWidth + GAP;
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        const totalDots = maxIndex + 1;
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            dot.setAttribute('aria-label', `Ir para avaliação ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }

    function updateButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        const offset = currentIndex * getCardWidth();
        track.style.transform = `translateX(-${offset}px)`;
        updateDots();
        updateButtons();
    }

    function nextSlide() {
        if (currentIndex < maxIndex) {
            goToSlide(currentIndex + 1);
        } else {
            goToSlide(0); // Loop back
        }
    }

    function prevSlide() {
        if (currentIndex > 0) goToSlide(currentIndex - 1);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });
    nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });

    // Touch/Swipe support
    let startX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide(); else prevSlide();
            resetAutoPlay();
        }
        isDragging = false;
    }, { passive: true });

    // Resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            cardsPerView = getCardsPerView();
            maxIndex = Math.max(0, cards.length - cardsPerView);
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            updateCardSizes();
            createDots();
            goToSlide(currentIndex);
        }, 200);
    });

    // Initialize
    updateCardSizes();
    createDots();
    updateButtons();
    goToSlide(0);
    startAutoPlay();

    // Pause on hover
    const sliderWrapper = document.querySelector('.avaliacoes-slider');
    if (sliderWrapper) {
        sliderWrapper.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        sliderWrapper.addEventListener('mouseleave', startAutoPlay);
    }
}

/* ---------- Portfolio Lightbox ---------- */
function initPortfolioLightbox() {
    const items = document.querySelectorAll('.portfolio-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (!lightbox) return;

    const openLightbox = (imgSrc, imgAlt, caption) => {
        lightboxImg.src = imgSrc;
        lightboxImg.alt = imgAlt;
        if (lightboxCaption) lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    items.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h3')?.textContent || '';
            const desc = item.querySelector('.portfolio-info p')?.textContent || '';
            if (img) openLightbox(img.src, img.alt, `${title} - ${desc}`);
        });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });
}

/* ---------- Leaflet Map ---------- */
function initLeafletMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement || typeof L === 'undefined') return;

    const lat = -23.4108491;
    const lng = -51.9730877;

    const map = L.map('map', {
        scrollWheelZoom: false
    }).setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const orangeIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
            background: linear-gradient(135deg, #FF6B35, #ff8c5a);
            width: 28px; height: 28px;
            border-radius: 50%;
            border: 3px solid #fff;
            box-shadow: 0 2px 10px rgba(255,107,53,0.5);
        "></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -16]
    });

    const marker = L.marker([lat, lng], { icon: orangeIcon }).addTo(map);

    marker.bindPopup(`
        <div style="padding: 12px; max-width: 260px; font-family: 'Inter', sans-serif;">
            <h3 style="margin: 0 0 8px 0; color: #FF6B35; font-size: 15px; font-weight: 700;">
                Mundial Forrações T.A
            </h3>
            <p style="margin: 0 0 8px 0; color: #4a4a5a; font-size: 12px; line-height: 1.6;">
                ✅ +5 anos de experiência<br>
                ✅ +40 modelos de caminhão<br>
                ✅ 1 ano de garantia
            </p>
            <p style="margin: 0 0 8px 0; color: #333; font-size: 12px;">
                <strong>Endereço:</strong><br>
                Av. Naihma Name, 1121<br>
                Maringá - PR
            </p>
            <a href="https://wa.me/5544998575804" target="_blank"
               style="color: #25D366; text-decoration: none; font-weight: 600; font-size: 13px; display: inline-flex; align-items: center; gap: 4px;">
                📱 (55) 44 99857-5804
            </a>
        </div>
    `).openPopup();
}
