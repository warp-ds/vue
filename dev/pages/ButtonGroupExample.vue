<script setup>
import { ref, reactive } from 'vue';

import { wButtonGroup, wButtonGroupItem, wClickable } from '#components';
import { checkbox, radio, useIsActive, buildCheckboxState } from '#dev-util';

const radioModel = ref('foo');
const alert = () => window.alert('Hello Warp!');

const type = reactive({ active: 'Radio' });
const active = useIsActive(type);
const typeControls = [
  { name: 'Radio', radio },
  { name: 'Button', radio },
];

const modifierControls = [
  { name: 'Outlined', checkbox },
  { name: 'Raised', checkbox },
  { name: 'Vertical', checkbox },
];
const modifiers = reactive(buildCheckboxState({ controls: modifierControls }));
</script>

<template>
  <div>
    <component-title title="Button Group" />

    <token :state="[type, radioModel, modifiers]">
      <w-button-group :outlined="modifiers.Outlined" :raised="modifiers.Raised" :vertical="modifiers.Vertical">
        <w-button-group-item :selected="active('Radio') && radioModel === 'foo'">
          <w-clickable v-if="active('Radio')" v-model="radioModel" label radio value="foo">Foo</w-clickable>
          <w-clickable v-else label @click="alert">Foo</w-clickable>
        </w-button-group-item>
        <w-button-group-item :selected="active('Radio') && radioModel === 'bar'">
          <w-clickable v-if="active('Radio')" v-model="radioModel" label radio value="bar">Bar</w-clickable>
          <w-clickable v-else label @click="alert">Bar</w-clickable>
        </w-button-group-item>
        <w-button-group-item :selected="active('Radio') && radioModel === 'baz'">
          <w-clickable v-if="active('Radio')" v-model="radioModel" label radio value="baz">Baz</w-clickable>
          <w-clickable v-else label @click="alert">Baz</w-clickable>
        </w-button-group-item>
      </w-button-group>
    </token>

    <demo-controls y>
      <demo-control label="Type" :controls="typeControls" :state="type" />
      <demo-control label="Modifiers" :controls="modifierControls" :state="modifiers" />
    </demo-controls>
  </div>
</template>
