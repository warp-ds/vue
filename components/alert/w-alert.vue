<script setup>
import { computed } from 'vue';

import { alert as ccAlert } from '@warp-ds/css/component-classes';
import IconError16 from '@warp-ds/icons/vue/error-16';
import IconInfo16 from '@warp-ds/icons/vue/info-16';
import IconSuccess16 from '@warp-ds/icons/vue/success-16';
import IconWarning16 from '@warp-ds/icons/vue/warning-16';
import { createModel, modelProps } from 'create-v-model';

import { wExpandTransition } from '#generics';

defineOptions({
  name: 'wAlert',
});

const props = defineProps({
  title: String,
  role: {
    type: String,
    default: 'alert',
  },
  negative: Boolean,
  positive: Boolean,
  warning: Boolean,
  info: Boolean,
  ...modelProps(),
});

const possibleTypeProps = ['negative', 'positive', 'warning', 'info'];

const emit = defineEmits(['update:modelValue']);
const model = createModel({ props, emit });
const alertColorType = computed(() => possibleTypeProps.find((e) => props[e]));
const activeWrapperClassNames = computed(() => ccAlert[alertColorType.value]);
const activeIconClassNames = computed(() => ccAlert[`${alertColorType.value}Icon`]);
const wrapperClass = computed(() => [ccAlert.alert, activeWrapperClassNames.value]);
const iconClass = computed(() => [ccAlert.icon, activeIconClassNames.value]);

const iconComponent = computed(() => {
  let icon;
  if (props.negative) {
    icon = IconError16;
  } else if (props.positive) {
    icon = IconSuccess16;
  } else if (props.warning) {
    icon = IconWarning16;
  } else {
    icon = IconInfo16;
  }
  return icon;
});
</script>

<template>
  <div :class="ccAlert.willChangeHeight">
    <!-- TODO: Investigate if "will-change-height" is needed and compare the use of it with the other component repos -->
    <w-expand-transition>
      <div v-if="model" :role="role">
        <div :class="wrapperClass" data-test="wrapper">
          <div :class="iconClass">
            <component :is="iconComponent" />
          </div>
          <div :class="ccAlert.textWrapper" data-test="content">
            <h3 v-if="title" :class="ccAlert.title">{{ title }}</h3>
            <slot />
          </div>
        </div>
      </div>
    </w-expand-transition>
  </div>
</template>
