import { describe, test, assert } from 'vitest';
import { mount } from '@vue/test-utils';
import { wBreadcrumbs } from '#components';

describe('breadcrumbs', () => {
  assert.ok(wBreadcrumbs.name);

  test('normal', () => {
    const defaultSlot = [
      `<a href="#/foo">Foo</a>`,
      `<a href="#/bar">Bar</a>`,
      `<span aria-current="page">Baz</span>`,
    ];
    const wrapper = mount(wBreadcrumbs, {
      slots: { default: defaultSlot },
    });
    const html = wrapper.get('nav');
    assert.include(wrapper.text(), 'Foo/Bar/Baz');
    assert.include(
      wrapper.html(),
      'class="select-none s-icon"'
    );
    assert.ok(html.attributes()['aria-labelledby']);
  });
  test('v-for', () => {
    const BreadcrumbFixture = {
      template: `
        <w-breadcrumbs>
          <a v-for="c in crumbs" :href="c.url">{{ c.title }}</a>
        </w-breadcrumbs>
      `,
      components: { wBreadcrumbs },
      setup: () => ({
        crumbs: [
          { title: 'Foo', url: '/hello' },
          { title: 'Bar', url: '/warp' },
        ],
      }),
    };
    const wrapper = mount(BreadcrumbFixture);
    assert.include(wrapper.text(), 'Foo/Bar');
  });
});
