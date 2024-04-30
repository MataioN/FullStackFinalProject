import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // Backend server
        changeOrigin: true,  // Change the origin header to match the target
        rewrite: (path) => path.replace(/^\/api/, 'lyrics'),  // Rewrite the path as needed
      },
    },
  },
});
