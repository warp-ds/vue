import { describe, test, assert } from 'vitest';
import { mount } from '@vue/test-utils';
import { wTabs, wTab, wTabPanel } from '#components';
import { ref } from 'vue';

describe('tabs', () => {
  [wTabs, wTab, wTabPanel].forEach((comp) => {
    assert.ok(comp.name);
  });

  test('renders', async () => {
    const model = ref('foo');
    const TabFixture = {
      template: `
        <w-tabs v-model="model">
          <w-tab label="Foo" name="foo" />
          <w-tab label="Bar" name="bar" />
        </w-tabs>
        <div>
          <w-tab-panel name="foo" v-if="model === 'foo'">
            <h1>OMG</h1>
          </w-tab-panel>
          <w-tab-panel name="bar" v-if="model === 'bar'">
            <h1>BBQ</h1>
          </w-tab-panel>
        </div>
      `,
      components: { wTabs, wTab, wTabPanel },
      setup: () => ({ model }),
    };
    const wrapper = mount(TabFixture);
    assert.equal(wrapper.text(), 'Foo BarOMG');
    const buttons = wrapper.findAll('button');
    assert.equal(buttons.length, 2);
    assert.ok(buttons.some((button) => button.attributes('aria-selected') === 'true'));
    assert.ok(buttons.some((button) => button.attributes('aria-selected') === 'false'));
    assert.ok(buttons.some((button) => button.attributes('tabindex') === '0'));
    assert.ok(buttons.some((button) => button.attributes('tabindex') === '-1'));
  });
});
