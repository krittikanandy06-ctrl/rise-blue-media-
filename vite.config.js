import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1100,
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Normalize path separators for Windows compatibility
            const n = id.replace(/\\/g, '/');
            // Three.js core — check first with specific path
            if (/\/node_modules\/three\//.test(n)) return 'vendor-three';
            // React Three ecosystem
            if (n.includes('@react-three/')) return 'vendor-r3f';
            // Animation libraries
            if (n.includes('framer-motion') || /\/gsap\//.test(n) || /\/lenis\//.test(n)) return 'vendor-animation';
            // Icon libraries
            if (n.includes('lucide-react') || n.includes('@icons-pack')) return 'vendor-ui';
            // Supabase
            if (n.includes('@supabase/')) return 'vendor-supabase';
          }
        },
      },
    },
  },
})
