<script setup>
import ControlItem from './ControlItem.vue';

import { wButtonGroup } from '#components';

defineProps({ state: null, controls: Array, label: String });
</script>

<template>
  <div>
    <h2 class="text-12 font-bold" v-if="label">{{ label }}</h2>
    <w-button-group outlined>
      <control-item v-for="(c, index) in controls" :key="`control-${index}`" v-bind="c" :state="state" />
    </w-button-group>
  </div>
</template>
