<script setup>
import { tabs as ccTabs } from '@warp-ds/component-classes';
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
} from 'vue';
import { modelProps, createModel } from 'create-v-model';
import debounce from 'femtobounce';
import { useKeydownHandler } from './util';

const props = defineProps({
  contained: Boolean,
  ...modelProps(),
});

const slots = useSlots();

const useGetActiveTab = (tabContainer) => () =>
  tabContainer.value?.querySelector('.active-tab');
const getChildren = (slot) =>
  slot[0].type === Fragment ? slot[0].children : slot;

// Todo: Make a better solution
const colsClassName = [
  'grid-cols-1',
  'grid-cols-2',
  'grid-cols-3',
  'grid-cols-4',
  'grid-cols-5',
  'grid-cols-6',
  'grid-cols-7',
  'grid-cols-8',
  'grid-cols-9',
];

const activeTab = createModel({ props });
const tabContainer = ref(null);
const wunderbar = ref(null);
const tabs = ref([]);
const registerTab = (tab) => tabs.value.push(tab);
const unregisterTab = (tab) => {
  const idx = tabs.value.indexOf(tab);
  if (idx !== -1) tabs.value.splice(idx, 1);
};
const gridsClassname = computed(() => colsClassName[tabs.value.length - 1]);
// SSR doesn't complete the tab-registry lifecycle before render, so we just count children and use that when numberOfTabs is 0
const slotFallback = computed(
  () => colsClassName[getChildren(slots.default()).length - 1]
);
const getActiveTab = useGetActiveTab(tabContainer);
const focusActive = () => getActiveTab()?.focus();

provide('tab-controller', {
  registerTab,
  unregisterTab,
  onKeydown: useKeydownHandler({ tabs, activeTab, focusActive }),
});
provide('activeTab', activeTab);
provide('contained', toRef(props, 'contained'));

const updateWunderbar = async () => {
  if (props.contained) return;
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
  watch(() => props.contained, updateWunderbar);
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
      <span v-if="!contained" :class="ccTabs.wunderbar" ref="wunderbar" />
    </div>
  </nav>
</template>

<script>
export default { name: 'wTabs' };
</script>
