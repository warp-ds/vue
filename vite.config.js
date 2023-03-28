import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import drnm from 'drnm'
import path from 'path'
import fs from 'fs'
import { presetWarp } from '@warp-ds/uno'
import uno from 'unocss/vite'


export default defineConfig({
  plugins: [
    vue(),
    uno({
      presets: [presetWarp()]
    })
  ],  build: { target: 'esnext' },
  server: { host: "0.0.0.0", port: 3003 },
  test: { environment: 'happy-dom' }
})
