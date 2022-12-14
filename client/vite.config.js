import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/static/dist', // comment this line to run in dev mode
  build: {
    outDir: resolve('../static/dist'),
    assetsDir: '',
    manifest: true,
    emptyOutDir: true,
  }
})
