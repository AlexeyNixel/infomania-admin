import './assets/main.css';
import './assets/theme.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';

// @ts-ignore
import CKEditor from '@ckeditor/ckeditor5-vue';
import '@/assets/ckeditorStyle.css';
const app = createApp(App);

app.use(CKEditor);
app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount('#app');
