<template>
  <div class="p-4">
    <!-- save button -->
    <div class="flex justify-between align-items-center">
      <div class="backToList cursor-pointer flex items-center" @click="backToList">
        <Icon icon="mdi:arrow-left" class="text-xl hover:text-slate-500" />
      </div>
      <fwb-button-group>
        <!-- preview -->
        <fwb-button color="alternative" @click="preview">
          <div class="flex gap-2 items-center">
            <Icon icon="mdi:computer" />
            Preview
          </div>
        </fwb-button>
        <!-- save draft -->
        <fwb-button color="alternative" @click="saveDraft"> Save Draft </fwb-button>
        <!-- Save button -->
        <fwb-button @click="save"> Save </fwb-button>
      </fwb-button-group>
    </div>

    <div class="mt-2">
      <FwbInput v-model="model.title" class="title-input border-0 bg-inherit mb-2" />
      <rich-editor v-model="model.content" :read-only="isPreview" />
    </div>
  </div>
</template>

<script setup>
import postApi from "@/apis/business/postApi";
import EditMode from "@/utilities/enum/EditMode";
import { Icon } from "@iconify/vue/dist/iconify.js";
import { FwbButtonGroup, FwbButton, FwbInput } from "flowbite-vue";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
const model = reactive({});

const toast = useToast();
const route = useRoute();
const router = useRouter();
const isPreview = ref(false);
const editMode = ref(EditMode.INSERT);

onMounted(async () => {
  const postID = route.params.id;
  if (postID != 0) {
    editMode.value = EditMode.UPDATE;
    const res = await postApi.get(postID);
    if (res) {
      Object.assign(model, res);
    }
  }
});

const backToList = () => {
  router.push({ name: "post" });
};
const preview = () => {
  isPreview.value = !isPreview.value;
};

const saveDraft = () => {
  console.log("Save Draft");
};

/**
 * Save post content
 *
 */
const save = async () => {
  const payload = {
    ...model,
    user: {
      userID: '1ddfbad6-5e7f-4e62-84ee-1c66ceda291b',
      discriminator: "UserAuthenEntity"
    },
    category: {
      categoryID: '5e556834-79b5-11ef-ae13-088fc3196a52',
    }
  };
  const res = await postApi.save(payload, editMode.value);
  if (res) {
    router.push({ name: "post" });
    toast.success("Post saved successfully");
  }
};
</script>

<style lang="scss">
.title-input{
  font-size: 20px;
}
</style>
