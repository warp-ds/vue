<script setup>
import { reactive } from 'vue';

import { wBox } from '#components';
import { checkbox, buildCheckboxState } from '#dev-util';

const variants = [
  { name: 'Info', checkbox },
  { name: 'Neutral', checkbox },
  { name: 'Bordered', checkbox },
];

const options = [{ name: 'Bleed', checkbox }];

const state = reactive(
  buildCheckboxState({
    controls: [...variants, ...options],
    active: 'Neutral',
  }),
);
</script>

<template>
  <div>
    <component-title title="Box" />

    <token :state="[state]">
      <w-box :bleed="state.Bleed" :bordered="state.Bordered" :info="state.Info" :neutral="state.Neutral">
        <h3 class="h4">I am some content</h3>
      </w-box>
    </token>

    <demo-controls y>
      <demo-control label="Variants" :controls="variants" :state="state" />
      <demo-control label="Options" :controls="options" :state="state" />
    </demo-controls>
  </div>
</template>
