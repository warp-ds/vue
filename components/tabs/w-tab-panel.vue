<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div :id="`warp-tabpanel-${name}`" tabindex="-1" role="tabpanel" :aria-labelledby="`warp-tab-${name}`">
    <slot />
  </div>
</template>

<script>
export default { name: 'WTabPanel' };
</script>
