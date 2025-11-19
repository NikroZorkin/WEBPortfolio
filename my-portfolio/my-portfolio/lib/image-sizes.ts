/**
 * Centralized image sizes configuration for next/image
 * Use these constants to ensure consistent sizing across the application
 */

export const IMAGE_SIZES = {
  // Hero section portrait
  HERO_PORTRAIT: '(max-width: 768px) 100vw, 40vw',

  // Work section project cards
  WORK_CARD_LARGE: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 66vw',
  WORK_CARD_MEDIUM: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  WORK_CARD_SMALL: '(max-width: 768px) 100vw, 33vw',

  // About section photo
  ABOUT_PHOTO: '(max-width: 768px) 100vw, 33vw',

  // Testimonial avatars
  AVATAR: '40px',

  // Generic full-width
  FULL_WIDTH: '100vw',
} as const

/**
 * Maximum file sizes for images (in KB)
 */
export const IMAGE_MAX_SIZES = {
  HERO: 180, // KB
  CARD: 120, // KB
  AVATAR: 20, // KB
  OG: 100, // KB
} as const

/**
 * Recommended aspect ratios
 */
export const IMAGE_ASPECTS = {
  HERO_PORTRAIT: '3/4',
  PROJECT_LARGE: '16/10',
  PROJECT_CARD: '4/3',
  ABOUT_PHOTO: 'square',
  AVATAR: 'square',
} as const

