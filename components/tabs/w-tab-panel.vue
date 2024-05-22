<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<script>
export default { name: 'wTabPanel' };
</script>

<template>
  <div :id="`warp-tabpanel-${name}`" tabindex="-1" role="tabpanel" :aria-labelledby="`warp-tab-${name}`">
    <slot />
  </div>
</template>
