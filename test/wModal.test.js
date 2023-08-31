import { describe, test, assert } from 'vitest'
import { mount } from '@vue/test-utils'
import { wModal } from '#components'
import { ref, nextTick } from 'vue'

describe('modal', () => {
  assert.ok(wModal.name)

  test('can mount expanded', async () => {
    const defaultSlot = '<h1>Hello Warp</h1>'
    const wrapper = mount(wModal, { props: { modelValue: true }, slots: { default: defaultSlot } })
    await nextTick() // have to wait for the modal to mount/animate
    assert.equal(wrapper.text(), 'Hello Warp')
  })
  test('can show/hide', async () => {
    const model = ref(false)
    const ModalFixture = {
      template: `
        <w-modal v-model="model" title="Hello">
          <h1>OMG WTF BBQ</h1>
        </w-modal>
      `,
      components: { wModal },
      setup: () => ({ model })
    }
    const wrapper = mount(ModalFixture)
    await nextTick() // have to wait for the modal to mount/animate
    assert.notOk(wrapper.find('[data-test="backdrop"]').exists())
    model.value = true
    await nextTick() // since we're waiting for the modal to start from 'closed' we have to wait moar
    await nextTick()
    await nextTick()
    assert.ok(wrapper.find('[data-test="backdrop"]').exists())
    assert.ok(wrapper.find('#w-modal-title').exists())
  })
  test('has a title', async () => {
    const defaultSlot = '<h1>Hello Warp</h1>'
    const wrapper = mount(wModal, { props: { modelValue: true, title: 'OMG' }, slots: { default: defaultSlot } })
    await nextTick() // have to wait for the modal to mount/animate
    assert.include(wrapper.text(), 'OMG')
  })
  test('has a footer', async () => {
    const defaultSlot = '<h1>Hello Warp</h1>'
    const footerSlot = '<h1>Goodbye Warp</h1>'
    const wrapper = mount(wModal, { props: { modelValue: true }, slots: { default: defaultSlot, footer: footerSlot } })
    await nextTick() // have to wait for the modal to mount/animate
    assert.include(wrapper.text(), 'Hello Warp')
    assert.include(wrapper.text(), 'Goodbye Warp')
  })
  test('left and right are toggleable', async () => {
    const defaultSlot = '<h1>Hello Warp</h1>'
    const wrapper = mount(wModal, { props: { modelValue: true }, slots: { default: defaultSlot } })
    await nextTick()
    const left = wrapper.find('button[aria-label="Back"]').exists()
    assert.notOk(left)
    const right = wrapper.find('button[aria-label="Close"]').exists()
    assert.notOk(right)
  })
  test('has sane defaults for left and right', async () => {
    const defaultSlot = '<h1>Hello Warp</h1>'
    const wrapper = mount(wModal, { props: { modelValue: true, left: true, right: true }, slots: { default: defaultSlot } })
    await nextTick()
    const left = wrapper.find('button[aria-label="Back"]')
    assert.ok(left.exists())
    assert.include(left.html(), '<svg ')
    const right = wrapper.find('button[aria-label="Close"]')
    assert.ok(right.exists())
    assert.include(right.html(), '<svg ')
  })
})
