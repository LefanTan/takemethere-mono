<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import { onBeforeUnmount } from "vue";

import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import FloatingMenu from "@tiptap/extension-floating-menu";

import FloatingBlogMenu from "../tiptap/FloatingBlogMenu.vue";
import BubbleBlogMenu from "../tiptap/BubbleBlogMenu.vue";
import BubbleImageMenu from "../tiptap/BubbleImageMenu.vue";
import ResizableImage from "../tiptap/ResizableTipTapImage";

import useStore from "@src/stores";
import router from "@src/routes";
import { storeToRefs } from "pinia";
import { watchDebounced } from "@vueuse/core";
import { isEqual } from "lodash";

const $store = useStore();
const blogId = router.currentRoute.value.params.blogId;

await $store.page.retrieveBlog(blogId as string);
const { blog } = storeToRefs($store.page);

watchDebounced(
  blog,
  () => {
    if (!isEqual(blog.value, $store.page.oldBlog)) {
      $store.page.updateBlog(blog.value);
    }
  },
  { deep: true, debounce: 500 }
);

const editor = useEditor({
  content: blog.value.content,
  onUpdate: ({ editor }) => {
    blog.value.content = editor.getHTML();
  },
  editorProps: {
    attributes: {
      class: "mt-4 flex flex-col",
    },
  },
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: "Start writing something...",
    }),
    Underline,
    ResizableImage.configure({
      HTMLAttributes: {
        class: "resizable-image",
      },
    }),
    FloatingMenu.configure({
      shouldShow() {
        return false;
      },
    }),
  ],
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<template>
  <div
    class="editor bg-white rounded-md m-2 p-6 h-full min-h-90vh flex flex-col"
  >
    <input
      class="text-4xl font-bold leading-tight"
      placeholder="Title"
      v-model="blog.title"
    />
    <input
      class="text-lg font-medium"
      placeholder="Short description"
      v-model="blog.description"
    />

    <floating-blog-menu :editor="editor" />
    <bubble-blog-menu :editor="editor" />
    <bubble-image-menu :editor="editor" />
    <editor-content :editor="editor" v-model="blog.content" />
  </div>
</template>

<style scoped lang="less">
.editor :deep(*:focus-visible) {
  outline: none;
}
</style>
