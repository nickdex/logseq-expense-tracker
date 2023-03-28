import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  test: {
    reporters: ['html'],
  },
  build: {
    target: 'esnext',
    sourcemap: true,
  },
})
