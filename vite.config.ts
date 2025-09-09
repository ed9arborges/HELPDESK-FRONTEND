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
      '@pages': '/src/pages',
      '@layouts': '/src/layouts',
      '@hooks': '/src/hooks',
      '@services': '/src/services',
      '@styles': '/src/styles',
      '@utils': '/src/utils',
      '@contexts': '/src/contexts',
      '@tests': '/src/tests',
    },
  },
})
