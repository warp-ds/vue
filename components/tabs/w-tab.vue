<script setup>
import { tab as ccTab } from '@warp-ds/component-classes';
import { inject, computed, onBeforeUnmount } from 'vue';

const props = defineProps({
  label: String,
  name: {
    type: String,
    required: true,
  },
});

const controller = inject('tab-controller');
const activeTab = inject('activeTab');
const contained = inject('contained');

const isActive = computed(() => props.name === activeTab.value);
const setActive = () => (activeTab.value = props.name);

controller.registerTab(props.name);
onBeforeUnmount(() => {
  controller?.unregisterTab?.(props.name);
});

const tabClasses = computed(() => ({
  [ccTab.tab]: true,
  ['active-tab']: isActive.value,
  [ccTab.tabActive]: isActive.value,
}));

const iconClasses = computed(() => ({
  [ccTab.icon]: true,
  [ccTab.iconUnderlined]: true,
  [isActive.value
    ? ccTab.iconUnderlinedActive
    : ccTab.iconUnderlinedInactive]: true,
}));

const contentClasses = computed(() => ({
  [ccTab.contentUnderlined]: true,
  [isActive.value
    ? ccTab.contentUnderlinedActive
    : ccTab.contentUnderlinedInactive]: !contained.value,
}));
</script>

<template>
  <button
    :class="tabClasses"
    @click="setActive"
    role="tab"
    :id="`warp-tab-${name}`"
    :aria-selected="isActive"
    :aria-controls="isActive ? `warp-tabpanel-${name}` : undefined"
    :tabindex="isActive ? 0 : -1"
    @keydown="onKeydown"
  >
    <span v-if="$slots.default" :class="iconClasses">
      <slot />
    </span>
    <span :class="contentClasses">
      {{ label }}
      <slot name="label" />
    </span>
  </button>
</template>

<script>
export default { name: 'wTab' };
</script>
