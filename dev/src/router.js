import { createRouter, createWebHistory } from 'vue-router';

import Alert from '../pages/AlertExample.vue';
import Attention from '../pages/AttentionExample.vue';
import Badge from '../pages/BadgeExample.vue';
import Box from '../pages/BoxExample.vue';
import Breadcrumbs from '../pages/BreadcrumbsExample.vue';
import Button from '../pages/ButtonExample.vue';
import ButtonGroup from '../pages/ButtonGroupExample.vue';
import Card from '../pages/CardExample.vue';
import Expandable from '../pages/ExpandableExample.vue';
import Home from '../pages/HomeTitle.vue';
import Modal from '../pages/ModalExample.vue';
import Pill from '../pages/PillExample.vue';
import Select from '../pages/SelectExample.vue';
import Slider from '../pages/SliderExample.vue';
import Steps from '../pages/StepsExample.vue';
import Switch from '../pages/SwitchExample.vue';
import Tabs from '../pages/TabsExample.vue';
import Textarea from '../pages/TextareaExample.vue';
import Textfield from '../pages/TextFieldExample.vue';
import Toggle from '../pages/ToggleExample.vue';
// import Forms from '../pages/Forms.vue'

export const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/alert', component: Alert, name: 'alert' },
  { path: '/attention', component: Attention, name: 'attention' },
  { path: '/badge', component: Badge, name: 'badge' },
  { path: '/box', component: Box, name: 'box' },
  { path: '/button', component: Button, name: 'button' },
  { path: '/breadcrumbs', component: Breadcrumbs, name: 'breadcrumbs' },
  { path: '/button-group', component: ButtonGroup, name: 'button-group' },
  { path: '/card', component: Card, name: 'card' },
  { path: '/expandable', component: Expandable, name: 'expandable' },
  { path: '/modal', component: Modal, name: 'modal' },
  { path: '/pill', component: Pill, name: 'pill' },
  { path: '/select', component: Select, name: 'select' },
  { path: '/slider', component: Slider, name: 'slider' },
  { path: '/steps', component: Steps, name: 'steps' },
  { path: '/switch', component: Switch, name: 'switch' },
  { path: '/tabs', component: Tabs, name: 'tabs' },
  { path: '/textarea', component: Textarea, name: 'textarea' },
  { path: '/textfield', component: Textfield, name: 'textfield' },
  { path: '/toggle', component: Toggle, name: 'toggle' },
  // { path: '/forms', component: Forms, name: 'forms' },
];

const scrollBehavior = () => ({ top: 0 });
export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior,
});
