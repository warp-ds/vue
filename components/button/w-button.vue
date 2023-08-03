<template>
  <component :is="href ? 'a' : 'button'" :href="href" :class="buttonClass" v-bind="saneDefaults">
    <slot>{{ label }}</slot>
    <span v-if="loading" role="progressbar" aria-valuenow="0" :aria-valuetext="ariaValueText" :class="ccButton.a11y" />
  </component>
</template>

<script>
export default { name: 'wButton' }
import { activateI18n } from '../util/i18n';
await activateI18n('button');
</script>

<script setup>
import { computed, useAttrs } from 'vue'
import { button as ccButton } from '@warp-ds/css/component-classes';
import { i18n } from '@lingui/core';

const buttonTypes = [    
  'primary',
  'secondary',
  'negative',
  'utility',
  'pill',
  'link',
];

const attrs = useAttrs()
const props = defineProps({
  primary: Boolean,
  secondary: Boolean,
  negative: Boolean,
  utility: Boolean,
  quiet: Boolean,
  small: Boolean,
  link: Boolean,
  pill: Boolean,
  loading: Boolean,
  href: String,
  label: String,
  ariaValueText: {
    type: String,
    default: i18n._({
      id: 'button.aria.loading',
      message: 'Loading...',
      comment: 'Screenreader message for buttons that are loading'
    })
  },
})

const buttonClass = computed(() => ({
  [ccButton.buttonSecondary]: props.secondary && !props.quiet || !buttonTypes.find(b => !!props[b]),
  // primary buttons
  [ccButton.buttonPrimary]: props.primary && !props.negative,
  [ccButton.buttonDestructive]: props.primary && props.negative,
  // quiet
  [ccButton.buttonFlat]: (props.secondary || (!props.negative && !props.utility)) && props.quiet,
  [ccButton.buttonDestructiveFlat]: props.negative && props.quiet,
  [ccButton.buttonUtilityFlat]: props.utility && props.quiet,
  // others
  [ccButton.buttonSmall]: props.small,
  [ccButton.buttonUtility]: props.utility && !props.quiet,
  [ccButton.buttonLink]: props.link,
  [ccButton.buttonPill]: props.pill,
  [ccButton.buttonInProgress]: props.loading,
  [ccButton.buttonIsDisabled]: props.disabled,
  [ccButton.linkAsButton]: !!props.href,
}))

const saneDefaults = computed(() => ({
  type: props.href ? undefined : (attrs.type || 'button'),
  rel: attrs.target === '_blank' ? (attrs.rel || 'noopener') : undefined
}))
</script>
