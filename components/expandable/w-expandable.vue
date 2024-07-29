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

if (!props.animated) {
  watch(expanded, async (isExpanded) => {
    await nextTick();
    emit(isExpanded ? 'expand' : 'collapse');
    expanded.value = isExpanded;
  });
}

const hasTitle = computed(() => props.title || !!slots.title);

const wrapperClasses = computed(() => [
  ccExpandable.expandable,
  props.box && ccExpandable.expandableBox,
  props.info && props.box && ccExpandable.expandableInfo,
  props.bleed && ccExpandable.expandableBleed,
]);

const buttonClasses = computed(() => [props.buttonClass, ccExpandable.button, props.box && ccExpandable.buttonBox]);

const chevronClasses = computed(() => [ccExpandable.chevron, !props.box && ccExpandable.chevronNonBox]);

const chevronUpClasses = computed(() => [ccExpandable.chevronTransform, !expanded.value && ccExpandable.chevronCollapse]);

const chevronDownClasses = computed(() => [ccExpandable.chevronTransform, expanded.value && ccExpandable.chevronExpand]);

const contentClasses = computed(() => [
  props.contentClass,
  props.box && ccBox.box,
  (props.box || props.info) && hasTitle.value && ccExpandable.paddingTop,
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
          <icon-chevron-up-16 v-if="expanded" :class="chevronUpClasses" />
          <icon-chevron-down-16 v-else :class="chevronDownClasses" />
        </div>
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
