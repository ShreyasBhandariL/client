import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   build:{
    sourcemap: false
  },
  server:{
    host:'0.0.0.0',
    port: 4000,
    strictPort: true,
    hmr: true,
  },
})