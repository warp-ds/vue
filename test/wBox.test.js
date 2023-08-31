import { describe, test, assert } from 'vitest'
import { mount } from '@vue/test-utils'
import { wBox } from '#components'
import { box as boxClasses } from '@warp-ds/css/component-classes'

describe('box', () => {
  assert.ok(wBox.name)

  test('boxes', () => {
    const defaultSlot = '<h1>Hello Warp</h1>'
    const wrapper = mount(wBox, { slots: { default: defaultSlot } })
    const html = wrapper.get('div')
    assert.equal(wrapper.text(), 'Hello Warp')
    assert.deepEqual(html.classes(), boxClasses.box.split(' '))
  })
  test('boxes any DOM element', () => {
    const defaultSlot = '<h1>Hello Warp</h1>'
    const as = 'section'
    const wrapper = mount(wBox, { props: { as }, slots: { default: defaultSlot } })
    const html = wrapper.get(as)
    assert.ok(html.html())
  })
})
