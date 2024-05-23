import { mount } from '@vue/test-utils';
import { describe, test, assert } from 'vitest';

import { wTextfield } from '#components';

describe('textfield', () => {
  assert.ok(wTextfield.name);

  test('renders', () => {
    const inputValue = 'Hello Warp';
    const wrapper = mount(wTextfield, {
      props: { modelValue: inputValue },
    });
    const inputEl = wrapper.get('input');
    assert.equal(inputEl.element.value, inputValue);
  });
  test('prefix/suffix', () => {
    const wrapper = mount(wTextfield, {
      slots: {
        prefix: '<h1>Hello</h1>',
        suffix: '<h2>Warp</h2>',
      },
    });
    const content = wrapper.get('div');
    assert.equal(content.text(), 'HelloWarp');
    assert.include(content.html(), '<h1>Hello</h1>');
  });
});
