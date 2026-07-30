# Antonio Agrusti SRLS - Web Showcase Project Guidelines

Welcome to the **Antonio Agrusti SRLS** showcase website codebase. This document outlines the architectural decisions, coding patterns, and conventions governing this project.

## Project Stack & Deployment
- **Framework:** Angular (v22+), Single-Page Application with **Standalone Components** and modern Lazy Loading.
- **Styling:** Vanilla SCSS utilizing CSS Variables, CSS Grid, and Flexbox for a "Modern Premium" aesthetic.
- **Deployment:** Preconfigured for **Netlify** with fallback routing via `netlify.toml` and integrated **Netlify Forms**.
- **Assets Management:** All static assets (images, icons) are structured under `public/assets/` in their respective directories:
  - `public/assets/images/` — for showcase photos, projects, and structural graphics.
  - `public/assets/icons/` — for custom brand icons and SVG assets.

---

## 🏢 Company Profile & Showcase Structure
Founded in 2014, **Antonio Agrusti SRLS** is an excellence-driven building renovation and flooring company managed directly by Antonio Agrusti. The showcase website is divided into the following strategic sections:

1. **Home Page (`/`)**: High-impact Hero section with a modern structural theme, service teasers, historical teaser, and direct call-to-actions.
2. **Chi Siamo (`/chi-siamo`)**: Deep dive into the company history, its founding mission of turnkey building renovations, and the co-operation and co-hesion of local specialty teams (carpentry, electrical, custom furniture).
3. **Servizi (`/servizi`)**: Exhaustive page detailing our four main expert areas with premium interactive grid systems and custom visual patterns:
   - **Posa di Pavimenti**: Stone, wood/parquet, and interlocking autobloccanti.
   - **Ristrutturazioni Chiavi in Mano**: Direct management from demolition to final finishes and delivery.
   - **Lastrico Solare & Coperture**: Specialized treatments, professional waterproofing, and thermal insulation.
   - **Mobili su Misura & Finiture**: Collaboration with local carpentry and systems teams.
4. **Contatti (`/contatti`)**: Integrated communication page featuring a functional form (Netlify Forms compatible), registered office address (Noci, Bari), telephone, professional email, business hours, and an elegant visual map pointer.

---

## 🛠️ Key Architectural Decisions

### 1. Signal-Based Internationalization (i18n)
Instead of bulky external libraries, the application uses a custom lightweight `TranslationService` built on top of Angular Signals.
- The active language is stored as a reactive `WritableSignal<'it' | 'en'>`.
- Translations are managed as static dictionary constants in `src/app/services/translation.service.ts`.
- Dynamic key fetching in templates is facilitated by the custom `TranslatePipe` (e.g. `{{ 'hero.title' | translate }}`), ensuring reactive, instant language swapping without page reloads or layout shifts.

### 2. Router-Driven SEO & Meta Engine
Search Engine Optimization is managed dynamically through a custom `SeoService` that:
- Listens to router navigation events and updates meta tags instantly.
- Dynamically configures OpenGraph and Twitter cards for premium social sharing previews.
- Injects a fully structured **JSON-LD Schema (LocalBusiness)** directly into the document `<head>` on route load, boosting appearance in Puglia local searches and Google Maps results.

### 3. Netlify Forms Integration
The contact page is integrated with Netlify's native form handling.
- The HTML form uses `data-netlify="true"`, `name="contact"`, and a hidden `form-name` input.
- Netlify crawler detects these attributes on build, and intercepts standard POST submissions or programmatic submissions gracefully, providing a seamless inbox experience without needing a dedicated backend.

### 4. Centralized Business Metadata Config (`src/app/config/business-info.ts`)
To adhere to clean architecture and avoid hardcoded duplication of company details (address, phone, VAT, founding year, geopoints, business hours):
- All company details are stored in a centralized, read-only config file.
- Consumed dynamically by `SeoService` to generate standard search schemas, and injected in templates (`FooterComponent`, `ContactComponent`) for rendering.
- Updating company information (like phone number or email) is now a 1-second task made in a single centralized place!

### 5. Modern Premium Styling Theme (WordPress Editorial Style)
- Defined globally in `src/styles.scss` using CSS custom properties.
- **Color Palette:** Deep natural stone-slate and luxury charcoal backgrounds (`#141719` / `#1e2224`), sophisticated warm brass gold/bronze accents (`#c5a059`), and clean white/warm travertine cream layout layers (`#ffffff` / `#faf9f6`).
- **Aesthetic:** Editorial-style headings (using Google Font *Plus Jakarta Sans*), rounded layout cards (`16px`), rich soft shadows, minimal badges, and beautiful scroll-triggered entry animations powered globally by **AOS (Animate On Scroll)** with SPA auto-refresh routing hooks. Features highly-performant, GPU-accelerated animated backgrounds (drifting fluid Aura Orbs and sparkling Floating Golden Dust particles) inside the Hero section.
- **Logo & Favicons:** Uses the premium transparent background logo asset `assets/images/newLogo.webp` integrated natively in header and footer environments. Favicon and shortcut icon configurations are dynamically linked inside `src/index.html` referencing `/assets/icons/favicon_io/` with full multi-device support (apple-touch-icon, multiple png resolutions, and structured site manifest).
- **Typography:** Bold, modern headings paired with *Inter* for body readability.

### 5. Galleria / I Nostri Lavori (Portfolio)
- A highly elegant portfolio grid is integrated on the Home Page (`/`).
- Currently, it renders stunning, modern CSS placeholders styled with radial-gradients and vector icons to signify flooring, renovations, and flat roof treatments.
- **How to add actual project images in the future:**
  1. Save your completed project photos (optimized in `.webp` or `.jpg` format, e.g., `lavoro1.webp`, `lavoro2.webp`) under the `public/assets/images/` directory.
  2. Open `src/app/pages/home/home.html`.
  3. Replace the placeholder div:
     ```html
     <div class="media-placeholder-gradient flooring-item">...</div>
     ```
     with an image tag:
     ```html
     <img src="assets/images/lavoro1.webp" alt="Nome Lavoro" class="portfolio-img" />
     ```
  4. The styles in `src/styles.scss` will automatically apply elegant borders, soft hover scales, and premium overlay animations to your physical images!

---

## 🚀 Standard Development Workflows

### 🧪 Testing Guidelines
Unit tests are fully configured and run lightning-fast using **Vitest**.
- **Running tests once:** `npm run test -- --watch=false`
- **Watch mode:** `npm run test`
- Always verify routing, translation lookups, and layout structures when introducing code changes.

### 📝 Page & Component Generation
Keep all components standalone. When creating new routes:
- Create separate `.html` and `.scss` files under the component folder.
- Ensure the template utilizes semantic, descriptive HTML tags to maximize accessibility and SEO indexability.
- Add routes using modern lazy-loaded syntax in `src/app/app.routes.ts`:
  ```typescript
  {
    path: 'servizi',
    loadComponent: () => import('./pages/services/services').then(m => m.ServicesComponent)
  }
  ```
