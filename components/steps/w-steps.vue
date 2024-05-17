<script setup>
import { computed, ref, provide, watchEffect } from 'vue';

import { steps as ccSteps } from '@warp-ds/css/component-classes';

const props = defineProps({
  horizontal: Boolean,
  right: Boolean,
});

const vertical = ref(!props.horizontal);
const left = ref(!props.right);

provide('steps-vertical', vertical);
provide('steps-left', left);

const stepsClasses = computed(() => ({
  [ccSteps.steps]: true,
  [ccSteps.stepsHorizontal]: props.horizontal,
}));

watchEffect(() => {
  vertical.value = !props.horizontal;
  left.value = !props.right;
});
</script>

<template>
  <ul :class="stepsClasses">
    <slot />
  </ul>
</template>

<script>
export default { name: 'wSteps' };
</script>
