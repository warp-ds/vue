<script setup>
import { computed } from 'vue';
import { pill as ccPill } from '@warp-ds/css/component-classes';

const p = defineProps({
  label: String,
  canClose: Boolean,
  suggestion: Boolean,
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
      <span>{{ label }}</span>
    </button>
    <button v-if="p.canClose" type="button" :class="closeClasses" @click="$emit('close')">
      <span>x</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'wPill',
  inheritAttrs: false
};
</script>
