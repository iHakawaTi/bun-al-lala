document.addEventListener('DOMContentLoaded', () => {
    initHeroVideo();
    initScrollAnimations();
    initMobileMenu();
    initNavbarScroll();
});

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    // Check on load
    if (window.scrollY > 50) navbar.classList.add('scrolled');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ----------------------------------------------------------------
   1. Hero Video → Logo Reveal
   ---------------------------------------------------------------- */
function initHeroVideo() {
    const video = document.getElementById('hero-video');
    const overlay = document.getElementById('hero-overlay');
    const logo = document.getElementById('hero-logo');

    if (!video || !logo) return;

    // When video finishes playing
    video.addEventListener('ended', () => {
        // Fade out the video
        video.classList.add('fade-out');
        overlay.classList.add('fade-out');

        // After video fades, reveal the logo
        setTimeout(() => {
            logo.classList.add('visible');
        }, 600); // Start logo reveal 600ms into the video fade
    });

    // Fallback: if video fails to load, show logo immediately
    video.addEventListener('error', () => {
        video.style.display = 'none';
        overlay.style.display = 'none';
        logo.classList.add('visible');
    });
}

/* ----------------------------------------------------------------
   2. Scroll Animations
   ---------------------------------------------------------------- */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal-text, .reveal-up, .reveal-right, .reveal-left');
    elements.forEach(el => observer.observe(el));
}

/* ----------------------------------------------------------------
   3. Mobile Menu
   ---------------------------------------------------------------- */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    if (!hamburger) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}
