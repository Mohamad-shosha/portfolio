// Utils: generic helpers

export function throttle(fn, wait = 100) {
    let last = 0;
    return (...args) => {
        const now = Date.now();
        if (now - last >= wait) {
            last = now;
            fn.apply(null, args);
        }
    };
}

export function qs(selector, scope = document) {
    return scope.querySelector(selector);
}

export function qsa(selector, scope = document) {
    return Array.from(scope.querySelectorAll(selector));
}

// Load HTML partials into elements with data-include attribute
export async function includePartials() {
    const includeEls = qsa('[data-include]');
    await Promise.all(includeEls.map(async (el) => {
        const path = el.getAttribute('data-include');
        try {
            const res = await fetch(path);
            const html = await res.text();
            el.innerHTML = html;
        } catch (e) {
            console.error('Failed to include partial:', path, e);
        }
    }));
}
