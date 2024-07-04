import { createApp } from 'vue';

import { Token } from '@itsy/token';
import Cleave from 'cleave-lite';
import { getHighlighterCore } from 'shikiji/core';
import vitesseLight from 'shikiji/themes/vitesse-light.mjs';
import getWasmInlined from 'shikiji/wasm';

import App from './App.vue';
import ComponentTitle from './ComponentTitle.vue';
import Control from './ControlComponent.vue';
import Controls from './ControlsComponent.vue';
import { router } from './router';

import 'uno.css';

async function initApp() {
  const highlighter = await getHighlighterCore({
    themes: [vitesseLight],
    langs: [await import('shikiji/langs/javascript.mjs'), await import('shikiji/langs/vue-html.mjs')],
    loadWasm: getWasmInlined,
  });

  createApp(App)
    .provide('Cleave', Cleave)
    .provide('highlighter', highlighter)
    .provide('highlightTheme', 'vitesse-light')
    .component('token', Token)
    .component('demo-control', Control)
    .component('demo-controls', Controls)
    .component('component-title', ComponentTitle)
    .use(router)
    .mount('#app');
}

initApp();
