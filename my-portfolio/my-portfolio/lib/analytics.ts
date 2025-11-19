/**
 * Analytics stub for event tracking
 * 
 * Supports Plausible Analytics and Google Analytics 4
 * Set NEXT_PUBLIC_ANALYTICS_PROVIDER in .env:
 * - 'plausible' for Plausible
 * - 'ga4' for Google Analytics 4
 * - undefined/empty for no analytics (stub mode)
 */

const ANALYTICS_PROVIDER = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || 'none'
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

// Event names
export const AnalyticsEvents = {
  CTA_CLICK: 'cta_click',
  PROJECT_OPEN: 'project_open',
  FORM_SUBMIT: 'form_submit',
  THEME_TOGGLE: 'theme_toggle',
} as const

/**
 * Convenience wrapper for CTA clicks
 * @param ctaType Type of CTA (e.g., 'email', 'telegram')
 * @param metadata Additional metadata (e.g., {target: 'gmail'})
 */
export function trackCTAClick(ctaType: string, metadata?: Record<string, string | number | boolean>) {
  trackEvent(AnalyticsEvents.CTA_CLICK, {
    cta: ctaType,
    ...metadata,
  })
}

type AnalyticsEvent = typeof AnalyticsEvents[keyof typeof AnalyticsEvents]

interface EventProperties {
  [key: string]: string | number | boolean
}

// Throttle map to prevent event spam
const eventThrottle = new Map<string, number>()
const THROTTLE_MS = 1000 // 1 second throttle

/**
 * Track an analytics event
 * @param event Event name
 * @param properties Optional event properties
 */
export function trackEvent(event: AnalyticsEvent, properties?: EventProperties) {
  // Check throttle
  const now = Date.now()
  const eventKey = `${event}_${JSON.stringify(properties || {})}`
  const lastTracked = eventThrottle.get(eventKey)
  
  if (lastTracked && now - lastTracked < THROTTLE_MS) {
    console.log(`[Analytics] Throttled: ${event}`)
    return
  }
  
  eventThrottle.set(eventKey, now)
  
  // Clean up old entries (keep only last 100)
  if (eventThrottle.size > 100) {
    const oldestKey = eventThrottle.keys().next().value
    if (oldestKey) eventThrottle.delete(oldestKey)
  }
  
  // Track based on provider
  if (ANALYTICS_PROVIDER === 'plausible') {
    trackPlausible(event, properties)
  } else if (ANALYTICS_PROVIDER === 'ga4') {
    trackGA4(event, properties)
  } else {
    console.log(`[Analytics Stub] ${event}`, properties)
  }
}

/**
 * Track event with Plausible Analytics
 */
function trackPlausible(event: string, properties?: EventProperties) {
  if (typeof window === 'undefined') return
  
  try {
    // @ts-expect-error - plausible is loaded via script tag
    if (window.plausible) {
      // @ts-expect-error - plausible is loaded via script tag
      window.plausible(event, { props: properties })
    } else {
      console.warn('[Plausible] Not loaded')
    }
  } catch (error) {
    console.error('[Plausible] Error:', error)
  }
}

/**
 * Track event with Google Analytics 4
 */
function trackGA4(event: string, properties?: EventProperties) {
  if (typeof window === 'undefined') return
  
  try {
    // @ts-expect-error - gtag is loaded via script tag
    if (window.gtag) {
      // @ts-expect-error - gtag is loaded via script tag
      window.gtag('event', event, properties)
    } else {
      console.warn('[GA4] Not loaded')
    }
  } catch (error) {
    console.error('[GA4] Error:', error)
  }
}

/**
 * Initialize analytics provider
 * Call this once in your root layout
 */
export function initAnalytics() {
  if (typeof window === 'undefined') return
  
  if (ANALYTICS_PROVIDER === 'plausible' && PLAUSIBLE_DOMAIN) {
    console.log(`[Analytics] Plausible initialized for ${PLAUSIBLE_DOMAIN}`)
    // Script should be loaded in <head> via Next.js Script component
  } else if (ANALYTICS_PROVIDER === 'ga4' && GA4_ID) {
    console.log(`[Analytics] GA4 initialized: ${GA4_ID}`)
    // Script should be loaded in <head> via Next.js Script component
  } else {
    console.log('[Analytics] Running in stub mode (no provider configured)')
  }
}

/**
 * Get the analytics script tags for the current provider
 * Use this in your root layout <head>
 */
export function getAnalyticsScripts() {
  if (ANALYTICS_PROVIDER === 'plausible' && PLAUSIBLE_DOMAIN) {
    return {
      type: 'plausible',
      scripts: [
        {
          src: 'https://plausible.io/js/script.js',
          'data-domain': PLAUSIBLE_DOMAIN,
          defer: true,
        },
      ],
    }
  }
  
  if (ANALYTICS_PROVIDER === 'ga4' && GA4_ID) {
    return {
      type: 'ga4',
      scripts: [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`,
          async: true,
        },
        {
          id: 'ga4-init',
          strategy: 'afterInteractive',
          dangerouslySetInnerHTML: {
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_ID}');
            `,
          },
        },
      ],
    }
  }
  
  return null
}

