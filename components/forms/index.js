import wField from './w-field.vue';
import wSelect from './w-select.vue';
import wTextarea from './w-textarea.vue';
import wTextfield from './w-textfield.vue';
import wToggle from './w-toggle.vue';
import wForm from './w-form.vue';
import wSuffix from './w-suffix.vue';
import wAffix from './w-affix.vue';
import { installer } from '#util';

export const Forms = { install: installer([wField, wTextfield, wSelect, wTextarea, wToggle, wForm, wSuffix, wAffix]) };
export * from './validation';
export { wTextfield, wSelect, wTextarea, wToggle, wField, wForm, wSuffix, wAffix };
