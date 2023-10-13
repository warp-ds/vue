<script setup>
import { ref, computed, watch, nextTick, useSlots } from 'vue'
import { modelProps, createModel } from 'create-v-model'
import { absentProp } from '#util'
import { wExpandTransition as expandTransition } from '#generics'
import { expandable as ccExpandable, box as ccBox } from '@warp-ds/css/component-classes'
import { IconChevronDown16 } from "@warp-ds/icons/vue";

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
  ...modelProps({ modelDefault: absentProp })
})
const emit = defineEmits(['expand', 'collapse'])
const slots = useSlots()

const expanded = (props.modelValue === absentProp) ? ref(false) : createModel({ props, emit })
const contentComponent = computed(() => props.animated ? expandTransition : 'div')
// wExpandTransition emits its own events and we just bubble them, but for a normal DOM element we need to create them
if (!props.animated) {
  watch(expanded, async (isExpanded) => {
    await nextTick()
    emit(isExpanded ? 'expand' : 'collapse')
  })
}

const hasTitle = computed(() => props.title || slots.title)

const wrapperClasses = computed(() => ({
  [ccExpandable.expandable]: true,
  [ccExpandable.expandableBox]: props.box || props.info,
  [ccExpandable.expandableBleed]: props.bleed
}))

const buttonClasses = computed(() => ({
  [props.buttonClass || '']: true,
  [ccExpandable.button]: true,
  [ccExpandable.buttonBox]: props.box || props.info,
}))

const chevronClasses = computed(() => ({
  [ccExpandable.chevron]: true,
  [(props.box || props.info) ? ccExpandable.chevronBox : ccExpandable.chevronNonBox]: true,
  [ccExpandable.chevronExpanded]: expanded.value,
}))

const contentClasses = computed(() => ({
  [props.contentClass || '']: true,
  [ccBox.box]: props.box || props.info,
  [ccExpandable.paddingTop]: hasTitle.value && (props.box || props.info),
}))
</script>

<template>
  <component :is="as" :class="wrapperClasses">
    <button v-if="hasTitle" type="button" :aria-expanded="expanded" :class="buttonClasses" @click="expanded = !expanded">
      <slot name="title" :expanded="expanded" />
      <span :class="ccExpandable.expandableTitle" v-if="title">{{ title }}</span>
      <div :class="chevronClasses" v-if="chevron">
        <icon-chevron-down-16 />
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
export default { name: 'wExpandable' }
</script>