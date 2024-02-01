import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { presetWarp } from "@warp-ds/uno";
import uno from "unocss/vite";
import { MinifyWarpLib } from "./.minifier-plugin.js";
import VitEik from "viteik";
import { classes } from "@warp-ds/css/component-classes/classes";

export default defineConfig((env) => ({
  plugins: [
    vue(),
    uno({
      presets: [presetWarp({ skipResets: true })],
      safelist: classes,
    }),
    env.mode !== "lib" && VitEik(),
    MinifyWarpLib(),
  ],
  server: { host: "0.0.0.0", port: 3003 },
  test: {
    environment: "happy-dom",
    include: ["./test/**"],
    exclude: ["**.json"],
    coverage: {
      cleanOnRerun: true,
      reporter: ["text"],
      exclude: [
        "**.json",
        "dev/**",
        "storybook-static/**",
        ".storybook/**",
        "components/**/stories",
        ".minifier-plugin.js",
        "lingui.config.ts",
      ],
    },
  },
  ...getBuildOpts(env),
}));

function getBuildOpts(env) {
  if (env.mode === "production")
    return defineConfig({
      build: { target: "esnext" },
    });
  if (env.mode === "lib")
    return defineConfig({
      build: {
        ...getLibOpts("warp-vue"),
        rollupOptions: { external: ["vue"] },
      },
    });
  if (env.mode === "eik")
    return defineConfig({
      build: {
        emptyOutDir: false,
        ...getLibOpts("warp-vue.eik"),
      },
    });
}

function getLibOpts(fileName) {
  return {
    sourcemap: true,
    lib: {
      formats: ["es"],
      entry: "./index.js",
      fileName,
    },
  };
}
