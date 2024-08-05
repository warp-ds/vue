<script setup>
import { inject, computed, onBeforeUnmount } from 'vue';

import { tab as ccTab } from '@warp-ds/css/component-classes';

const props = defineProps({
  label: String,
  name: {
    type: String,
    required: true,
  },
});

const controller = inject('tab-controller');
const activeTab = inject('activeTab');

const isActive = computed(() => props.name === activeTab.value);
const setActive = () => (activeTab.value = props.name);

controller.registerTab(props.name);
onBeforeUnmount(() => {
  controller?.unregisterTab?.(props.name);
});

const tabClasses = computed(() => [ccTab.base, isActive.value && 'active-tab', isActive.value ? ccTab.active : ccTab.inactive]);
</script>

<script>
export default { name: 'wTab' };
</script>

<template>
  <button
    :id="`warp-tab-${name}`"
    :class="tabClasses"
    role="tab"
    :aria-selected="isActive"
    :aria-controls="isActive ? `warp-tabpanel-${name}` : undefined"
    :tabindex="isActive ? 0 : -1"
    @click="setActive"
    @keydown="controller.onKeydown">
    <span v-if="$slots.default" :class="ccTab.icon">
      <slot />
    </span>
    <span :class="ccTab.contentUnderlined">
      {{ label }}
      <slot name="label" />
    </span>
  </button>
</template>
