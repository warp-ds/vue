import wAlert from '../w-alert.vue';
import { ref } from 'vue';

const showAlert = ref(true);

export default { title: 'FeedbackIndicators/Alert', component: wAlert };

const Template = (args) => ({
    components: { wAlert },
    setup() { return { args, showAlert }; },
    template: '<w-alert :model-value="showAlert" v-bind="args"><p>I am an excellent message for the user.</p></w-alert>',
});

export const MainStory = Template.bind({});
MainStory.args = { info: true, title: "I am a title" };
