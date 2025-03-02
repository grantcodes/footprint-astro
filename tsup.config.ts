import { defineConfig } from "tsup";

export default defineConfig((options) => {
  if (options.env?.TEST === "yes") {
    return {
      outDir: "tmp/tests",
      entry: ["src"],
      external: ["ava"],
      format: ["esm"],
    };
  }

  return {
    minify: options.watch !== true,
    clean: true,
    dts: true,
    format: ["esm"],
    sourcemap: options.watch === true,
    entry: ["src/integration.ts", "src/app.ts"],
  };
});
