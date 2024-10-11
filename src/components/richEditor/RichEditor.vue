<template>
  <div class="rich-editor">
    <froala
      class="remove-list-style dark:text-white max-h-full flex flex-col"
      v-if="!readOnly"
      :config="config"
      v-model:value="model"
    >
    </froala>
    <froalaView
      v-if="readOnly"
      class="dark:text-white max-h-full overflow-auto"
      :config="config"
      v-model:value="model"
    />
  </div>
</template>

<script setup>
const model = defineModel();

const props = defineProps({
  readOnly: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits([]);
const config = {
  tabSpaces: 8,
  spellcheck: false,
  charCounterCount: false,
  listAdvancedTypes: true,
  placeholderText: "How's it going today? Do you have fun? Any story?",
  entities: '&quot;&#39;&iexcl;&cent;&pound;&curren;&yen;&brvbar;',
  events: {
    initialized: function () {
      const editor = this;
      if (props.readOnly == true) {
        editor.toolbar.hide();
        editor.edit.off(); // Disable editing on read-only change
      } else {
        editor.edit.on(); // Enable editing on non-read-only change
      }
    },
  },
};
</script>

<style lang="scss">
.rich-editor {
  #fr-logo {
    display: none;
  }
  .fr-quick-insert a.fr-floating-btn svg {
    height: 40px !important;
  }
  .fr-wrapper{
    flex: 1;
    overflow: auto;
  }
  ol,
  ul {
    list-style-type: revert;
    margin: revert;
    padding: revert;
  }
  blockquote {
    text-align: left;
    margin: 20px;
    padding: 25px;
    font-size: 18px;
    color: #428bca;
    background: #f3f3f3;
    border-radius: 7px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: revert;
    font-size: revert;
  }
  th, td{
    padding: 10px;
  }
}
</style>
