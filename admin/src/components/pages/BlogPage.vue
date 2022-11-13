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

const editor = useEditor({
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
    <input class="text-4xl font-bold leading-tight" placeholder="Title" />
    <input class="text-lg font-medium" placeholder="Short description" />

    <floating-blog-menu :editor="editor" />
    <bubble-blog-menu :editor="editor" />
    <bubble-image-menu :editor="editor" />
    <editor-content :editor="editor" />
  </div>
</template>

<style scoped lang="less">
.editor :deep(*:focus-visible) {
  outline: none;
}
</style>

<style lang="less">
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }
}

/* Placeholder (at the top) */
.ProseMirror p.is-editor-empty {
  &:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #adb5bd;
    pointer-events: none;
    height: 0;

    .ProseMirror-focused& {
      content: "";
    }
  }
}
</style>
