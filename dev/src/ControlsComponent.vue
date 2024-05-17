<script setup>
defineProps({ x: Boolean, y: Boolean });
</script>

<template>
  <div class="border s-border s-bg-subtle mb-24 p-16 rounded-8 overflow-x-auto" :class="{ 'space-y-24': y, 'space-x-24': x }">
    <slot />
  </div>
</template>
