import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sandboxPlugin from './server/sandbox-plugin.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sandboxPlugin()],
})
