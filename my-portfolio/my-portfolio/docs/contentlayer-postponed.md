# Contentlayer Integration - Postponed

## Status: ⏸️ POSTPONED

Contentlayer integration (CL1-CL5) has been postponed for the following reasons:

### Why Postponed?

1. **Breaking Changes**: Contentlayer is not actively maintained and has compatibility issues with Next.js 15+
2. **Better Alternatives**: Consider modern alternatives:
   - **Contentful** - Headless CMS with great DX
   - **Sanity** - Flexible content platform
   - **MDX Bundler** - Direct MDX processing
   - **next-mdx-remote** - Server-side MDX rendering
   - **Keystatic** - Git-based CMS (Contentlayer spiritual successor)

3. **Current State Works**: The current implementation with hardcoded `heroProjects` is:
   - ✅ Type-safe
   - ✅ Fast (no build-time processing)
   - ✅ Simple to maintain
   - ✅ SEO-ready (JSON-LD integrated)

### Migration Path (When Ready)

When you're ready to add content management:

#### Option 1: Keystatic (Recommended)
```bash
npm install @keystatic/core @keystatic/next
```
- Git-based like Contentlayer
- Active maintenance
- Visual editing UI
- Next.js 15+ compatible

#### Option 2: next-mdx-remote
```bash
npm install next-mdx-remote gray-matter
```
- No build step
- Server-side rendering
- Lightweight

#### Option 3: Traditional Headless CMS
- Contentful
- Sanity
- Strapi
- Payload CMS

### What to Do Instead

For now, manage content via:

1. **Projects Data**: Edit `lib/projects-data.ts`
2. **Add new projects**: Append to `heroProjects` array
3. **Types are enforced**: TypeScript will catch errors

Example:
```typescript
// lib/projects-data.ts
export const heroProjects = [
  {
    id: '4',
    title: 'New Project',
    description: 'Amazing new work',
    cover: '/images/new-project.jpg',
    tags: ['React', 'TypeScript'],
  },
  // ... existing projects
]
```

### Features Already Implemented

✅ All content functionality works without Contentlayer:
- Featured projects in Hero
- JSON-LD structured data
- Type-safe project data
- Image optimization ready
- Analytics tracking

### Tasks Status

- ❌ CL1: Contentlayer config - Not needed
- ❌ CL2: Next.js integration - Not needed  
- ❌ CL3: MDX support - Use next-mdx-remote when needed
- ❌ CL4: Work section integration - Already works with current data
- ❌ CL5: Content conventions - Document manual content guidelines instead

## Next Steps

1. **For prototype/MVP**: Keep current implementation ✅
2. **For scaling**: Choose a modern CMS from options above
3. **For Markdown**: Implement next-mdx-remote or MDX Bundler
4. **For Git-based**: Use Keystatic

## Content Management Guide

### Adding a New Project

1. Open `lib/projects-data.ts`
2. Add project object:
```typescript
{
  id: 'unique-id',
  title: 'Project Name',
  description: 'Brief description',
  cover: '/images/project-name.jpg',
  tags: ['Tag1', 'Tag2'],
}
```
3. Add cover image to `public/images/`
4. Commit changes

### Project Image Guidelines

- **Format**: AVIF/WebP preferred, PNG/JPEG fallback
- **Dimensions**: 
  - Hero cards: 1200×900px (4:3)
  - Work grid: 1600×1000px (16:10)
- **File size**: 
  - Hero (with priority): ≤ 180KB
  - Cards (lazy): ≤ 120KB
- **Naming**: kebab-case (e.g., `project-name-cover.avif`)

### Type Definitions

Current project type:
```typescript
{
  id: string
  title: string
  description: string
  cover: string  // Path relative to public/
  tags: string[]
}
```

To extend:
```typescript
// Add fields like:
featured?: boolean
order?: number
date?: string
client?: string
url?: string
```

## Conclusion

The current implementation is **production-ready** without Contentlayer. Focus on:
- Creating actual project content
- Optimizing images
- Writing project descriptions
- Adding real portfolio work

Contentlayer can be added later if Git-based content management becomes a requirement.

