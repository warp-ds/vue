<script setup>
import { computed } from 'vue';

import { deadToggle as ccDeadToggle } from '@warp-ds/css/component-classes';

import wToggleItem from './w-toggle-item.vue';

const props = defineProps({
  radio: Boolean,
  checkbox: Boolean,
});
const type = computed(() => (props.radio ? 'radio' : 'checkbox'));

const labelClasses = computed(() => ({
  [ccDeadToggle.labelRadio]: props.radio,
  [ccDeadToggle.labelCheckbox]: props.checkbox,
  [ccDeadToggle.labelVue]: true,
}));
</script>

<script>
export default { name: 'wDeadToggle' };
</script>

<template>
  <div :class="ccDeadToggle.wrapper" aria-hidden="true">
    <w-toggle-item :class="ccDeadToggle.inputVue" :label-class="labelClasses" :type="type" v-bind="$attrs" />
  </div>
</template>
