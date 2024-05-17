<script setup>
import { ref, computed, watch, nextTick, useSlots } from 'vue';

import { expandable as ccExpandable, box as ccBox } from '@warp-ds/css/component-classes';
import IconChevronDown16 from '@warp-ds/icons/vue/chevron-down-16';
import IconChevronUp16 from '@warp-ds/icons/vue/chevron-up-16';
import { modelProps, createModel } from 'create-v-model';

import { wExpandTransition as expandTransition } from '#generics';
import { absentProp } from '#util';

const props = defineProps({
  title: String,
  box: Boolean,
  bleed: Boolean,
  info: Boolean,
  buttonClass: String,
  contentClass: String,
  chevron: { type: Boolean, default: true },
  as: { type: String, default: 'div' },
  animated: Boolean,
  ...modelProps({ modelDefault: absentProp }),
});
const emit = defineEmits(['expand', 'collapse']);
const slots = useSlots();

const expanded = props.modelValue === absentProp ? ref(false) : createModel({ props, emit });
const contentComponent = computed(() => (props.animated ? expandTransition : 'div'));
const showChevronUp = ref(expanded.value);
// wExpandTransition emits its own events and we just bubble them, but for a normal DOM element we need to create them
if (!props.animated) {
  watch(expanded, async (isExpanded) => {
    await nextTick();
    emit(isExpanded ? 'expand' : 'collapse');
  });
}

// We need a slight delay for the animation since it has a transition-duration of 150ms:
watch(expanded, (state) => {
  setTimeout(() => {
    showChevronUp.value = state;
  }, 200);
});

const hasTitle = computed(() => props.title || slots.title);

const wrapperClasses = computed(() => ({
  [ccExpandable.expandable]: true,
  [ccExpandable.expandableBox]: props.box || props.info,
  [ccExpandable.expandableBleed]: props.bleed,
}));

const buttonClasses = computed(() => ({
  [props.buttonClass || '']: true,
  [ccExpandable.button]: true,
  [ccExpandable.buttonBox]: props.box || props.info,
}));

const chevronClasses = computed(() => ({
  [ccExpandable.chevron]: true,
  [props.box || props.info ? ccExpandable.chevronBox : ccExpandable.chevronNonBox]: true,
}));

const chevronUpClasses = computed(() => ({
  [ccExpandable.chevronTransform]: true,
  [ccExpandable.chevronCollapse]: !expanded.value && showChevronUp.value,
}));

const chevronDownClasses = computed(() => ({
  [ccExpandable.chevronTransform]: true,
  [ccExpandable.chevronExpand]: expanded.value && !showChevronUp.value,
}));

const contentClasses = computed(() => ({
  [props.contentClass || '']: true,
  [ccBox.box]: props.box || props.info,
  [ccExpandable.paddingTop]: hasTitle.value && (props.box || props.info),
}));
</script>

<template>
  <component :is="as" :class="wrapperClasses">
    <button v-if="hasTitle" type="button" :aria-expanded="expanded" :class="buttonClasses" @click="expanded = !expanded">
      <slot name="title" :expanded="expanded" />
      <span v-if="title" :class="ccExpandable.expandableTitle">{{ title }}</span>
      <div v-if="chevron" :class="chevronClasses">
        <icon-chevron-up-16 v-if="showChevronUp" :class="chevronUpClasses" />
        <icon-chevron-down-16 v-else :class="chevronDownClasses" />
      </div>
    </button>
    <component :is="contentComponent" @expand="emit('expand')" @collapse="emit('collapse')">
      <div v-if="expanded">
        <div :class="contentClasses">
          <slot />
        </div>
      </div>
    </component>
  </component>
</template>

<script>
export default { name: 'wExpandable' };
</script>
