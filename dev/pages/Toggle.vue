<script setup>
import { ref, reactive, watch } from 'vue'
import { radio, useIsActive } from '#dev-util'
import { wToggle, wButton } from '#components'

const toggleModel = ref([])
const invalidToggleModel = ref([1])
const disabledToggleModel = ref([2])
const isJustified = ref(false)
const multiToggleModel = ref('')

const toggles = [
  { label: 'One', value: 1, 'data-test': 'toggle:1' },
  { label: 'Two', value: 2, 'data-test': 'toggle:2' },
]

const indeterminateToggle = [
  { label: 'One', value: 1, 'data-test-indeterminate': 'toggle:1' },
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
    <demo-controls>
      <demo-control label="Variants" :controls="variantControls" :state="variants" />
    </demo-controls>
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
        <w-toggle radio-button :equal-width="isJustified" v-model="multiToggleModel" label="A very toggly label" :toggles="toggles" />
        <w-button class="mt-16" small utility @click="isJustified = !isJustified">{{ isJustified ? 'Unjustify' : 'Justify' }}</w-button>
      </token>
    </div>

    <token>
      <w-toggle indeterminate checkbox label="An indeterminate label" :toggles="indeterminateToggle" />
    </token>
    <token>
      <w-toggle indeterminate disabled checkbox label="An indeterminate and disabled label" :toggles="indeterminateToggle" />
    </token>
  </div>
</template>
