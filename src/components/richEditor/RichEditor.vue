<template>
  <div>
    <froala tag="textarea" v-if="!readOnly" :config="config" v-model="model"> </froala>
    <froalaView v-if="readOnly" :config="config" v-model="model" />
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
#fr-logo {
  display: none;
}
.fr-quick-insert a.fr-floating-btn svg {
  height: 40px !important;
}
</style>
