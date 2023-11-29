<template>
  <component :is="label ? 'div' : 'button'" :class="{ [c.wrapper]: true, [label ? c.wrapperWithIcon : c.wrapperWithLabel]: true }">
    <icon-close-16 v-if="clear" />
    <icon-search-16 v-else-if="search" />
    <span :class="c.label" v-else-if="label">{{ label }}</span>
  </component>
</template>

<script>
import { onMounted } from 'vue'
import { suffix as c } from '@warp-ds/css/component-classes'
import IconClose16 from '@warp-ds/icons/vue/close-16'
import IconSearch16 from "@warp-ds/icons/vue/search-16"

export default {
  name: 'wSuffix',
  props: {
    clear: Boolean,
    search: Boolean,
    label: String
  },
  setup: () => {
    onMounted(() => {
      console.warn('w-suffix is deprecated and will be removed in a future version, please switch to w-affix')
    })
    return { c }
  }
}
</script>
