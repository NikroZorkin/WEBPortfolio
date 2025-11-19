module.exports = {
  // TypeScript and JavaScript files
  '*.{ts,tsx,js,jsx}': [
    'eslint --fix',
    'prettier --write',
    () => 'tsc --noEmit', // Run typecheck on all files
  ],
  // All other supported files
  '*.{json,md,css,scss}': ['prettier --write'],
}

