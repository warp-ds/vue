import wButton from '../w-button.vue';

export default { title: 'Buttons/Button', component: wButton };

const Template = (args) => ({
    components: { wButton },
    setup() { return { args }; },
    template: '<w-button v-bind="args">Click me</w-button>',
});

export const MainStory = Template.bind({});
MainStory.args = { primary: true };
