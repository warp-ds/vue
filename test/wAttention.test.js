import { describe, test, assert, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { wAttention } from '#components'
import { ref, nextTick } from 'vue'

// I don't know if the workaround with attachTo breaks anything, so I'm making sure to clean up here
afterEach(() => { document.body.innerHTML = '' })

describe('attention', () => {
  assert.ok(wAttention.name)

  test('callout', () => {
    const defaultSlot = '<h5>Hello Warp</h5>'
    const wrapper = mount(wAttention, {
      props: { callout: true, modelValue: true },
      slots: { default: defaultSlot } })
    assert.include(wrapper.text(), 'Hello Warp')
    const html = wrapper.get('[data-test="wrapper"]')
    assert.include(html.classes().join(' '), 'i-bg-$color-callout-background')
  })
  test('show/hide callout', async () => {
    const model = ref(false)
    const CalloutFixture = {
      template: `
        <w-attention callout v-model="model" data-test="comp">
          <h1>OMG WTF BBQ</h1>
        </w-attention>
      `,
      components: { wAttention },
      setup: () => ({ model })
    }
    const wrapper = mount(CalloutFixture, { attachTo: document.body })
    assert.notOk(wrapper.isVisible())
    model.value = true
    await nextTick()
    assert.ok(wrapper.isVisible())
  })
})
