import { describe, test, assert } from 'vitest'
import { mount } from '@vue/test-utils'
import { wSwitch } from '#components'
import { ref, nextTick } from 'vue'

describe('switch', () => {
  assert.ok(wSwitch.name)

  test('renders', async () => {
    const model = ref(false)
    const SwitchFixture = {
      template: `
        <w-switch v-model="model" id="my-id" />
      `,
      components: { wSwitch },
      setup: () => ({ model })
    }
    const wrapper = mount(SwitchFixture)
    assert.ok(wrapper.get('input').classes().includes('sr-only'))
    assert.equal(wrapper.get('input').attributes('id'), 'my-id')
    assert.notExists(wrapper.get('input').attributes('checked'))
    model.value = true
    await nextTick()
    assert.exists(wrapper.get('input').attributes('checked'))
  })
})
