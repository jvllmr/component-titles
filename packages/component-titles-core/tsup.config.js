import { esbuildPluginFilePathExtensions } from "esbuild-plugin-file-path-extensions";

import { defineConfig } from "tsup";
export default defineConfig([
  {
    entry: ["src/*.ts"],
    format: ["cjs", "esm"],
    target: ["es2020", "node16"],
    outDir: "build",
    dts: true,
    sourcemap: true,
    clean: true,
    esbuildPlugins: [esbuildPluginFilePathExtensions({ esmExtension: "js" })],
  },
]);
