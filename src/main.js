import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import router from "./router";
import 'flowbite';

import VueFroala from 'vue-froala-wysiwyg'
//Import Froala Editor 
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/plugins/lists.min';
// Import Froala Editor css files.
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';

import globalComponents from "./globalComponents";

import { createPinia } from "pinia";

const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(VueFroala);
app.use(globalComponents);
app.use(pinia);

app.mount("#app");
