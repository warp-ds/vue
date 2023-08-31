<script setup>
import Fuse from 'fuse.js'
import { sidebarConfig } from './sidebar-config.js'
import { ref, computed, watch } from 'vue'
import { wTextfield, wModal, wBox } from '#components'
import { modalShowing } from './store.js'

const inputEl = ref(null)
const showSearch = ref(false)
const searcher = new Fuse(sidebarConfig, { keys: ['links.title'], includeMatches: true })
const searchTerm = ref('')
const results = computed(() => searcher.search(searchTerm.value))
const matches = computed(() => results.value.map(r =>
  r.matches.map(m => r.item.links[m.refIndex])
).flat(Infinity))
const handleSearch = (e) => {
  if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
    showSearch.value = true
  }
}
window.addEventListener('keydown', handleSearch)
const hide = () => {
  showSearch.value = false
  searchTerm.value = ''
}
const focusInput = () => {
  inputEl.value.$el.querySelector('input').focus()
}
watch(showSearch, (showing) => modalShowing.value = showing)
</script>

<template>
  <div>
    <w-modal title="Search" v-model="showSearch" @dismiss="hide" @right="hide" @shown="focusInput">
      <w-textfield label="Search term" v-model="searchTerm" ref="inputEl" />
      <w-box neutral class="mt-24">
        <h5>Results</h5>
        <p v-for="m in matches">
          <router-link :to="m.to" @click="hide">{{ m.title }}</router-link>
        </p>
      </w-box>
    </w-modal>
  </div>
</template>
