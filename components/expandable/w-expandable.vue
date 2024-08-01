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

const hasTitle = computed(() => props.title || !!slots.title);

const wrapperClasses = computed(() => [
  ccExpandable.wrapper,
  props.box && ccExpandable.box,
  props.bleed && ccExpandable.bleed,
]);

const buttonClasses = computed(() => [props.buttonClass, ccExpandable.button, props.box && ccExpandable.buttonBox]);

const chevronClasses = computed(() => [ccExpandable.chevron, !props.box && ccExpandable.chevronNonBox]);

const chevronUpClasses = computed(() => [
  ccExpandable.chevronTransform,
  !expanded.value && showChevronUp.value && ccExpandable.chevronCollapse,
]);

const chevronDownClasses = computed(() => [
  ccExpandable.chevronTransform,
  expanded.value && !showChevronUp.value && ccExpandable.chevronExpand,
]);

const expansionClasses = computed(() => [ccExpandable.expansion, !expanded && ccExpandable.expansionNotExpanded]);

const contentClasses = computed(() => [
  props.contentClass,
  props.box && ccBox.base,
  props.box && hasTitle.value && ccExpandable.contentWithTitle,
]);
</script>

<script>
export default { name: 'wExpandable' };
</script>

<template>
  <component :is="as" :class="wrapperClasses">
    <button v-if="hasTitle" type="button" :aria-expanded="expanded" :class="buttonClasses" @click="expanded = !expanded">
      <div :class="ccExpandable.title">
        <slot name="title" :expanded="expanded" />
        <span v-if="title" :class="ccExpandable.titleType">{{ title }}</span>
        <div v-if="chevron" :class="chevronClasses">
          <icon-chevron-up-16 v-if="showChevronUp" :class="chevronUpClasses" />
          <icon-chevron-down-16 v-else :class="chevronDownClasses" />
        </div>
      </div>
    </button>
    <component :is="contentComponent" @expand="emit('expand')" @collapse="emit('collapse')" :class="!props.animated && expansionClasses">
      <div v-if="expanded">
        <div :class="contentClasses">
          <slot />
        </div>
      </div>
    </component>
  </component>
</template>
