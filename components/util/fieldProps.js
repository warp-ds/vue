import { modelProps } from 'create-v-model';

import { id } from './index';

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
    default: () => [],
  },
  ...modelProps(),
};
