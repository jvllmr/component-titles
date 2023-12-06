import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/component-titles/",
  plugins: [react()],
  build: {
    outDir: "build",
  },
  resolve: {
    alias: {
      "@jvllmr/react-component-titles": path.join(
        __dirname,
        "../react-component-titles/src",
      ),
      "@jvllmr/component-titles-core": path.join(
        __dirname,
        "../component-titles-core/src",
      ),
    },
  },
});
