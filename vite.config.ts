import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import svgr from "vite-plugin-svgr"

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), svgr()],
  resolve: {
    alias: {
      '@': '/src',
      '@icons': '/src/assets/icons',
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@core-components': '/src/core-components',
    },
  },
})
