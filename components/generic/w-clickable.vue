<template>
  <w-toggle-item v-if="radio || checkbox" class="focus-ring focus-ring-inset" :class="clickableClasses" :type="type" :label-class="{ [labelClasses]: label }" v-bind="$attrs">
    <slot />
  </w-toggle-item>
  <component v-else :is="href ? 'a' : 'button'" class="focus-ring focus-ring-inset" :class="{ [labelClasses]: label }" :href="href" :type="href ? undefined : ($attrs.type || 'button')">
    <span :class="clickableClasses" aria-hidden="true" />
    <slot />
  </component>
</template>

<script>
import wToggleItem from './w-toggle-item.vue'
import { computed } from 'vue'

const clickableClasses = 'absolute inset-0 h-full w-full appearance-none cursor-pointer'
const labelClasses = 'px-12 py-8 field-label cursor-pointer'

export default {
  name: 'wClickable',
  components: { wToggleItem },
  props: {
    href: String,
    label: Boolean,
    radio: Boolean,
    checkbox: Boolean
  },
  setup: (props) => ({
    clickableClasses,
    labelClasses,
    type: computed(() => props.radio ? 'radio' : 'checkbox')
  })
}
</script>
