import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "react-component-titles",
    dir: "./src",
    watch: false,
    environment: "jsdom",
    setupFiles: ["test-setup.ts"],
    coverage: {
      provider: "istanbul",
      all: true,
      clean: true,
      allowExternal: true,
    },
  },
});
