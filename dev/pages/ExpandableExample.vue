<script setup>
import { ref, reactive } from 'vue';

import { wExpandable } from '#components';
import { checkbox, buildCheckboxState } from '#dev-util';

const expanded = ref(false);
const modifierControls = [
  { name: 'Box', checkbox },
  { name: 'Bleed', checkbox },
  { name: 'Info', checkbox },
  { name: 'Animated', checkbox },
];
const modifiers = reactive(buildCheckboxState({ controls: modifierControls }));
</script>

<template>
  <div>
    <component-title title="Expandable" />

    <token :state="[modifiers, expanded]">
      <w-expandable
        v-model="expanded"
        :box="modifiers.Box"
        :bleed="modifiers.Bleed"
        :info="modifiers.Info"
        :animated="modifiers.Animated"
        :title="`Click to ${expanded ? 'collapse' : 'expand'}`">
        <h2>Hello Warp!</h2>
      </w-expandable>
    </token>

    <demo-controls>
      <demo-control label="Modifiers" :controls="modifierControls" :state="modifiers" />
    </demo-controls>
  </div>
</template>
