import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
  server: {
    proxy: {
      '^/api': {
        target: 'https://httpbin.org/',
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
