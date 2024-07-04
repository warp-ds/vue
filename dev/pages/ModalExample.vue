<script setup>
import { ref, computed, watch } from 'vue';

import { modalShowing } from '../src/store.js';

import ModalContent from './helpers/ModalContent.vue';

import { wModal, wButton } from '#components';

const heightToggle = ref(false);
const demoStyles = computed(() => ({
  '--w-modal-min-height': heightToggle.value ? '100%' : '64%',
  '--w-modal-max-height': '72%',
  // '--f-modal-height': '100%'
}));
const changeHeight = () => (heightToggle.value = !heightToggle.value);
const showLeft = ref(false);
const showModal = ref(false);

const showControl = [{ onClick: () => (showModal.value = true), name: 'Go!', button: true }];

watch(showModal, (showing) => (modalShowing.value = showing));
</script>

<template>
  <div>
    <component-title title="Modal" />

    <token>
      <w-modal
        v-model="showModal"
        title="Hello Warp!"
        :style="demoStyles"
        :left="showLeft"
        right
        @dismiss="showModal = false"
        @right="showModal = false">
        <div class="space-x-8 pt-4">
          <w-button utility small class="mb-32" @click="changeHeight">Modify height</w-button>
          <w-button utility small class="mb-32" @click="showLeft = !showLeft">Toggle the back-button</w-button>
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
