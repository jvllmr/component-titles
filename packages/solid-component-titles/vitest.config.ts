import solid from "vite-plugin-solid";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "solid-component-titles",
    dir: "./src",
    watch: false,
    setupFiles: ["test-setup.ts"],
    environment: "jsdom",
    coverage: { provider: "istanbul" },
  },
  plugins: [solid()],
});
