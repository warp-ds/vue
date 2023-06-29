<template>
  <component :is="as" :class="{[ccInput.wrapper]: true, [$attrs.class || '']: true}" :role="role" v-bind="wrapperAria">
    <component :is="labelType" v-if="label" :class="{[ccLabel.label]: true, [ccLabel.labelInvalid]: hasErrorMessage}" :id="labelId" :for="labelFor" :role="valueOrUndefined(labelLevel, 'heading')" :aria-level="valueOrUndefined(labelLevel, labelLevel)">{{ label }}<span v-if="optional" :class="ccLabel.optional"> (valgfritt)</span></component>
    <slot :triggerValidation="triggerValidation" :labelFor="id" :labelId="labelId" :aria="aria" :hasValidationErrors="hasValidationErrors" />
    <slot name="control" :form="collector" />
    <div :class="{[ccHelpText.helpText]: true, [ccHelpText.helpTextInvalid]: hasErrorMessage}" v-if="hint || hasErrorMessage">
      <span :id="hintId" v-if="hint" v-html="hint" />
      <span v-if="hint && hasErrorMessage">, </span>
      <span :id="errorId" v-if="hasErrorMessage">{{ validationMsg }}</span>
    </div>
  </component>
</template>

<script>
import { computed } from 'vue';
import { input as ccInput, label as ccLabel, helpText as ccHelpText} from '@warp-ds/css/component-classes';
import { createValidation } from './validation';
import { id } from '#util';
import { modelProps } from 'create-v-model';

export const fieldProps = {
  id,
  label: String,
  role: String,
  invalid: Boolean,
  readOnly: Boolean,
  disabled: Boolean,
  placeholder: String,
  hint: String,
  optional: Boolean,
  labelLevel: Number,
  rules: {
    type: Array,
    default: () => ([])
  },
  ...modelProps(),
}

const valueOrUndefined = (test, value) => test ? value : undefined

export default {
  name: 'wField',
  inheritAttrs: false,
  props: {
    ...fieldProps,
    as: {
      type: String,
      default: 'div',
    },
    required: [Boolean, Function],
    disabled: Boolean,
  },
  setup(props, { slots }) {

    const { triggerValidation, valid, validationMsg, hasErrorMessage, collector } = createValidation(props)

    const isFieldset = computed(() => props.as === 'fieldset')
    const labelType = computed(() => isFieldset.value ? 'legend' : 'label')
    const labelFor = computed(() => isFieldset.value ? undefined : props.id)
    const labelId = computed(() => (props.label || slots.label) && (props.id + ':label'))
    const hintId = computed(() => props.id + ':hint')
    const errorId = computed(() => valueOrUndefined(hasErrorMessage.value, props.id + ':error'))
    const aria = computed(() => ({
      'aria-labelledby': labelId.value,
      'aria-describedby': valueOrUndefined(props.hint, hintId.value),
      'aria-errormessage': errorId.value,
      'aria-invalid': !valid.value || props.invalid || undefined,
      'aria-required': props.required && true
    }))
    const wrapperAria = computed(() => valueOrUndefined(isFieldset.value, aria.value))
    const hasValidationErrors = computed(() => !!hasErrorMessage.value);
    return { triggerValidation, validationMsg, hasErrorMessage, labelType, labelFor, labelId, hintId, errorId, aria, wrapperAria, collector, valueOrUndefined, ccInput, ccLabel, ccHelpText, hasValidationErrors }
  }
}
</script>
