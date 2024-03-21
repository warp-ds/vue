import { describe, test, assert } from 'vitest';
import { mount } from '@vue/test-utils';
import { wSelect } from '#components';

describe('select', () => {
  assert.ok(wSelect.name);

  // NOTE: bug in happy-dom + test-utils
  test.todo('renders', () => {
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
    const selectEl = wrapper.html();
    assert.equal(selectEl.element.value, '');
  });
});
