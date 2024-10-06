<template>
  <div class="comment-detail flex flex-col gap-3">
    <div class="comment-root">
      <div class="flex gap-2 items-center">
        <div class="w-12">
          <img
            src="https://i.pravatar.cc/300"
            alt="avatar"
            class="w-10 h-10 rounded-full"
          />
        </div>
        <div class="flex-1">
          <div class="flex justify-between">
            <h3 class="text-gray-900 dark:text-white">{{ comment.username }}</h3>
            <span class="text-gray-400 dark:text-gray-500 flex gap-2 items-center"
              >{{ commonFn.formatDate(comment.createdAt) }}
              <!-- Delete -->
              <span
                v-if="comment.userID === user.userID"
                class="text-red-500 dark:text-red-400 cursor-pointer"
                @click="removeComment(comment)"
              >
                <Icon icon="mdi:delete" />
              </span>
            </span>
          </div>
          <p class="text-gray-900 dark:text-white">
            {{ comment.content }}
          </p>
          <!-- reply -->
          <div class="flex gap-4">
            <button
              :class="[
                isLike
                  ? 'text-blue-500 dark:text-blue-400'
                  : 'text-gray-400 dark:text-gray-500',
              ]"
              class="text-xs flex items-center gap-1"
              @click="isLike = !isLike"
            >
              <Icon icon="mdi:thumb-up" />
              Like
            </button>
            <button
              :class="[
                isShowChildren
                  ? 'text-blue-500 dark:text-blue-400'
                  : 'text-gray-400 dark:text-gray-500',
              ]"
              class="text-xs flex items-center gap-1"
              @click="replyToComment(comment)"
            >
              <Icon icon="mdi:reply" />
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="comment-children" v-if="isShowChildren">
      <CommentDetail
        v-for="child in comment.children"
        :key="child.id"
        :comment="child"
        :post="post"
        @removeCommentReload="removeCommentReload"
      />
      <!-- Text area comment section -->
      <CommentInput @post-message="postReply" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Icon } from "@iconify/vue";
import commonFn from "@/utilities/commonFn";
import CommentInput from "./CommentInput.vue";
import commentApi from "@/apis/business/commentApi";
import EditMode from "@/utilities/enum/EditMode";

const commentValue = ref("");
const user = ref("");
const isLike = ref(false);
const emits = defineEmits(["addReplyToList", "removeCommentReload"]);
const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
  post: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  let userJSON = localStorage.getItem("user");
  user.value = JSON.parse(userJSON);
});

const replyToComment = (comment) => {
  commentValue.value = `@${comment.username} `;
  isShowChildren.value = !isShowChildren.value;
};

const isShowChildren = ref(false);

const postReply = async (message, commentCallback) => {
  const payload = {
    userID: user.value.userID,
    username: user.value.username,
    postID: props.post.postID,
    content: message,
    parentID: props.comment.commentID,
  };
  const res = await commentApi.save(payload, EditMode.INSERT);
  if (res) {
    emits("addReplyToList", res);
    if (typeof commentCallback === "function") {
      commentCallback();
    }
  }
};

const removeComment = async (comment) => {
  const res = await commentApi.delete(comment.commentID);
  if (res) {
    emits("removeCommentReload", comment);
  }
};

const removeCommentReload = (comment) => {
  emits("removeCommentReload", comment);
};
</script>

<style lang="scss" scoped>
.comment-children {
  margin-left: 3rem;
}
</style>
