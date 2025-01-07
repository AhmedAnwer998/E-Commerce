import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/create-checkout-session": "http://localhost:4000", // Adjust for your backend port
    },
  },
  plugins: [react()],
});
