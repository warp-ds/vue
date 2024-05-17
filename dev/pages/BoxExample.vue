<script setup>
import { reactive } from 'vue';

import { wBox, wClickable } from '#components';
import { checkbox, buildCheckboxState } from '#dev-util';

const variants = [
  { name: 'Info', checkbox },
  { name: 'Neutral', checkbox },
  { name: 'Bordered', checkbox },
];

const options = [
  { name: 'Bleed', checkbox },
  { name: 'Clickable', checkbox },
];

const state = reactive(
  buildCheckboxState({
    controls: [...variants, ...options],
    active: 'Neutral',
  }),
);
const handleClick = () => alert('Hello Warp!');
</script>

<template>
  <div>
    <component-title title="Box" />

    <token :state="[state]">
      <w-box :bleed="state.Bleed" :bordered="state.Bordered" :info="state.Info" :neutral="state.Neutral" :clickable="state.Clickable">
        <h3 v-if="!state.Clickable" class="h4">I am some content</h3>
        <w-clickable v-else @click="handleClick"><h3 class="h4 mb-0">I am some clickable content</h3></w-clickable>
      </w-box>
    </token>

    <demo-controls y>
      <demo-control label="Variants" :controls="variants" :state="state" />
      <demo-control label="Options" :controls="options" :state="state" />
    </demo-controls>
  </div>
</template>
