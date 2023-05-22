<script setup>
import { ref, computed, watch } from 'vue'
import { wModal, wButton } from '#components'
import { modalShowing } from '../src/store.js'
import ModalContent from './helpers/ModalContent.vue'

const heightToggle = ref(false)
const demoStyles = computed(() => ({
  '--w-modal-min-height': heightToggle.value ? '100%' : '64%',
  '--w-modal-max-height': '72%',
  // '--f-modal-height': '100%'
}))
const changeHeight = () => heightToggle.value = !heightToggle.value
const showLeft = ref(false)
const showModal = ref(false)

const showControl = [
  { onClick: () => showModal.value = true, name: 'Go!', button: true }
]

watch(showModal, (showing) => modalShowing.value = showing)
</script>

<template>
  <div>
    <component-title title="Modal" />

    <token>
      <w-modal title="Hello Warp!" :style="demoStyles" :left="showLeft" :right="{ 'aria-label': 'Close' }" @dismiss="showModal = false" v-model="showModal" @right="showModal = false">
        <div class="space-x-8">
          <w-button utility @click="changeHeight" small class="mb-32">Modify height</w-button>
          <w-button utility @click="showLeft = !showLeft" small class="mb-32">Toggle the back-button</w-button>
        </div>
        <modal-content />
        <template #footer>
          <w-button primary @click="showModal = false">Click me</w-button>
        </template>
      </w-modal>
    </token>
    <demo-controls>
      <demo-control label="Show modal" :controls="showControl" />
    </demo-controls>
  </div>
</template>
