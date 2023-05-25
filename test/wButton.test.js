import { describe, test, assert } from 'vitest'
import { mount } from '@vue/test-utils'
import { button as ccButton } from '@warp-ds/component-classes';
import { wButton } from '#components'

const label =  'Hello Warp'

describe('button', () => {
  assert.ok(wButton.name)

  test('label/smoke', () => {
    const wrapper = mount(wButton, { props: { label } })
    const html = wrapper.get('button')
    assert.equal(wrapper.text(), 'Hello Warp')
    assert.equal(html.attributes().type, 'button')
  })
  test('slot', () => {
    const wrapper = mount(wButton, { slots: { default: () => label } })
    assert.equal(wrapper.text(), 'Hello Warp')
  })
  test('primary', () => {
    const wrapper = mount(wButton, { props: { primary: true, label } })
    assert.equal(wrapper.text(), 'Hello Warp')
    assert.include(wrapper.classes().join(' '), ccButton.buttonPrimary)
  })
  test('href', () => {
    const href = 'https://finn.no'
    const wrapper = mount(wButton, { props: { label, href } })
    const html = wrapper.get('a')
    assert.equal(html.attributes().href, href)
    assert.equal(wrapper.text(), 'Hello Warp')
  })
  test('target = _blank defaults with rel=noopener', () => {
    const href = 'https://finn.no'
    const wrapper = mount(wButton, { props: { label, href, target: '_blank' } })
    const html = wrapper.get('a')
    assert.equal(html.attributes().rel, 'noopener')
  })
})
