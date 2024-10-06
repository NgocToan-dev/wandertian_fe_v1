<template>
  <div class="comments border rounded-md p-4 flex flex-col gap-3">
    <CommentDetail
      v-for="comment in commentTreeList"
      :key="comment.id"
      :comment="comment"
      :post="post"
      @addReplyToList="addReplyToList"
      @removeCommentReload="removeCommentReload"
    />
    <!-- Text area comment section -->
    <CommentInput @post-message="postComment" />
  </div>
</template>

<script setup>
import commentApi from "@/apis/business/commentApi";
import CommentDetail from "./CommentDetail.vue";
import CommentInput from "./CommentInput.vue";
import EditMode from "@/utilities/enum/EditMode";
import { computed, watch } from "vue";
import SpecialValue from "@/utilities/enum/SpecialValue";

const comments = defineModel();
const commentTreeList = computed(() => {
  const buildTree = (comments, parentID) => {
    if(!comments) return [];
    return comments
      .filter((comment) => comment.parentID === parentID)
      .map((comment) => ({
        ...comment,
        children: buildTree(comments, comment.commentID),
      }));
  };

  return buildTree(comments.value, null);
});
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const postComment = async (message, commentCallback) => {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  const payload = {
    userID: user.userID,
    username: user.username,
    postID: props.post.postID,
    content: message,
  };
  const res = await commentApi.save(payload, EditMode.INSERT);
  if (res) {
    comments.value = [...comments.value, res];
    if (typeof commentCallback === "function") {
      commentCallback();
    }
  }
};

const addReplyToList = (comment) => {
  comments.value = [...comments.value, comment];
};

const removeCommentReload = (comment) => {
  const index = comments.value.findIndex((c) => c.commentID === comment.commentID);
  comments.value.splice(index, 1);
};
</script>

<style lang="scss" scoped></style>
