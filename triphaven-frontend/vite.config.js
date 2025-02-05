import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [react(), compression()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Creates a separate 'vendor.js' bundle for dependencies
          }
          if (id.includes("react")) {
            return "react-vendor"; // Creates a smaller React-specific chunk
          }
        },
      },
    },
  },
});
