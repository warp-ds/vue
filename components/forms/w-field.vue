<template>
  <component :is="as" :class="{[ccInput.wrapper]: true, [$attrs.class || '']: true}" :role="role" v-bind="wrapperAria">
    <component :is="labelType" v-if="label" :class="{[ccLabel.label]: true, [ccLabel.labelInvalid]: isInvalid}" :id="labelId" :for="labelFor" :role="valueOrUndefined(labelLevel, 'heading')" :aria-level="valueOrUndefined(labelLevel, labelLevel)">{{ label }}<span v-if="optional" :class="ccLabel.optional">{{ optionalHelperText }}</span></component>
    <slot :triggerValidation="triggerValidation" :labelFor="id" :labelId="labelId" :aria="aria" :hasValidationErrors="isInvalid" />
    <slot name="control" :form="collector" />
    <div :class="{[ccHelpText.helpText]: true, [ccHelpText.helpTextInvalid]: isInvalid}" v-if="hint || isInvalid">
      <span :id="hintId" v-if="hint" v-html="hint" />
      <span v-if="hint && isInvalid">, </span>
      <span :id="errorId" v-if="isInvalid">{{ errorMessage }}</span>
    </div>
  </component>
</template>

<script>
import { computed } from 'vue';
import { input as ccInput, label as ccLabel, helpText as ccHelpText} from '@warp-ds/css/component-classes';
import { createValidation } from './validation';
import { id } from '#util';
import { modelProps } from 'create-v-model';
import { i18n } from '@lingui/core';
import { activateI18n } from '../util/i18n';
import { messages as enMessages} from './locales/en/messages.mjs';
import { messages as nbMessages} from './locales/nb/messages.mjs';
import { messages as fiMessages} from './locales/fi/messages.mjs';

activateI18n(enMessages, nbMessages, fiMessages);

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

    const { triggerValidation, validationMsg, hasErrorMessage, collector } = createValidation(props)

    const isInvalid = computed(() => !!hasErrorMessage.value || props.invalid)
    const isFieldset = computed(() => props.as === 'fieldset')
    const labelType = computed(() => isFieldset.value ? 'legend' : 'label')
    const labelFor = computed(() => isFieldset.value ? undefined : props.id)
    const labelId = computed(() => (props.label || slots.label) && (props.id + ':label'))
    const hintId = computed(() => valueOrUndefined(props.hint, props.id + ':hint'))
    const errorId = computed(() => valueOrUndefined(isInvalid.value, props.id + ':error'))
    const aria = computed(() => ({
      'aria-labelledby': labelId.value,
      'aria-describedby': hintId.value,
      'aria-errormessage': errorId.value,
      'aria-invalid': isInvalid.value || undefined,
      'aria-required': props.required && true
    }))
    const wrapperAria = computed(() => valueOrUndefined(isFieldset.value, aria.value))
    const optionalHelperText = i18n._({ id: 'forms.field.label.optional', message: '(optional)', comment: 'Shown after label when marked as optional'});
    const errorMessage = validationMsg.value || i18n._({
      id:'forms.validation.mandatoryField', 
      message: 'Mandatory field',
      comment: 'Text visible below input field if validation fails'
    })

    return { triggerValidation, errorMessage, labelType, labelFor, labelId, hintId, errorId, aria, wrapperAria, collector, valueOrUndefined, ccInput, ccLabel, ccHelpText, isInvalid, optionalHelperText }
  }
}
</script>
