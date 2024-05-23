<script setup>

defineOptions({
  name: 'wTabPanel',
});

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div :id="`warp-tabpanel-${props.name}`" tabindex="-1" role="tabpanel" :aria-labelledby="`warp-tab-${props.name}`">
    <slot />
  </div>
</template>
