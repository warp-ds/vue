import wAlert from '../w-alert.vue';
import { ref } from 'vue';

import { within, expect } from '@storybook/test';

const showAlert = ref(true);

export default { title: 'FeedbackIndicators/Alert', component: wAlert };

const Template = (args) => ({
    components: { wAlert },
    setup() { return { args, showAlert }; },
    template: '<w-alert v-model="showAlert" v-bind="args"><p>I am an excellent message for the user.</p></w-alert>',
});

export const MainStory = Template.bind({});
MainStory.args = { info: true, title: "I am a title" };

export const NegativeAlertTask = Template.bind({});
NegativeAlertTask.args = { negative: true, title: 'This is "negative" variant of the alert component' };
NegativeAlertTask.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByRole('alert')).toBeInTheDocument();
};