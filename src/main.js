import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import router from "./router";
import "flowbite";

import VueFroala from "vue-froala-wysiwyg";
//Import Froala Editor
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/js/plugins/lists.min.js";
// Import Froala Editor css files.
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";

import globalComponents from "./globalComponents";

import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

import { createPinia } from "pinia";

const pinia = createPinia();

import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);
app.use(router);
app.use(VueFroala);
app.use(globalComponents);
app.use(pinia);
app.use(LoadingPlugin);
app.use(VueApexCharts);
app.use(Toast, {
  timeout: 2000,
});

app.mount("#app");
