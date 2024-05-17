import { ref, nextTick } from 'vue';

import { mount } from '@vue/test-utils';
import { describe, test, assert } from 'vitest';

import { wAlert } from '#components';

describe('alert', () => {
  assert.ok(wAlert.name);

  test('alerts', () => {
    const title = 'A test alert';
    const defaultSlot = '<h5>Hello Warp</h5>';
    const wrapper = mount(wAlert, {
      props: { title, positive: true, modelValue: true },
      slots: { default: defaultSlot },
    });
    const html = wrapper.get('div[data-test="content"]');
    const wrapperHtml = wrapper.get('div[data-test="wrapper"]');
    const titleHtml = wrapper.get('h3');
    assert.equal(titleHtml.text(), title);
    assert.include(html.html(), defaultSlot);
    assert.include(wrapper.html(), '<svg ');
    assert.include(
      wrapperHtml.classes().join(' '),
      'flex p-16 border border-l-4 rounded-4 s-text s-border-positive-subtle s-border-l-positive s-bg-positive-subtle',
    );
  });
  test('show/hide', async () => {
    const model = ref(false);
    const AlertFixture = {
      template: `
        <w-alert v-model="model" title="Hello">
          <h4>OMG WTF BBQ</h4>
        </w-alert>
      `,
      components: { wAlert },
      setup: () => ({ model }),
    };
    const wrapper = mount(AlertFixture);
    assert.notOk(wrapper.find('[data-test="wrapper"]').exists());
    model.value = true;
    await nextTick();
    assert.ok(wrapper.find('[data-test="wrapper"]').exists());
  });
});
