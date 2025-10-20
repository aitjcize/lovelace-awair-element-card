#!/usr/bin/env node
import { build, context } from 'esbuild';
import { readFileSync } from 'fs';

// Read version from package.json
const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

// Determine if we're in production or dev mode
const isDev = process.argv.includes('--dev');

const buildOptions = {
  entryPoints: ['src/awair-element-card.ts'],
  bundle: true,
  minify: !isDev,
  sourcemap: true,
  format: 'esm',
  target: 'es2020',
  charset: 'utf8',
  legalComments: 'none',
  tsconfig: 'tsconfig.json',
  outfile: 'dist/awair-element-card.js',
  define: {
    __VERSION__: `"${pkg.version}"`, // Inject version at build time
  },
};

if (isDev) {
  // Watch mode
  const ctx = await context(buildOptions);
  await ctx.watch();
  console.log('👀 Watching for changes...');
} else {
  // Build once
  await build(buildOptions).catch(() => process.exit(1));
  console.log('✅ Build complete');
}
