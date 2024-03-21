import { createApp } from 'vue';
import App from './App.vue';
import Cleave from 'cleave-lite';
import { router } from './router';
import { getHighlighterCore } from 'shikiji/core';
import getWasmInlined from 'shikiji/wasm';
import vitesseLight from 'shikiji/themes/vitesse-light.mjs';
import Control from './Control.vue';
import Controls from './Controls.vue';
import ComponentTitle from './ComponentTitle.vue';
import { Token } from '@itsy/token';
import 'uno.css';

const highlighter = await getHighlighterCore({
  themes: [vitesseLight],
  langs: [import('shikiji/langs/javascript.mjs'), import('shikiji/langs/vue-html.mjs')],
  loadWasm: getWasmInlined,
});

createApp(App).provide('Cleave', Cleave).provide('highlighter', highlighter).provide('highlightTheme', 'vitesse-light').component('token', Token).component('demo-control', Control).component('demo-controls', Controls).component('component-title', ComponentTitle).use(router).mount('#app');
