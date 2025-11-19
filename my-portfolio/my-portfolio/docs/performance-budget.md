# Performance Budget

This document outlines the performance targets and budgets for the portfolio website.

## Core Web Vitals (Mobile/4G Throttle)

| Metric | Target | Critical Threshold |
|--------|--------|-------------------|
| LCP (Largest Contentful Paint) | ≤ 1.8s | 2.5s |
| INP (Interaction to Next Paint) | < 150ms | 200ms |
| CLS (Cumulative Layout Shift) | < 0.03 | 0.1 |

## Lighthouse Scores (Minimum)

All categories must score ≥ 90 on mobile (4G throttle):
- Performance: ≥ 90
- Accessibility: ≥ 90
- Best Practices: ≥ 90
- SEO: ≥ 90

## Asset Budgets

### JavaScript
- **Total JS (initial load)**: ≤ 200KB (gzipped)
- **Total JS (fully loaded)**: ≤ 350KB (gzipped)
- **Single bundle**: ≤ 100KB (gzipped)

### Images
- **Hero portrait (priority)**: ≤ 180KB
- **Project cards (lazy)**: ≤ 120KB each
- **About/section images**: ≤ 100KB each
- **Formats**: AVIF (primary), WebP (fallback)
- **Aspect ratios**: Fixed (`aspect-[16/10]`, `aspect-[4/3]`, etc.) to prevent CLS

### Fonts
- **Geist Sans (Variable)**: ~50KB (woff2)
- **Geist Mono (Variable)**: ~45KB (woff2)
- **Strategy**: `next/font/local`, `display: swap`, latin subset

### CSS
- **Total CSS**: ≤ 50KB (gzipped)
- **Critical CSS**: Inlined by Next.js

## Animation Constraints

**Allowed animations (only `transform` and `opacity`):**
1. Page fade (initial load)
2. Section reveal (`useInView`, once)
3. Stagger lists (once)
4. Hover-lift (interactive cards, ≤ 1.04 scale, ≤ 4px translateY)
5. Magnetic hover (CTAs only, ≤ 10px offset, disabled on touch)
6. Parallax (hero portrait, desktop only, disabled on touch/reduced-motion)

**Forbidden:**
- `width`, `height`, `top`, `left`, `right`, `bottom` animations
- Scroll-jacking, Lenis, Locomotive
- Global cursor effects
- Video backgrounds
- Heavy SVG filters

## Rate Limiting (Contact Form)

- **Limit**: 5 requests per 10 minutes per IP
- **Response**: 429 with `Retry-After` header
- **Implementation**: In-memory (dev), Upstash Redis/Vercel KV (production)

## Monitoring

Run these checks before each release:

1. **Lighthouse CI** (mobile/4G):
   ```bash
   npm run build
   npm run start
   # Open Chrome DevTools → Lighthouse → Mobile → Run
   ```

2. **Bundle Analysis**:
   ```bash
   ANALYZE=true npm run build
   ```

3. **CLS Testing**:
   - Disable cache in DevTools
   - Throttle to 4G
   - Reload page 5 times
   - Average CLS must be < 0.03

4. **60fps Profiling**:
   - Chrome DevTools → Performance
   - Record during magnetic hover and parallax scroll
   - Check for frame drops
   - If drops detected → disable that animation

## Gating Rules

### If LCP > 1.8s or INP > 150ms:
1. Remove parallax from hero portrait
2. Remove magnetic hover from CTAs
3. Reduce stagger children delay
4. Lazy-load testimonials section

### If CLS > 0.03:
1. Verify all images have fixed `aspect-*` classes
2. Add explicit width/height to all `next/image`
3. Add skeleton loaders for dynamic content

### If JS bundle > 200KB:
1. Review and remove unused dependencies
2. Split large components
3. Lazy-load non-critical sections

## Production Checklist

- [ ] All images optimized and under budget
- [ ] Lighthouse scores ≥ 90 (all categories)
- [ ] CWV within targets (LCP, INP, CLS)
- [ ] 60fps during all animations (no drops)
- [ ] Fonts loading with `display: swap`
- [ ] No console errors or warnings
- [ ] Rate limiting tested
- [ ] Honeypot functional
- [ ] `prefers-reduced-motion` verified
- [ ] Touch devices disable parallax/magnetic
- [ ] AA contrast in both themes
- [ ] Keyboard navigation works
- [ ] Screen reader friendly (ARIA labels)
- [ ] `NEXT_PUBLIC_ENABLE_INDEXING=false` for staging

## Notes

- **In-memory rate limiting** will NOT work reliably on Vercel (cold starts, multiple instances). Migrate to Upstash Redis or Vercel KV before production.
- Test on actual mobile devices, not just DevTools emulation.
- Profile on **mid-range Android** devices (Moto G4, Samsung A50) for realistic performance baseline.

