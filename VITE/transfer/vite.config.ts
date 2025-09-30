import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // default port
    host: true, // listen on all addresses
    strictPort: false, // try another port if 5173 is in use
  }
})
