import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/verafurious/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@furious": path.resolve(__dirname, "furious.json"),
    },
  },
});
