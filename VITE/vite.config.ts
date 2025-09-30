import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
  hmr: {overlay: false},
    port: 80, // default port
    host: true, // listen on all addresses
    strictPort: false, // try another port if 5173 is in use
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
