import { describe, test, assert } from 'vitest';
import { mount } from '@vue/test-utils';
import { wSwitch } from '#components';
import { ref, nextTick } from 'vue';

describe('switch', () => {
  assert.ok(wSwitch.name);

  test('renders', async () => {
    const model = ref(false);
    const SwitchFixture = {
      template: `
        <w-switch v-model="model" id="my-id" />
      `,
      components: { wSwitch },
      setup: () => ({ model }),
    };

    const wrapper = mount(SwitchFixture);
    const switchInput = wrapper.find('input[type="checkbox"]');

    assert.ok(switchInput.exists());
    assert.ok(switchInput.classes().includes('sr-only'));
    assert.equal(switchInput.element.id, 'my-id');
    assert.strictEqual(switchInput.element.checked, false);

    model.value = true;
    await nextTick();

    assert.strictEqual(switchInput.element.checked, true);
  });
});
