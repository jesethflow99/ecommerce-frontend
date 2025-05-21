import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tr } from 'framer-motion/client'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host:true,
  },
})
