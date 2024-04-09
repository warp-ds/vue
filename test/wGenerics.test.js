import { describe, test, assert } from 'vitest';
import { mount } from '@vue/test-utils';
import { wClickable, wDeadToggle, wExpandTransition, wToggleItem } from '#components';

describe('generics', () => {
  [wClickable, wDeadToggle, wExpandTransition, wToggleItem].forEach((comp) => {
    assert.ok(comp.name);
  });

  test('w-clickable - as a button', () => {
    const wrapper = mount(wClickable);
    const html = wrapper.get('button');
    assert.ok(html.html());
    assert.notOk(html.attributes('href'));
  });
  test('w-clickable - as an anchor', () => {
    const wrapper = mount(wClickable, { props: { href: '#' } });
    const html = wrapper.get('a');
    assert.ok(html.html());
    assert.ok(html.attributes('href'));
  });
  test('w-clickable - as a toggle', () => {
    const wrapper = mount(wClickable, {
      slots: { default: 'bar' },
      props: { radio: true },
      attrs: { value: 'foo' },
    });
    const input = wrapper.get('input');
    const label = wrapper.get('label');
    assert.equal(label.text(), 'bar');
    assert.ok(input.html());
    assert.equal(input.attributes('value'), 'foo');
  });
  test('w-dead-toggle', () => {
    const wrapper = mount(wDeadToggle, { props: { radio: true } });
    assert.ok(wrapper.classes().includes('pointer-events-none'));
    assert.equal(wrapper.attributes('aria-hidden'), 'true');
    const inputEl = wrapper.get('input');
    assert.ok(inputEl.exists);
    assert.ok(inputEl.classes().includes('hidden'));
    assert.equal(inputEl.attributes('type'), 'radio');
    assert.ok(wrapper.get('label').exists);
  });
  test('w-toggle-item - label prop', () => {
    const text = 'Hello Warp';
    const wrapperLabelProp = mount(wToggleItem, {
      props: { label: `<h1>${text}</h1>` },
      attrs: { type: 'checkbox' },
    });
    const wrapperSlot = mount(wToggleItem, {
      slots: { default: `<h1>${text}</h1>` },
      attrs: { type: 'checkbox' },
    });
    [wrapperLabelProp, wrapperSlot].forEach((wrapper) => {
      assert.equal(wrapper.text(), text);
      assert.include(wrapper.html(), `<h1>${text}</h1>`);
      const labelEl = wrapper.get('label');
      const labelContent = wrapper.get('h1');
      assert.ok(labelEl.exists);
      assert.ok(labelContent.exists);
      assert.equal(wrapper.get('input').attributes('type'), 'checkbox');
    });
  });
});
