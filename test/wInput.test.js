import { describe, test, assert } from 'vitest'
import { mount } from '@vue/test-utils'
import { wInput } from '#components'

describe('input', () => {
  assert.ok(wInput.name)

  test('renders', () => {
    const inputValue = 'Hello Warp'
    const wrapper = mount(wInput, {
      props: { modelValue: inputValue }
    })
    const inputEl = wrapper.get('input')
    assert.equal(inputEl.element.value, inputValue)
  })
  test('prefix/suffix', () => {
    const wrapper = mount(wInput, {
      slots: {
        prefix: '<h1>Hello</h1>',
        suffix: '<h2>Warp</h2>'
      }
    })
    const content = wrapper.get('div.input')
    assert.equal(content.text(), 'HelloWarp')
    assert.include(content.html(), '<h1>Hello</h1>')
  })
})

