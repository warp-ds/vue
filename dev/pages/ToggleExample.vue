<script setup>
import { ref, reactive, watch } from 'vue';

import { wToggle, wButton } from '#components';
import { radio, useIsActive } from '#dev-util';

const toggleModel = ref([]);
const invalidToggleModel = ref([1]);
const disabledToggleModel = ref([2]);
const indeterminateToggleModel = ref();
const indeterminateInvalidToggleModel = ref();
const isJustified = ref(false);
const multiToggleModelSmall = ref([]);
const multiToggleModel = ref([]);

const toggles = [
  { label: 'One', value: 1, 'data-test': 'toggle:1' },
  { label: 'Two', value: 2, 'data-test': 'toggle:2' },
];

const indeterminateToggle = [{ label: 'All selected', value: 1, 'data-test-indeterminate': 'toggle:1' }];

const variants = reactive({ active: 'Checkbox' });
const variantControls = [
  { name: 'Checkbox', radio },
  { name: 'Radio', radio },
];
const active = useIsActive(variants);

const changeToggleModel = () => {
  if (active('Radio')) {
    toggleModel.value = '';
    invalidToggleModel.value = '1';
    disabledToggleModel.value = '2';
  } else {
    toggleModel.value = [];
    invalidToggleModel.value = [1];
    disabledToggleModel.value = [2];
  }
};
watch(() => variants.active, changeToggleModel);
</script>

<template>
  <div>
    <component-title title="Toggle" />
    <demo-controls>
      <demo-control label="Variants" :controls="variantControls" :state="variants" />
    </demo-controls>
    <token :state="[variants, toggleModel]">
      <w-toggle
        v-model="toggleModel"
        :radio="active('Radio')"
        :checkbox="active('Checkbox')"
        label="A very toggly label"
        :toggles="toggles" />
    </token>
    <token :state="[variants, toggleModel]">
      <w-toggle
        v-model="disabledToggleModel"
        :radio="active('Radio')"
        :checkbox="active('Checkbox')"
        disabled
        label="A very DISABLED non-toggly label"
        :toggles="toggles" />
    </token>
    <token :state="[variants, toggleModel]">
      <w-toggle
        v-model="invalidToggleModel"
        :radio="active('Radio')"
        :checkbox="active('Checkbox')"
        invalid
        label="A very INVALID toggly label"
        :toggles="toggles" />
    </token>
    <div>
      <token :state="[variants, toggleModel]">
        <w-button aria-controls="radio-button-group" class="mt-16" small utility @click="isJustified = !isJustified">{{
          isJustified ? 'Unjustify radio button group' : 'Justify radio button group'
        }}</w-button>
        <w-toggle
          id="radio-button-group-small"
          v-model="multiToggleModelSmall"
          small
          radio-button
          :equal-width="isJustified"
          label="A very toggly SMALL label"
          :toggles="toggles" />
        <w-toggle
          id="radio-button-group"
          v-model="multiToggleModel"
          radio-button
          :equal-width="isJustified"
          label="A very toggly label"
          :toggles="toggles" />
      </token>
    </div>

    <token>
      <w-toggle
        v-model="indeterminateToggleModel"
        :indeterminate="!indeterminateToggleModel"
        checkbox
        label="An indeterminate label"
        :toggles="indeterminateToggle" />
    </token>
    <token>
      <w-toggle
        v-model="indeterminateInvalidToggleModel"
        :indeterminate="!indeterminateInvalidToggleModel"
        invalid
        checkbox
        label="An indeterminate label"
        :toggles="indeterminateToggle" />
    </token>
    <token>
      <w-toggle indeterminate disabled checkbox label="An indeterminate and disabled label" :toggles="indeterminateToggle" />
    </token>
  </div>
</template>
