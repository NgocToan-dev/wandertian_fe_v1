import { defineAsyncComponent } from "vue";

const RichEditor = defineAsyncComponent(() =>
  import("@/components/richEditor/RichEditor.vue")
);

export default {
  install(app) {
    app.component("RichEditor", RichEditor);
  },
};
