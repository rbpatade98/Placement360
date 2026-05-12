import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      // Proxy AI requests to avoid browser CORS issues
      "/api/openrouter": {
        target: "https://openrouter.ai/api/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/openrouter/, ""),
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq, req) => {
            // Preserve the Authorization header — http-proxy can strip it
            // when forwarding to an HTTPS target with changeOrigin.
            const auth = req.headers["authorization"];
            if (auth) {
              proxyReq.setHeader("Authorization", auth);
            }
          });
        },
      },
    },
  },
})
