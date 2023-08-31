import { describe, test, assert } from 'vitest'
import { mount } from '@vue/test-utils'
import { wToggle } from '#components'

describe('toggle', () => {
  assert.ok(wToggle.name)

  test('renders - radio', () => {
    const toggles = [
      { value: 'foo', label: 'Foo' },
      { value: 'bar', label: 'Bar' },
    ]
    const wrapper = mount(wToggle, {
      props: { modelValue: 'foo', toggles, radio: true }
    })
    const inputElements = wrapper.findAll('input')
    for (const el of inputElements) {
      if (el.element.value === 'foo') assert.strictEqual(el.element.checked, true) 
    }
  })
  test('renders - checkbox', () => {
    const toggles = [
      { value: 'foo', label: 'Foo' },
      { value: 'bar', label: 'Bar' },
    ]
    const wrapper = mount(wToggle, {
      props: { modelValue: ['foo'], toggles, checkbox: true }
    })
    const inputElements = wrapper.findAll('input')
    for (const el of inputElements) {
      if (el.element.value === 'foo') assert.strictEqual(el.element.checked, true)
    }
  })
})
