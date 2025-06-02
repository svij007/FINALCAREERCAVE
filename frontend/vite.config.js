import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Make it accessible from the network
    hmr: {
      protocol: 'ws',  // Explicitly use WebSocket for Hot Module Replacement
      host: 'localhost',
      clientPort: 5173,
    },
    watch: {
      usePolling: true, // Helps with file changes on some systems (especially with Docker/VMs)
    },
  },
})
