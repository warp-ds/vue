<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    tabindex="-1"
    role="tabpanel"
    :id="`warp-tabpanel-${name}`"
    :aria-labelledby="`warp-tab-${name}`"
  >
    <slot />
  </div>
</template>

<script>
export default { name: 'wTabPanel' };
</script>
