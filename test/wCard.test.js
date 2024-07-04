import { mount } from '@vue/test-utils';
import { card as cardClasses } from '@warp-ds/css/component-classes';
import { describe, test, assert } from 'vitest';

import { wCard } from '#components';

describe('card', () => {
  assert.ok(wCard.name);

  test('is such a card', () => {
    const defaultSlot = '<h1>Hello Warp</h1>';
    const wrapper = mount(wCard, { slots: { default: defaultSlot } });
    assert.equal(wrapper.text(), 'Hello Warp');
    cardClasses.card.split(' ').forEach((c) => assert.include(wrapper.classes(), c));
  });
  test('cards any DOM element', () => {
    const defaultSlot = '<h1>Hello Warp</h1>';
    const as = 'section';
    const wrapper = mount(wCard, { props: { as }, slots: { default: defaultSlot } });
    const html = wrapper.get(as);
    assert.ok(html.html());
  });
});
