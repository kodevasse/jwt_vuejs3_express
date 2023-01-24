import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      // string shorthand: http://localhost:5173/foo -> http://localhost:4567/foo
      "/api": "http://localhost:5000",
    },
  },

  resolve: {
    // build: {
    //   outDir: "./dist",
    // },
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
