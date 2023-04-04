<template>
  <component :is="href ? 'a' : 'button'" :href="href" :class="buttonClass" v-bind="saneDefaults">
    <slot>{{ label }}</slot>
    <span v-if="loading" role="progressbar" aria-valuenow="0" aria-valuetext="Laster..." class="sr-only" />
  </component>
</template>

<script>
export default { name: 'wButton' }
</script>

<script setup>
import { computed, useAttrs } from 'vue'
import { button } from '@warp-ds/component-classes';

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
  label: String
})

const buttonClass = computed(() => ({
  [button.buttonSecondary]: props.secondary && !props.quiet || !buttonTypes.find(b => !!props[b]),
  // primary buttons
  [button.buttonPrimary]: props.primary && !props.negative,
  [button.buttonDestructive]: props.primary && props.negative,
  // quiet
  [button.buttonFlat]: (props.secondary || (!props.negative && !props.utility)) && props.quiet,
  [button.buttonDestructiveFlat]: props.negative && props.quiet,
  [button.buttonUtilityFlat]: props.utility && props.quiet,
  // others
  [button.buttonSmall]: props.small,
  [button.buttonUtility]: props.utility && !props.quiet,
  [button.buttonLink]: props.link,
  [button.buttonPill]: props.pill,
  [button.buttonInProgress]: props.loading,
  [button.buttonIsDisabled]: props.disabled,
  ['inline-block']: !!props.href
}))

const saneDefaults = computed(() => ({
  type: props.href ? undefined : (attrs.type || 'button'),
  rel: attrs.target === '_blank' ? (attrs.rel || 'noopener') : undefined
}))
</script>
