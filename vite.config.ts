import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const devPort = 5174
const devHost = 'localhost'
const usePoll = process.env.VITE_DEV_POLL === '1'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  server: {
    host: devHost,
    port: devPort,
    strictPort: false,
    // Pin HMR WebSocket host to match the page URL (port follows the actual dev server port).
    hmr: {
      protocol: 'ws',
      host: devHost,
    },
    watch: {
      // If edits never trigger updates until manual refresh, run: VITE_DEV_POLL=1 npm run dev
      usePolling: usePoll,
      interval: usePoll ? 250 : undefined,
    },
  },
})
