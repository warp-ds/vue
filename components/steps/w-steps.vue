<script setup>
import { ref, provide, watchEffect } from 'vue';

const props = defineProps({
  horizontal: Boolean,
  right: Boolean,
});

const vertical = ref(!props.horizontal);
const left = ref(!props.right);

provide('steps-vertical', vertical);
provide('steps-left', left);

watchEffect(() => {
  vertical.value = !props.horizontal;
  left.value = !props.right;
});
</script>

<template>
  <div class="w-full" :class="{ flex: horizontal }">
    <slot />
  </div>
</template>

<script>
export default { name: 'wSteps' };
</script>
