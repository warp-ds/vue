<script setup>
import { computed } from 'vue';
import { pill as ccPill } from '@warp-ds/component-classes';

const p = defineProps({
  label: String,
  canClose: Boolean,
  suggestion: Boolean,
  openSRLabel: String,
  closeSRLabel: String
});

const labelClasses = computed(() => [
  ccPill.button,
  ccPill.label,
  p.suggestion ? ccPill.suggestion : ccPill.filter,
  p.canClose ? ccPill.labelWithClose : ccPill.labelWithoutClose
]);

const closeClasses = computed(() => [
  ccPill.button,
  ccPill.close,
  p.suggestion ? ccPill.suggestion : ccPill.filter
]);
</script>

<template>
  <div :class="ccPill.pill">
    <button type="button" :class="labelClasses" v-bind="$attrs">
      <span v-if="!p.suggestion" :class="ccPill.a11y">{{ p.openSRLabel || 'Åpne filter' }} </span>
      <span>{{ label }}</span>
    </button>
    <button v-if="p.canClose" type="button" :class="closeClasses" @click="$emit('close')">
      <span v-if="!p.suggestion" :class="ccPill.a11y">{{ p.closeSRLabel || 'Fjern filter' }} {{ label }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 16 16" aria-hidden="true">
        <path fill="currentColor" d="M4.03 2.97a.75.75 0 00-1.06 1.06L6.94 8l-3.97 3.97a.75.75 0 101.06 1.06L8 9.06l3.97 3.97a.75.75 0 101.06-1.06L9.06 8l3.97-3.97a.75.75 0 00-1.06-1.06L8 6.94 4.03 2.97z" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'wPill',
  inheritAttrs: false
};
</script>
