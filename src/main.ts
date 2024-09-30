import './assets/main.css';
import './assets/theme.css';
import './index.css';
import '@/assets/theme.css';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import '@/assets/ckeditorStyle.css';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import ElementPlus from 'element-plus';

// @ts-ignore
import CKEditor from '@ckeditor/ckeditor5-vue';
import '@/assets/ckeditorStyle.css';
import { QuillEditor } from '@vueup/vue-quill';
const app = createApp(App);

app.component('QuillEditor', QuillEditor);

app.use(CKEditor);
app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount('#app');
