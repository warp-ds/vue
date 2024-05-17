<script setup>
import { inject, computed } from 'vue';

import { buttonGroupItem as ccButtonGroupItem } from '@warp-ds/css/component-classes';

const props = defineProps({ selected: Boolean });
const outlined = inject('outlined', false);
const vertical = inject('vertical', false);

const outlinedClass = computed(() => [
  ccButtonGroupItem.outlined,
  vertical.value ? ccButtonGroupItem.outlinedVertical : ccButtonGroupItem.outlinedHorizontal,
  props.selected ? ccButtonGroupItem.outlinedSelected : '',
]);

const outlineResetClass = computed(() => [
  vertical.value ? ccButtonGroupItem.outlinedVerticalResets : ccButtonGroupItem.outlinedHorizontalResets,
]);

const wrapperClass = computed(() => [
  ccButtonGroupItem.wrapper,
  outlined.value ? outlinedClass.value : outlineResetClass.value,
  props.selected ? ccButtonGroupItem.selected : '',
]);
</script>

<template>
  <div :class="wrapperClass">
    <slot />
  </div>
</template>

<script>
export default { name: 'WButtonGroupItem' };
</script>
