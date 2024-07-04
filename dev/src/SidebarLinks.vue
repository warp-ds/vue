<script setup>
import { ref } from 'vue';

import { wExpandable } from '#components';

const props = defineProps({
  title: String,
  startOpen: Boolean,
});

const expanded = ref(props.startOpen);
</script>

<template>
  <w-expandable v-model="expanded" box animated class="not-rounded">
    <template #title>
      <h5 class="mb-0">{{ title }}</h5>
    </template>
    <div class="flex flex-col text-14 text-gray-600 space-y-8">
      <slot />
    </div>
  </w-expandable>
</template>

<style scoped>
.not-rounded {
  border-radius: 0 !important;
}
</style>
