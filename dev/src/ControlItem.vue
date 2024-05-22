<script setup>
import { computed } from 'vue';

import { wButtonGroupItem, wClickable } from '#components';

const props = defineProps({
  state: null,
  name: String,
  radio: Boolean,
  checkbox: Boolean,
  button: Boolean,
});

const stateLocation = computed(() => (props.radio ? 'active' : props.name));
const model = props.button
  ? null
  : computed({
      get: () => props.state[stateLocation.value],
      // eslint-disable-next-line vue/no-mutating-props
      set: (v) => (props.state[stateLocation.value] = v),
    });
const selected = props.button ? null : computed(() => (props.radio ? model.value === props.name : model.value));
</script>

<script>
export default { inheritAttrs: false };
</script>

<template>
  <w-button-group-item :selected="selected">
    <w-clickable v-if="button" label v-bind="$attrs">{{ name }}</w-clickable>
    <w-clickable v-else label v-bind="$props" v-model="model" :value="name">{{ name }}</w-clickable>
  </w-button-group-item>
</template>
