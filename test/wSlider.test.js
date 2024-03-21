import { describe, test, assert } from 'vitest';
import { mount } from '@vue/test-utils';
import { wSlider } from '#components';

describe('slider', () => {
  assert.ok(wSlider.name);

  test('renders', () => {
    const wrapper = mount(wSlider, {
      props: { modelValue: 50 },
    });
    const activeLine = wrapper.get('[data-test="slider-active"]');
    assert.include(activeLine.attributes('style'), 'right: 50%');
    assert.ok(wrapper.get('[data-test="thumb"]').exists());
  });
});
