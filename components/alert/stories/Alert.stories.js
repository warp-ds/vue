import wAlert from '../w-alert.vue';

export default { title: 'FeedbackIndicators/Alert', component: wAlert };

const Template = (args) => ({
    components: { wAlert },
    setup() { return { args }; },
    template: '<w-alert v-bind="args"><p>I am an excellent message for the user.</p></w-alert>',
});

export const MainStory = Template.bind({});
MainStory.args = { info: true, title: "I am a title", 'v-model': true };
