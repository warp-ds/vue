// w-badge.stories.ts
import { computed } from 'vue';
import { within, expect } from '@storybook/test';
import type { Meta, StoryFn } from '@storybook/vue3';

import wBadge from '../w-badge.vue';

const meta: Meta<typeof wBadge> = {
  title: 'FeedbackIndicators/Badge',
  component: wBadge,
  args: {
    as: 'span',
    variant: 'neutral',
    position: undefined,
  },
  argTypes: {
    as: {
      control: 'text',
      description: 'HTML tag to render',
      table: { defaultValue: { summary: 'div' } },
    },
    variant: {
      control: { type: 'select' },
      options: ['neutral', 'info', 'positive', 'warning', 'negative', 'disabled', 'price', 'sponsored'],
      description: 'Visual style of the badge',
      table: { defaultValue: { summary: 'neutral' } },
    },
    position: {
      control: { type: 'select' },
      options: [undefined, 'top-left', 'top-right', 'bottom-right', 'bottom-left'],
      description:
        'Optional anchored position. When set, the badge uses absolute positioning; ensure the parent is relatively positioned.',
    },
  },
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

const Template: StoryFn<typeof wBadge> = (args) => ({
  components: { wBadge },
  setup() {
    const label = computed(() => {
      const v = String(args.variant ?? '').replace('-', ' ');
      return v.charAt(0).toUpperCase() + v.slice(1);
    });
    return { args, label };
  },
  // Wrap in a relatively positioned box so `position` can be previewed if set.
  template: `
    <div style="position: relative; padding: 24px; width: 240px; height: 140px; background: white; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,.08); display: flex; align-items: center; justify-content: center;">
      <div style="opacity:.6; font-size: 12px; position:absolute; bottom:8px;">Play with controls →</div>
      <w-badge v-bind="args">{{ label }}</w-badge>
    </div>
  `,
});

export const MainStory = Template.bind({});
MainStory.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(/Neutral|Info|Positive|Warning|Negative|Disabled|Price|Sponsored/)).toBeInTheDocument();
};
