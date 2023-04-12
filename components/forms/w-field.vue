<template>
  <component :is="as" class="relative" :class="{[input.invalid]: hasErrorMessage, [$attrs.class || '']: true}" :role="role" v-bind="wrapperAria">
    <component :is="labelType" v-if="label" :class="{[l.label]: true, [l.labelValid]: !hasErrorMessage, [l.labelInvalid]: hasErrorMessage}" :id="labelId" :for="labelFor" :role="valueOrUndefined(labelLevel, 'heading')" :aria-level="valueOrUndefined(labelLevel, labelLevel)">{{ label }}<span v-if="optional" :class="input.optional"> (valgfritt)</span></component>
    <slot :triggerValidation="triggerValidation" :labelFor="id" :labelId="labelId" :aria="aria" />
    <slot name="control" :form="collector" />
    <div :class="{[h.helpText]: true, [h.helpTextValid]: !hasErrorMessage, [h.helpTextInvalid]: hasErrorMessage}" v-if="hint || hasErrorMessage">
      <span :id="hintId" v-if="hint" v-html="hint" />
      <span v-if="hint && hasErrorMessage">, </span>
      <span :id="errorId" v-if="hasErrorMessage">{{ validationMsg }}</span>
    </div>
  </component>
</template>

<script>
  import { id } from '#util'
  export const fieldProps = {
    id,
    label: String,
    role: String,
    invalid: Boolean,
    hint: String,
    optional: Boolean,
    labelLevel: Number,
    rules: {
      type: Array,
      default: () => ([])
    },
    ...modelProps(),
  };

  export default { 
    inheritAttrs: false,
    name: 'wField',
  }
</script>

<script setup>
  import { computed, ref } from 'vue'
  import { createValidation } from './validation'
  import { modelProps } from 'create-v-model'
  import { input, label as l, helpText as h} from '@warp-ds/component-classes';


  const props = defineProps({
    ...fieldProps,
    as: {
        type: String,
        default: 'div',
      },
      required: [Boolean, Function],
      disabled: Boolean,
  });

  const valueOrUndefined = (test, value) => test ? value : undefined;

  const { triggerValidation, valid, validationMsg, hasErrorMessage, collector } = createValidation(props);
      
  const isFieldset = computed(() => props.as === 'fieldset');
  const labelType = computed(() => isFieldset.value ? 'legend' : 'label');
  const labelFor = computed(() => isFieldset.value ? undefined : props.id);
  const labelId = computed(() => (props.label || slots.label) && (props.id + ':label'));
  const hintId = computed(() => props.id + ':hint');
  const errorId = computed(() => valueOrUndefined(hasErrorMessage.value, props.id + ':error'));
  const aria = computed(() => ({
    'aria-labelledby': labelId.value,
    'aria-describedby': valueOrUndefined(props.hint, hintId.value),
    'aria-errormessage': errorId.value,
    'aria-invalid': !valid.value || props.invalid || undefined,
    'aria-required': props.required && true
  }));
  const wrapperAria = computed(() => valueOrUndefined(isFieldset.value, aria.value));
</script>