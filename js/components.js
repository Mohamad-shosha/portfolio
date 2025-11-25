// Components: interactive pieces tied to the DOM

import { qs, qsa } from './utils.js';

export function initMobileNav() {
    const hamburger = qs('.hamburger');
    const navMenu = qs('.nav-menu');
    if (!hamburger || !navMenu) return;
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    qsa('.nav-link').forEach(link => link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

export function initSmoothScroll() {
    qsa('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

export function initActiveNavOnScroll() {
    function updateActiveNavLink() {
        const sections = qsa('section[id]');
        const navLinks = qsa('.nav-link');
        const scrollPosition = window.pageYOffset + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = qs(`.nav-link[href="#${id}"]`);
            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(l => l.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
        if (scrollPosition < 100) {
            navLinks.forEach(l => l.classList.remove('active'));
            const homeLink = qs('.nav-link[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();
}

export function initScrollEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const navbar = qs('.navbar');
        const scrollIndicator = qs('.scroll-indicator');
        if (navbar) navbar.classList.toggle('scrolled', scrolled > 100);
        if (scrollIndicator) scrollIndicator.classList.toggle('hidden', scrolled > 50);
    });
}

export function initViewMoreProjects() {
    const btn = qs('#viewMoreBtn');
    const hiddenProjects = qsa('.hidden-project');
    if (!btn || hiddenProjects.length === 0) return;
    let shown = false;
    btn.addEventListener('click', () => {
        if (!shown) {
            hiddenProjects.forEach((project, index) => {
                // ensure stagger animation like other cards
                setTimeout(() => {
                    project.classList.add('show');
                    // trigger existing IntersectionObserver animation
                    project.classList.remove('has-animated');
                    setTimeout(() => project.classList.add('animate-in'), 50);
                }, index * 200);
            });
            btn.innerHTML = '<i class="fas fa-eye-slash"></i> Show Less';
            shown = true;
        } else {
            hiddenProjects.forEach(project => project.classList.remove('show'));
            btn.innerHTML = '<i class="fas fa-eye"></i> View More Projects';
            shown = false;
        }
    });
}

export function initViewMoreExperience() {
    const btn = qs('#viewMoreExperienceBtn');
    const hiddenExp = qsa('.hidden-experience');
    if (!btn || hiddenExp.length === 0) return;

    let shown = false;
    btn.addEventListener('click', () => {
        if (!shown) {
            hiddenExp.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('show');
                    card.classList.remove('has-animated');
                    setTimeout(() => card.classList.add('animate-in'), 50);
                }, index * 200); // تأثير stagger زي باقي الكروت
            });
            btn.innerHTML = '<i class="fas fa-eye-slash"></i> Show Less';
            shown = true;
        } else {
            hiddenExp.forEach(card => card.classList.remove('show'));
            btn.innerHTML = '<i class="fas fa-eye"></i> View More Experience';
            shown = false;
        }
    });
}


export function initIntersectionAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('has-animated')) {
                entry.target.classList.add('has-animated');
                setTimeout(() => entry.target.classList.add('animate-in'), 100);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -80px 0px' });
    qsa('.scroll-animate, .stagger-item').forEach(el => observer.observe(el));
}

export function initFloatingWidgetVisibility() {
    const widget = qs('#floatingWidget');
    const makeVisible = () => {
        if (!widget) return;
        widget.style.opacity = '1';
        widget.style.transform = 'translateY(0) scale(1)';
        widget.style.display = 'block';
        widget.style.visibility = 'visible';
    };
    document.addEventListener('DOMContentLoaded', makeVisible);
    window.addEventListener('load', makeVisible);
    setTimeout(makeVisible, 2000);
}
