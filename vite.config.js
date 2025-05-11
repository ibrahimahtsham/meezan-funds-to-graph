import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/meezan-funds-to-graph/", // This is important for GitHub Pages
  plugins: [react()],
});
