<script setup>
import { ref, reactive, watch } from 'vue'
import { radio, useIsActive } from '#dev-util'
import { wToggle, wButton } from '#components'

const toggleModel = ref([])
const invalidToggleModel = ref([1])
const disabledToggleModel = ref([2])
const isJustified = ref(false)
const multiToggleModelSmall = ref([])
const multiToggleModel = ref([])

const toggles = [
  { label: 'One', value: 1, 'data-test': 'toggle:1' },
  { label: 'Two', value: 2, 'data-test': 'toggle:2' },
]

const variants = reactive({ active: 'Checkbox' })
const variantControls = [
  { name: 'Checkbox', radio },
  { name: 'Radio', radio },
]
const active = useIsActive(variants)

const changeToggleModel = () => {
  if (active('Radio')) {
    toggleModel.value = '';
    invalidToggleModel.value = '1';
    disabledToggleModel.value = '2';
  }
  else {
    toggleModel.value = [];
    invalidToggleModel.value = [1];
    disabledToggleModel.value = [2];
  }
}
watch(() => variants.active, changeToggleModel)
</script>

<template>
  <div>
    <component-title title="Toggle" />

    <token :state="[variants, toggleModel]">
      <w-toggle :radio="active('Radio')" :checkbox="active('Checkbox')" v-model="toggleModel" label="A very toggly label" :toggles="toggles" />
    </token>
    <token :state="[variants, toggleModel]">
      <w-toggle :radio="active('Radio')" :checkbox="active('Checkbox')" disabled v-model="disabledToggleModel" label="A very DISABLED non-toggly label" :toggles="toggles" />
    </token>
    <token :state="[variants, toggleModel]">
      <w-toggle :radio="active('Radio')" :checkbox="active('Checkbox')" invalid v-model="invalidToggleModel" label="A very INVALID toggly label" :toggles="toggles" />
    </token>
    <div>
    <token :state="[variants, toggleModel]">
      <w-button aria-controls="radio-button-group" class="mt-16" small utility @click="isJustified = !isJustified">{{ isJustified ? 'Unjustify radio button group' : 'Justify radio button group' }}</w-button>
      <w-toggle id="radio-button-group-small" small radio-button :equal-width="isJustified" v-model="multiToggleModelSmall" label="A very toggly SMALL label" :toggles="toggles" />
      <w-toggle id="radio-button-group" radio-button :equal-width="isJustified" v-model="multiToggleModel" label="A very toggly label" :toggles="toggles" />
    </token>
  </div>
    <demo-controls>
      <demo-control label="Variants" :controls="variantControls" :state="variants" />
    </demo-controls>
  </div>
</template>
