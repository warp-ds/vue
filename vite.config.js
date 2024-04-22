import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { presetWarp } from '@warp-ds/uno';
import uno from 'unocss/vite';
import { MinifyWarpLib } from './.minifier-plugin.js';
import VitEik from 'viteik';
import { classes } from '@warp-ds/css/component-classes/classes';

export default defineConfig((env) => ({
  plugins: [
    vue(),
    uno({
      presets: [presetWarp({ skipResets: true })],
      safelist: classes,
    }),
    env.mode !== 'lib' && VitEik(),
    MinifyWarpLib(),
  ],
  server: { host: '0.0.0.0', port: 3003 },
  test: {
    environment: 'happy-dom',
    include: ['./test/**'],
    exclude: ['**.json'],
    coverage: {
      cleanOnRerun: true,
      reporter: ['text'],
      exclude: ['**.json', 'dev/**', 'storybook-static/**', '.storybook/**', 'components/**/stories', '.minifier-plugin.js', 'lingui.config.ts'],
    },
  },
  ...getBuildOpts(env),
}));

function getBuildOpts(env) {
  if (env.mode === 'production') {
    return defineConfig({
      build: { target: 'esnext' },
    });
  }

  if (env.mode === 'lib') {
    return defineConfig({
      build: {
        rollupOptions: {
          external: ['vue'],
          input: {
            tag: 'components/tag/index.js',
            tabs: 'components/tabs/index.js',
            switch: 'components/switch/index.js',
            steps: 'components/steps/index.js',
            slider: 'components/slider/index.js',
            pill: 'components/pill/index.js',
            modal: 'components/modal/index.js',
            generic: 'components/generic/index.js',
            forms: 'components/forms/index.js',
            expandable: 'components/expandable/index.js',
            card: 'components/card/index.js',
            'button-group': 'components/button-group/index.js',
            button: 'components/button/index.js',
            breadcrumbs: 'components/breadcrumbs/index.js',
            box: 'components/box/index.js',
            badge: 'components/badge/index.js',
            attention: 'components/attention/index.js',
            alert: 'components/alert/index.js',
            'warp-vue': './index.js',
          },
          output: {
            format: 'es',
            dir: 'dist',
            entryFileNames: '[name].js',
          },
        },
      },
    });
  }

  if (env.mode === 'eik') {
    return defineConfig({
      build: {
        emptyOutDir: false,
        ...getLibOpts('warp-vue.eik'),
      },
    });
  }
}

function getLibOpts(fileName) {
  return {
    sourcemap: true,
    lib: {
      formats: ['es'],
      entry: './index.js',
      fileName,
    },
  };
}
