/**
 * Email helper utilities for smart mailto/Gmail link generation
 * No UI logic - pure string generation
 */

interface EmailParams {
  to: string
  subject: string
  body: string
}

interface EmailLinks {
  mailtoHref: string
  gmailUrl: string
}

/**
 * Generate mailto and Gmail compose URLs
 * @param params Email parameters (to, subject, body)
 * @returns Object with mailtoHref (universal fallback) and gmailUrl (Gmail web compose)
 */
export function generateEmailLinks(params: EmailParams): EmailLinks {
  const { to, subject, body } = params

  // Encode all parts (space → %20, newline → %0A, etc.)
  const encodedSubject = encodeURIComponent(subject)
  const encodedBody = encodeURIComponent(body)
  const encodedTo = encodeURIComponent(to)

  // Universal mailto fallback (works on all platforms)
  const mailtoHref = `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`

  // Gmail Web Compose (desktop web)
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${encodedTo}&su=${encodedSubject}&body=${encodedBody}`

  return {
    mailtoHref,
    gmailUrl,
  }
}

/**
 * Check if device is desktop (has hover capability and no touch)
 * Used to determine if we should attempt Gmail web open
 */
export function isDesktopDevice(): boolean {
  if (typeof window === 'undefined') return false

  // Check for hover capability (desktop indicator)
  const hasHover = window.matchMedia('(hover: hover)').matches

  // Check if touch is primary input (mobile indicator)
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  // Desktop = has hover AND no touch
  return hasHover && !hasTouch
}

/**
 * Check if click event has modifiers (Ctrl, Cmd, Shift, middle button)
 * These indicate user wants native browser behavior (new tab, etc.)
 */
export function hasClickModifiers(event: MouseEvent): boolean {
  return (
    event.ctrlKey ||
    event.metaKey || // Cmd on Mac
    event.shiftKey ||
    event.button === 1 // Middle mouse button
  )
}

/**
 * Attempt to open Gmail compose in new tab
 * Returns true if successful, false if popup blocked
 */
export function tryOpenGmail(gmailUrl: string): boolean {
  try {
    const newWindow = window.open(gmailUrl, '_blank', 'noopener,noreferrer')
    return newWindow !== null
  } catch (error) {
    console.warn('[Email Helper] Failed to open Gmail:', error)
    return false
  }
}

