<script setup>
import { provide, computed, ref, watch, nextTick, onMounted, Fragment, useSlots, watchEffect } from 'vue';

import { gridLayout, tabs as ccTabs } from '@warp-ds/css/component-classes';
import { modelProps, createModel } from 'create-v-model';
import debounce from 'femtobounce';

import { useKeydownHandler } from './util';

const props = defineProps({
  ...modelProps(),
});

const slots = useSlots();

const useGetActiveTab = (container) => () => container.value?.querySelector('.active-tab');
const getChildren = (slot) => (slot[0].type === Fragment ? slot[0].children : slot);

const activeTab = createModel({ props });
const tabsRef = ref(null);
const selectionIndicatorRef = ref(null);
const tabs = ref([]);
const registerTab = (tab) => tabs.value.push(tab);
const unregisterTab = (tab) => {
  const idx = tabs.value.indexOf(tab);
  if (idx !== -1) tabs.value.splice(idx, 1);
};
const gridsClassname = computed(() => gridLayout[`cols${tabs.value.length}`]);
// SSR doesn't complete the tab-registry lifecycle before render, so we just count children and use that when numberOfTabs is 0
const slotFallback = computed(() => gridLayout[`cols${getChildren(slots.default()).length}`]);
const getActiveTab = useGetActiveTab(tabsRef);
const focusActive = () => getActiveTab()?.focus();

provide('activeTab', activeTab);
provide('tab-controller', {
  registerTab,
  unregisterTab,
  onKeydown: useKeydownHandler({ tabs, activeTab, focusActive }),
});

const updateSelectionIndicator = async () => {
  await nextTick();
  try {
    const activeEl = getActiveTab();
    const { left: parentLeft } = tabsRef.value.getBoundingClientRect();
    const { left, width } = activeEl.getBoundingClientRect();
    selectionIndicatorRef.value.style.left = left - parentLeft + 'px';
    selectionIndicatorRef.value.style.width = width + 'px';
  } catch (err) {
    console.warn('Problem updating tabs', err);
  }
};

onMounted(() => {
  watch(activeTab, updateSelectionIndicator, { immediate: true });
  watchEffect(() => {
    updateSelectionIndicator();
  });
  const resizeHandler = new ResizeObserver(debounce(updateSelectionIndicator, 100));
  resizeHandler.observe(tabsRef.value);
});
</script>

<script>
export default { name: 'wTabs' };
</script>

<template>
  <nav :class="ccTabs.wrapper">
    <div ref="tabsRef" :class="[ccTabs.container, gridsClassname || slotFallback]" role="tablist">
      <slot />
      <span ref="selectionIndicatorRef" :class="ccTabs.selectionIndicator" />
    </div>
  </nav>
</template>
