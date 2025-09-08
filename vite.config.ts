/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
  ],
  base: "/verafurious/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@furious": path.resolve(__dirname, "furious.json"),
    },
  },
  test: {
    globals: true,
  },
});
