# Purpose
- ClubKit is designed to be a service where clubs (eg. university, social) can create, edit and manage their websites with a simple dashboard UI rather than touching code. - Their deployed website is then rendered through data that lives in config files, giving each club ability to customize styles, text, colors and images for their own club.
- This allows a club to have a website without coding and to be maintanable or editable without significant developer intervention.
- The current repository is for the deployed website's configuration for any club, not the dashboard at all. 

# Commands
- Dev: `npm run dev` (port 3000)
- Build: `npm run build`
- Lint: `npm run lint`

# Architecture
- Next.js App Router, TypeScript strict
- Config-driven: all site-wide brand config lives in /data/club-data.ts
- Page-specific content has its own data file (events-data.ts, team-data.ts etc.)
- Components read from clubData — never hardcode colors, text, or sizes
- HEADER_HEIGHT imported from @/lib/constants, never duplicated

# Code style
- Use CSS-in-JS inline styles or Tailwind depending on context
- All font sizes/colors come from club-data config, not hardcoded
- Responsive via injected <style> tags with CSS classes (see Hero.tsx pattern)
- Injected CSS classes are scoped per component: `ck-hero-*`, `ck-evhero-*`, `ck-footer-*`, `ck-nav-link` — always use a component-specific prefix to avoid cross-component collisions

# Patterns
- New sections follow Hero.tsx structure: data shape in club-data, component reads it
- Mobile/desktop handled via CSS classes (ck-hidden-mobile / ck-shown-mobile)
- Screen-width breakpoints: 480px, 768px, 1024px, 1400px
- New pages get their own data file in src/data/ (e.g. event-data.ts) — never add page-specific config to club-data.ts
- Page data files use a `show: boolean` flag on optional fields (subheading, cta) rather than checking for null labels
- Media show/hide in components (images, videos) use component-scoped `display: block/none` CSS, not the global ck-hidden-mobile/ck-shown-mobile (which use display: flex and would be wrong for image containers)
- Blur on background media: apply `filter: blur(Xpx)` + `transform: scale(1.08)` to the media element, not the overlay or content. The section's `overflow: hidden` clips the scaled edges. Use at least 4px — sub-pixel values are imperceptible.

# Gotchas
- IMPORTANT: Never hardcode hex values in components — they must come from clubData
- IMPORTANT: Always check HEADER_HEIGHT offset when adding fixed-position elements
- IMPORTANT: New page heroes read header.style from clubData to determine the HEADER_HEIGHT content offset — even page-specific components must import clubData for this