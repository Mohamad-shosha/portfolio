import { initMobileNav, initSmoothScroll, initActiveNavOnScroll, initScrollEffects, initViewMoreProjects, initIntersectionAnimations, initFloatingWidgetVisibility, initViewMoreExperience  } from './components.js';
import { includePartials } from './utils.js';

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', async () => {
    // Load partials first, then init behavior
    await includePartials();
    initMobileNav();
    initSmoothScroll();
    initActiveNavOnScroll();
    initScrollEffects();
    initViewMoreProjects();
    initIntersectionAnimations();
    initFloatingWidgetVisibility();
    initViewMoreExperience();
});
