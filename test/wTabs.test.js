import { ref } from 'vue';

import { render, screen, fireEvent, waitFor } from '@testing-library/vue';
import { mount } from '@vue/test-utils';
import { describe, test, assert, it, vi, beforeEach, expect } from 'vitest';

import { wTabs, wTab, wTabPanel } from '#components';

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

describe('Tabs component', () => {
  let selectedTab;

  beforeEach(() => {
    selectedTab = ref('one');
    const TabFixture = {
      template: `
      <w-tabs v-model="selectedTab">
        <w-tab label="Tab 1" name="one" />
        <w-tab label="Tab 2" name="two" />
        <w-tab label="Tab 3" name="three" />
      </w-tabs>
    `,
      components: { wTabs, wTab },
      setup: () => ({ selectedTab }),
    };
    render(TabFixture);
  });

  it('renders the tabs', () => {
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 3' })).toBeInTheDocument();
  });

  it('renders the wunderbar', () => {
    expect(screen.getByTestId('wunderbar')).toBeInTheDocument();
  });

  it('updates the wunderbar position on resize', () => {
    const wunderbar = screen.getByTestId('wunderbar');
    expect(wunderbar.style.left).toBe('0px');
    expect(wunderbar.style.width).toBe('0px');
    global.innerWidth = 800;
    global.dispatchEvent(new Event('resize'));
    waitFor(() => {
      expect(wunderbar.style.left).not.toBe('');
      expect(wunderbar.style.width).not.toBe('');
    });
  });

  // Because Vue applies DOM updates asynchronously during re-renders, the fireEvent tools are re-exported as async functions.
  it('changes the active tab on click', async () => {
    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    expect(tab1).toHaveAttribute('aria-selected', 'true');
    expect(tab2).not.toHaveAttribute('aria-selected', 'true');
    await fireEvent.click(tab2);
    expect(tab1).not.toHaveAttribute('aria-selected', 'true');
    expect(tab2).toHaveAttribute('aria-selected', 'true');
  });

  it('changes the active tab on keyboard navigation', async () => {
    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    expect(tab1).toHaveAttribute('aria-selected', 'true');
    expect(tab2).not.toHaveAttribute('aria-selected', 'true');
    await fireEvent.keyDown(tab1, { key: 'ArrowRight' });
    expect(tab1).not.toHaveAttribute('aria-selected', 'true');
    expect(tab2).toHaveAttribute('aria-selected', 'true');
  });

  it('calls the onChange callback when the active tab changes', async () => {
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    await fireEvent.click(tab2);

    expect(selectedTab.value).toBe('two');
  });
});

describe('Tab component', () => {
  let selectedTab;
  const name = 'tab-1';
  const label = 'Tab 1';

  beforeEach(() => {
    selectedTab = ref('tab-1');
    const TabFixture = {
      template: `
      <w-tabs v-model="selectedTab">
      <w-tab label="Tab 1" name="tab-1">
        <div className="dummy-warp-class">Icon</div>
      </w-tab>
      </w-tabs>
    `,
      components: { wTabs, wTab },
      setup: () => ({ selectedTab }),
    };
    render(TabFixture);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(label).closest('button')).toHaveClass(
      'grid items-center font-bold gap-8 focusable antialias p-16 pb-8 border-b-4 bg-transparent s-text-subtle border-transparent hover:s-text-link hover:s-border-primary s-text-link',
    );
    expect(screen.getByText(label).closest('button')).toHaveAttribute('role', 'tab');
    expect(screen.getByText(label).closest('button')).toHaveAttribute('aria-selected', 'true');
  });

  it('renders with icon and label', () => {
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('Icon').closest('span')).toHaveClass('mx-auto hover:s-text-link s-text-link');
    expect(screen.getByText(label).closest('span')).toHaveClass('content-underlined s-text-link');
  });

  it('renders with children and no label', () => {
    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('Icon').closest('div')).toHaveClass('dummy-warp-class');
  });

  it('calls correct value when clicked', async () => {
    const button = screen.getByText(label).closest('button');
    await fireEvent.click(button);

    expect(selectedTab.value).toBe(name);
  });
});

describe('TabPanel', () => {
  beforeEach(() => {
    const model = ref('one');
    const TabFixture = {
      template: `
        <div>
          <w-tab-panel name="one" v-if="model === 'one'">
            Tab one selected!
          </w-tab-panel>
          <w-tab-panel name="two" v-if="model === 'two'">
            Tab two selected!
          </w-tab-panel>
        </div>
      `,
      components: { wTabPanel },
      setup: () => ({ model }),
    };
    render(TabFixture);
  });

  it('renders children', () => {
    expect(screen.getByText('Tab one selected!')).toBeInTheDocument();
  });

  it('has correct role and aria attributes', () => {
    const tabPanel = screen.getByRole('tabpanel', { hidden: true });
    expect(tabPanel).toHaveAttribute('aria-labelledby', 'warp-tab-one');
    expect(tabPanel).toHaveAttribute('id', 'warp-tabpanel-one');
  });
});
