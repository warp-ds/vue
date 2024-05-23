import { mount } from '@vue/test-utils';
import { describe, test, assert } from 'vitest';

import { wButtonGroup, wButtonGroupItem, wClickable } from '#components';

describe('button group', () => {
  assert.ok(wButtonGroup.name);
  assert.ok(wButtonGroupItem.name);

  test('works', () => {
    const ButtonGroupFixture = {
      template: `
        <w-button-group outlined>
          <w-button-group-item>
            <w-clickable label href="#/foo">Foo</w-clickable>
          </w-button-group-item>
          <w-button-group-item>
            <w-clickable label href="#/bar">Bar</w-clickable>
          </w-button-group-item>
        </w-button-group>
      `,
      components: { wButtonGroup, wButtonGroupItem, wClickable },
    };
    const wrapper = mount(ButtonGroupFixture);
    const anchor = wrapper.get('a');
    assert.include(anchor.attributes().href, '#/foo');
    assert.equal(anchor.text(), 'Foo');
    const groupItem = wrapper.getComponent(wButtonGroupItem);
    assert.include(groupItem.classes(), 'border-[--w-color-buttongroup-utility-border]'); // providing the outlined prop succeeded
  });
});
