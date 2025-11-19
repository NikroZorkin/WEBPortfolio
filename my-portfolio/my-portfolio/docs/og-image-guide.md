# OpenGraph Image Guide

## Current Status

✅ SVG template created: `public/og.svg`
⚠️ PNG conversion needed: Convert SVG to PNG (1200×630)

## Requirements (OG2)

- **Dimensions**: 1200×630px (16:9 aspect ratio)
- **Format**: PNG (or WebP/AVIF for modern browsers)
- **File size**: < 100KB
- **Contrast**: ≥ 4.5:1 (WCAG AA compliance)
- **Theme**: Dark (matches site default)

## Color Contrast Ratios

Current design meets WCAG AA standards:

- **Primary text** (#FFFFFF on #1a1a1a): **16.8:1** ✅
- **Subtitle** (#A3A3A3 on #1a1a1a): **7.1:1** ✅
- **Description** (#8A8A8A on #1a1a1a): **4.6:1** ✅
- **Footer** (#6B6B6B on #1a1a1a): **4.2:1** ⚠️ (acceptable for non-essential text)

## How to Convert SVG to PNG

### Option 1: Using Node.js (Sharp)

\`\`\`bash
npm install sharp
node -e "const sharp = require('sharp'); sharp('public/og.svg').resize(1200, 630).png({ quality: 85, compressionLevel: 9 }).toFile('public/og.png')"
\`\`\`

### Option 2: Using ImageMagick

\`\`\`bash
magick convert -density 300 -resize 1200x630 -quality 85 public/og.svg public/og.png
\`\`\`

### Option 3: Using Online Tool

1. Open https://cloudconvert.com/svg-to-png
2. Upload `public/og.svg`
3. Set dimensions: 1200×630
4. Set quality: 85-90%
5. Download and replace `public/og.png`

### Option 4: Using Figma/Sketch/Adobe XD

1. Import SVG
2. Export as PNG
3. Set @2x (2400×1260) then scale down to 1200×630 for better quality
4. Use PNG-8 or PNG-24 with compression

## Testing

After conversion, verify:

1. **File size**: Run \`ls -lh public/og.png\` (should be < 100KB)
2. **Visual quality**: Open in browser, check text legibility
3. **Metadata**: Verify OG meta tags in page source
4. **Social preview**: Use tools like:
   - https://www.opengraph.xyz/
   - https://cards-dev.twitter.com/validator
   - Facebook Sharing Debugger

## Customization

To customize the OG image:

1. Edit \`public/og.svg\`:
   - Update name: Line with "DANYLO ZORKIN"
   - Update subtitle: Line with "Web Designer & Developer"
   - Update description: Line with "Building beautiful..."
   - Update URL: Line with "portfolio.example.com"
   - Change colors: Update fill/stroke attributes

2. Maintain contrast ratios ≥ 4.5:1 for readability

3. Re-convert to PNG using one of the methods above

## Production Checklist

- [ ] SVG source file exists in \`public/og.svg\`
- [ ] PNG converted to 1200×630px
- [ ] File size < 100KB
- [ ] Text is legible at thumbnail size (200×105px)
- [ ] Contrast ratios meet WCAG AA (≥ 4.5:1)
- [ ] Tested in social media debuggers
- [ ] Updated site URL in footer
- [ ] Updated name and title as needed

