<template>
  <div class="input-toggle h-20 w-20 pointer-events-none" aria-hidden="true">
    <w-toggle-item class="hidden" label-class="-mt-2" :type="type" v-bind="$attrs" />
  </div>
</template>

<script>
import wToggleItem from './w-toggle-item.vue'
import { computed } from 'vue'

export default {
  name: 'wDeadToggle',
  components: { wToggleItem },
  props: {
    radio: Boolean,
    checkbox: Boolean,
  },
  setup: (props) => ({
    type: computed(() => props.radio ? 'radio' : 'checkbox')
  })
}
</script>
