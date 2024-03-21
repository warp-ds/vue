import { describe, test, assert } from 'vitest';
import { mount } from '@vue/test-utils';
import { button as ccButton } from '@warp-ds/css/component-classes';
import { wButton } from '#components';

const label = 'Hello Warp';

describe('button', () => {
  assert.ok(wButton.name);

  test('label/smoke', () => {
    const wrapper = mount(wButton, { props: { label } });
    const html = wrapper.get('button');
    assert.equal(wrapper.text(), 'Hello Warp');
    assert.equal(html.attributes().type, 'button');
  });
  test('slot', () => {
    const wrapper = mount(wButton, { slots: { default: () => label } });
    assert.equal(wrapper.text(), 'Hello Warp');
  });
  test('primary', () => {
    const wrapper = mount(wButton, { props: { primary: true, label } });
    assert.equal(wrapper.text(), 'Hello Warp');
    assert.include(wrapper.classes().join(' '), ccButton.primary);
  });
  test('negative', () => {
    const wrapper = mount(wButton, { props: { negative: true, label } });
    assert.equal(wrapper.text(), 'Hello Warp');
    assert.include(wrapper.classes().join(' '), ccButton.negative);
  });
  test('no variant should default to secondary', () => {
    const wrapper = mount(wButton);
    assert.include(wrapper.classes().join(' '), ccButton.secondary);
  });
  test('small with no variant should default to secondary small', () => {
    const wrapper = mount(wButton, { props: { small: true } });
    assert.include(wrapper.classes().join(' '), ccButton.secondarySmall);
  });
  test('small & quiet with no variant should default to secondary small quiet', () => {
    const wrapper = mount(wButton, { props: { small: true, quiet: true } });
    assert.include(wrapper.classes().join(' '), ccButton.secondarySmallQuiet);
  });
  test('href', () => {
    const href = 'https://finn.no';
    const wrapper = mount(wButton, { props: { label, href } });
    const html = wrapper.get('a');
    assert.equal(html.attributes().href, href);
    assert.equal(wrapper.text(), 'Hello Warp');
  });
  test('target = _blank defaults with rel=noopener', () => {
    const href = 'https://finn.no';
    const wrapper = mount(wButton, { props: { label, href, target: '_blank' } });
    const html = wrapper.get('a');
    assert.equal(html.attributes().rel, 'noopener');
  });
});
