<script setup>
import {
  gridLayout, tabs as ccTabs,
} from '@warp-ds/component-classes';
import {
  provide,
  computed,
  ref,
  toRef,
  watch,
  nextTick,
  onMounted,
  Fragment,
  useSlots,
  watchEffect,
} from 'vue';
import { modelProps, createModel } from 'create-v-model';
import debounce from 'femtobounce';
import { useKeydownHandler } from './util';

const props = defineProps({
  ...modelProps(),
});

const slots = useSlots();

const useGetActiveTab = (tabContainer) => () =>
  tabContainer.value?.querySelector('.active-tab');
const getChildren = (slot) =>
  slot[0].type === Fragment ? slot[0].children : slot;

const activeTab = createModel({ props });
const tabContainer = ref(null);
const wunderbar = ref(null);
const tabs = ref([]);
const registerTab = (tab) => tabs.value.push(tab);
const unregisterTab = (tab) => {
  const idx = tabs.value.indexOf(tab);
  if (idx !== -1) tabs.value.splice(idx, 1);
};
const gridsClassname = computed(
  () => gridLayout[`cols${tabs.value.length}`]
);
// SSR doesn't complete the tab-registry lifecycle before render, so we just count children and use that when numberOfTabs is 0
const slotFallback = computed(
  () => gridLayout[`cols${getChildren(slots.default()).length}`]
);
const getActiveTab = useGetActiveTab(tabContainer);
const focusActive = () => getActiveTab()?.focus();

provide('activeTab', activeTab);
provide('tab-controller', {
  registerTab,
  unregisterTab,
  onKeydown: useKeydownHandler({ tabs, activeTab, focusActive }),
});

const updateWunderbar = async () => {
  await nextTick();
  try {
    const activeEl = getActiveTab();
    const { left: parentLeft } = tabContainer.value.getBoundingClientRect();
    const { left, width } = activeEl.getBoundingClientRect();
    wunderbar.value.style.left = left - parentLeft + 'px';
    wunderbar.value.style.width = width + 'px';
  } catch (err) {
    console.warn('Problem updating tabs', err);
  }
};

onMounted(() => {
  watch(activeTab, updateWunderbar, { immediate: true });
  watchEffect(() => {
    updateWunderbar();
  });
  const resizeHandler = new ResizeObserver(debounce(updateWunderbar, 100));
  resizeHandler.observe(tabContainer.value);
});
</script>

<template>
  <nav
    :class="{
      [ccTabs.wrapperUnderlined]: true,
    }"
  >
    <div
      :class="{
        [ccTabs.tabContainer]: true,
        [gridsClassname || slotFallback]: true,
      }"
      ref="tabContainer"
      role="tablist"
    >
      <slot />
      <span :class="ccTabs.wunderbar" ref="wunderbar" />
    </div>
  </nav>
</template>

<script>
export default { name: 'wTabs' };
</script>
