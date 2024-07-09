import { mount } from '@vue/test-utils';
import { describe, test, assert } from 'vitest';

import { wSelect } from '#components';

describe('select', () => {
  assert.ok(wSelect.name);

  test('renders', () => {
    const wrapper = mount(wSelect, {
      props: { modelValue: 'foo' },
      slots: {
        default: `
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
        <option value="baz">Baz</option>
      `,
      },
    });

    const selectEl = wrapper.find('select');

    assert.equal(selectEl.element.value, 'foo');
  });
});
