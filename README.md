# My Portfolio

A modern, animated single‑page portfolio built with semantic HTML, modular CSS, and ES‑module JavaScript. Sections are split into partial HTML files and injected at runtime for maintainability.

## Features
- Clean, responsive design (mobile‑first)
- Smooth scroll, scroll‑trigger animations, and staggered project reveals
- Modular CSS (base, layout, components, pages)
- Modular JS (utils, components, main)
- HTML partials for sections to keep markup small and reusable
- Floating WhatsApp contact widget

## Project Structure
```
.
├─ index.html                 # Main page; loads CSS & JS, includes partials
├─ assets/
│  └─ images/                 # All images and screenshots
├─ partials/                  # HTML section partials (loaded at runtime)
│  ├─ navbar.html
│  ├─ hero.html
│  ├─ about.html
│  ├─ experience.html
│  ├─ skills.html
│  ├─ projects.html           
│  ├─ contact.html
│  └─ footer.html
├─ css/
│  ├─ base.css                # Resets, variables, typography, global colors
│  ├─ layout.css              # Layout grids, containers, hero, responsive
│  ├─ components.css          # Buttons, cards, skills, projects, widget, contact, animations
│  ├─ pages.css               # Per‑section text tweaks
│  └─ style.css               # Aggregator; imports base → layout → components → pages
└─ js/
   ├─ utils.js                # DOM helpers + HTML partial loader (includePartials)
   ├─ components.js           # Interactive components (nav, scroll, view more, animations)
   └─ main.js                 # Entry point; loads partials then initializes components
```

## Getting Started
No build step required. Serve the folder with a static web server to allow loading HTML partials.

### Quick run (choose one)
- Node (npx):
  ```bash
  npx serve .
  ```
- Python 3:
  ```bash
  python -m http.server 5500
  ```
- VS Code: Use the “Live Server” extension and click “Go Live”.

Open the printed URL in your browser (e.g., `http://localhost:5500/`).

> Note: Opening `index.html` directly via `file://` may block fetching `partials/` in some browsers. The Projects section is inlined for reliability, but other partials still require a local server.

## How things work
- CSS: `css/style.css` imports the rest. Adjust variables (colors, spacing) in `css/base.css`.
- Partials: Elements like
  ```html
  <div data-include="partials/about.html"></div>
  ```
  are replaced at runtime by `includePartials()` from `js/utils.js`.
- Animations: Elements with `.scroll-animate` or `.stagger-item` get `animate-in` via an `IntersectionObserver` in `js/components.js`.
- Projects: Only 4 projects are visible by default. Extra items use `.hidden-project` and are revealed with the “View More Projects” button (`#viewMoreBtn`).

## Customization
- Add a skill: Edit `partials/skills.html` and append a new `.skill-item` with an icon and label.
- Add a project: In `index.html` → `#projects .projects-grid`, add a new `.project-card.stagger-item`. To hide initially, also add `.hidden-project`.
- Change visible projects count: Keep only the first N cards without `.hidden-project`.
- WhatsApp widget: Link is in `index.html` inside `#floatingWidget`.

## Troubleshooting
- “Partials not loading”: Make sure you’re serving over `http://` (see Quick run). Browser console will show CORS/fetch errors when using `file://`.
- “Hidden projects don’t animate like others”: Ensure each hidden card has classes `project-card hidden-project stagger-item`. The “View More” handler triggers the same `animate-in` transition.

## License
This repository is provided without a specific license. If you plan to open‑source it, consider adding an MIT license.
