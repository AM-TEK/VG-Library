import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    import('tailwindcss'),
    import('autoprefixer'),
  ],
  css: {
    postcssOptions: import('./postcss.config.cjs'),
  }
})
