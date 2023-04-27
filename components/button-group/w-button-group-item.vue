<script setup>
import { inject, computed } from 'vue'

const props = defineProps({ selected: Boolean });
const outlined = inject('outlined', false);
const vertical = inject('vertical', false);

const wrapperClass = computed(() => [{
  'relative i-text-$color-button-group-text i-bg-$color-button-group-background hover:i-bg-$color-button-group-background-hover active:i-border-$color-button-group-border-active active:i-text-$color-button-group-text-active active:i-bg-$color-button-group-background-active': true,
  'first:rounded-lt-4 first:rounded-rt-4 last:rounded-lb-4 last:rounded-rb-4': vertical.value,
  'first:rounded-lt-4 first:rounded-lb-4 last:rounded-rt-4 last:rounded-rb-4': !vertical.value,
  'border hover:z-30 i-border-$color-button-group-border hover:i-border-$color-button-group-border-hover active:i-border-$color-button-group-border-active': outlined.value,
  [vertical.value ? '-mb-1 last:mb-0' : '-mr-1 last:mr-0']: outlined.value,
  [vertical.value ? 'px-1 pt-1 last:pb-1 -mb-1 last:mb-0' : 'py-1 pl-1 last:pr-1 -mr-1 last:mr-0']: !outlined.value,
  'z-30 i-text-$color-button-group-text-active! i-bg-$color-button-group-background-active! hover:i-bg-$color-button-group-background-active-hover! i-border-$color-button-group-border-active': props.selected,
}]);
</script>

<template>
  <div :class="wrapperClass">
    <slot />
  </div>
</template>

<script>
export default { name: 'wButtonGroupItem' }
</script>
