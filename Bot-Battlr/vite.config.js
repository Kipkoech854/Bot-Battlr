import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
if (!globalThis.crypto) {
  const crypto = await import('crypto');
  globalThis.crypto = {
    getRandomValues: (arr) => crypto.webcrypto.getRandomValues(arr),
  };
}
export default defineConfig({
  plugins: [react()],
})
// vite.config.js



