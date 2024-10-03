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
        <!-- Save button -->
        <fwb-button @click="save"> Save </fwb-button>
      </fwb-button-group>
    </div>
    <div class="editor-section flex gap-5">
      <div class="flex-1 mt-2 flex flex-col">
        <div class="flex justify-start mb-3">
          <div class="flex items-center gap-2">
            <span class="italic text-xs text-gray-400"
              >Created Date: {{ createdAt }} - Updated Date: {{ updatedAt }}</span
            >
          </div>
        </div>
        <div
          contenteditable="true"
          class="title-input font-bold text-2xl mb-3 focus:outline-none border-b-2 border-gray-300 dark:border-gray-700 dark:text-white"
          @input="
            (e) => {
              model.title = e.target.innerText;
            }
          "
        >
          {{ model.title }}
        </div>

        <rich-editor v-model="model.content" :read-only="isPreview" class="flex-1" />
      </div>
      <div class="w-64 h-full mt-2">
        <div class="flex flex-col gap-2">
          <FwbSelect
            v-model="model.status"
            label="Status"
            :options="status"
            class="dark:text-white"
          ></FwbSelect>
          <!-- Choose Image Thumbnail -->
          <FwbFileInput
            v-model="model.thumbnail"
            label="Thumbnail"
            placeholder="Choose thumbnail"
            class="dark:text-white"
          />
          <div class="preview-thumbnail" v-show="model.thumbnail">
            <img :src="thumbnailBase64 || model.thumbnail" alt="thumbnail" />
          </div>
          <FwbSelect
            v-model="model.categoryID"
            label="Category"
            :options="categories"
            class="dark:text-white"
          ></FwbSelect>
          <FwbSelect
            v-model="model.tags"
            label="Tags"
            :options="tags"
            class="dark:text-white"
          ></FwbSelect>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import categoryApi from "@/apis/business/categoryApi";
import postApi from "@/apis/business/postApi";
import tagApi from "@/apis/business/tagApi";
import commonFn from "@/utilities/commonFn";
import EditMode from "@/utilities/enum/EditMode";
import PostStatusEnum from "@/utilities/enum/PostStatusEnum";
import { Icon } from "@iconify/vue/dist/iconify.js";
import {
  FwbButtonGroup,
  FwbButton,
  FwbInput,
  FwbFileInput,
  FwbSelect,
  FwbTextarea,
} from "flowbite-vue";
import { onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
const model = reactive({});

const toast = useToast();
const route = useRoute();
const router = useRouter();
const isPreview = ref(false);
const editMode = ref(EditMode.INSERT);
const createdAt = ref("");
const updatedAt = ref("");
const thumbnailBase64 = ref("");

const categories = ref([]);
const tags = ref([]);

const status = [
  { name: "Draft", value: PostStatusEnum.DRAFT },
  { name: "Published", value: PostStatusEnum.PUBLISHED },
  { name: "Archived", value: PostStatusEnum.ARCHIVED },
];

watch(
  () => model.thumbnail,
  (val) => {
    if (val) {
      const reader = new FileReader();
      reader.onload = (e) => {
        thumbnailBase64.value = e.target.result;
      };
      reader.readAsDataURL(val);
    }
  }
);

onMounted(async () => {
  try {
    commonFn.showLoading();
    await getCategoryAll();
    await getTagAll();
    await refresh();
  } finally {
    commonFn.hideLoading();
  }
  // add keyboard ctrl + s to save
  window.addEventListener("keydown", keydown);
});

const getCategoryAll = async () => {
  const payload = {
    columns: ["CategoryID", "Name"],
  };
  const res = await categoryApi.getAll(payload);
  if (res) {
    categories.value = res.map((item) => {
      return {
        name: item.name,
        value: item.categoryID,
      };
    });
  }
};

const getTagAll = async () => {
  const payload = {};
  const res = await tagApi.getAll(payload);
  if (res) {
    tags.value = res.map((item) => {
      return {
        name: item.name,
        value: item.tagID,
      };
    });
  }
};

const refresh = async () => {
  const postID = route.params.id;
  if (postID != 0) {
    editMode.value = EditMode.UPDATE;

    const res = await postApi.get(postID);
    if (res) {
      const post = res.post;
      // change all date to format date time
      createdAt.value = commonFn.formatDate(post.createdAt);
      updatedAt.value = commonFn.formatDate(post.updatedAt);
      post.tags = res.tags.join(", ");
      Object.assign(model, post);
      beforeBinding(model);
    }
  }
};

const beforeBinding = (model) => {
  if (!model.status) {
    model.status = PostStatusEnum.DRAFT;
  }
};

onUnmounted(() => {
  window.removeEventListener("keydown", keydown);
});

const keydown = (e) => {
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    save();
  }
};

const backToList = () => {
  router.push({ name: "post" });
};
const preview = () => {
  isPreview.value = !isPreview.value;
};

/**
 * Save post content
 *
 */
const save = async () => {
  if (!validateAll()) {
    return;
  }
  const userJSON = localStorage.getItem("user");
  const user = JSON.parse(userJSON);
  const payload = {
    post: {
      ...model,
      userID: user.userID,
      thumbnail: model.thumbnail ? thumbnailBase64.value : null,
    },
    tags: [model.tags],
  };
  const res = await postApi.savePost(payload, editMode.value);
  if (res) {
    toast.success("Post saved successfully");
    router.push({ name: "post", params: { id: res.postID } });
  }
};

const validateAll = () => {
  if (!model.title) {
    toast.error("Title is required");
    return false;
  }
  if (!model.content) {
    toast.error("Content is required");
    return false;
  }
  if (!model.categoryID) {
    toast.error("Category is required");
    return false;
  }
  if (!model.tags) {
    toast.error("Tags is required");
    return false;
  }
  return true;
};
</script>

<style lang="scss">
.title-input {
  font-size: 20px;
}
</style>
