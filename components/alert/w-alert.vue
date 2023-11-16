<script setup>
import { computed } from "vue";
import { wExpandTransition } from "#generics";
import { createModel, modelProps } from "create-v-model";
import { alert as ccAlert } from "@warp-ds/css/component-classes";
import IconAlertError16 from "@warp-ds/icons/vue/alert-error-16";
import IconAlertSuccess16 from "@warp-ds/icons/vue/alert-success-16";
import IconAlertWarning16 from "@warp-ds/icons/vue/alert-warning-16";
import IconAlertInfo16 from "@warp-ds/icons/vue/alert-info-16";

const props = defineProps({
  title: String,
  role: {
    type: String,
    default: "alert",
  },
  negative: Boolean,
  positive: Boolean,
  warning: Boolean,
  info: Boolean,
  ...modelProps(),
});

const possibleTypeProps = ["negative", "positive", "warning", "info"];

const emit = defineEmits(["update:modelValue"]);
const model = createModel({ props, emit });
const alertColorType = computed(() => possibleTypeProps.find((e) => props[e]));
const activeWrapperClassNames = computed(() => ccAlert[alertColorType.value]);
const activeIconClassNames = computed(
  () => ccAlert[`${alertColorType.value}Icon`]
);
const wrapperClass = computed(() => [
  ccAlert.alert,
  activeWrapperClassNames.value,
]);
const iconClass = computed(() => [ccAlert.icon, activeIconClassNames.value]);

const iconComponent = computed(() =>
  props.negative
    ? IconAlertError16
    : props.positive
    ? IconAlertSuccess16
    : props.warning
    ? IconAlertWarning16
    : IconAlertInfo16
);
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
            <h3 :class="ccAlert.title" v-if="title">{{ title }}</h3>
            <slot />
          </div>
        </div>
      </div>
    </w-expand-transition>
  </div>
</template>

<script>
export default { name: "wAlert" };
</script>
