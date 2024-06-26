import './assets/main.css';
import './assets/theme.css';
import './index.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import { vMask } from '@bardoui/vmask';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

// @ts-ignore
import CKEditor from '@ckeditor/ckeditor5-vue';
import '@/assets/ckeditorStyle.css';
const app = createApp(App);

app.component('VueDatePicker', VueDatePicker);

app.directive('mask', vMask);
app.use(CKEditor);
app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount('#app');
