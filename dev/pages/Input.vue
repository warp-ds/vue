<script setup>
import { ref } from 'vue'
import { wInput, wAffix } from '#components'

const inputModel = ref('');

const placeholderModel = ref('');

const handleClear = (el) => {
  inputModel.value = ''
  el.focus()
}

// const inputModel = ref('')
const numericInputModel = ref('')

const moneyMask = { numeral: true, numeralPositiveOnly: true, numeralIntegerScale: 8, delimiter: ' ' }
</script>

<template>
  <div>
    <component-title title="Input" />

    <token :state="inputModel">
      <w-input v-model="inputModel" class="mb-16" #suffix="{ inputElement }" label="A required input with a clear button" hint="A hint" required>
        <w-affix suffix clear @click="handleClear(inputElement)" />
      </w-input>
    </token>

    <token :state="inputModel">
      <w-input placeholder="I am placeholder"  #prefix v-model="inputModel" label="I have a prefix">
        <w-affix prefix label="+47" />
      </w-input>
    </token>

    <token :state="inputModel">
      <w-input #prefix #suffix v-model="inputModel" label="I have a prefix">
        <w-affix prefix label="+47" />
        <w-affix suffix clear />
      </w-input>
    </token>

    <token :state="inputModel">
      <w-input #suffix v-model="inputModel" label="I have a suffix">
        <w-affix suffix label="NOK" />
      </w-input>
    </token>

    <token :state="inputModel">
      <w-input #suffix :disabled=true v-model="inputModel" label="I am disabled">
        <w-affix suffix label="NOK" />
      </w-input>
    </token>

    <token :state="inputModel">
      <w-input readOnly value="I'm read only" v-model="placeholderModel" label="I am read only">
        <w-affix suffix label="NOK" />
      </w-input>
    </token>

    <token :state="numericInputModel">
      <w-input placeholder="I am placeholder"  v-model.number="numericInputModel" optional number type="text" inputmode="numeric" :mask="moneyMask" label="A masked (money) input" />
    </token>
  </div>
</template>