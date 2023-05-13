import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/react-use-dom-title-hook/",
  plugins: [react()],
  build: {
    outDir: "build",
  },
});
