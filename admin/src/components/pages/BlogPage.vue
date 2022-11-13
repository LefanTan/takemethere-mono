<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import { onBeforeUnmount } from "vue";

import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import Blockquote from "@tiptap/extension-blockquote";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import HardBreak from "@tiptap/extension-hard-break";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Bold from "@tiptap/extension-bold";
import Placeholder from "@tiptap/extension-placeholder";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import Dropcursor from "@tiptap/extension-dropcursor";
import Gapcursor from "@tiptap/extension-gapcursor";

import FloatingBlogMenu from "../tiptap/FloatingBlogMenu.vue";
import BubbleBlogMenu from "../tiptap/BubbleBlogMenu.vue";
import BubbleImageMenu from "../tiptap/BubbleImageMenu.vue";
import ResizableImage from "../tiptap/ResizableTipTapImage";

const editor = useEditor({
  extensions: [
    Document,
    Text,
    Paragraph,
    Bold,
    Italic,
    Blockquote,
    Dropcursor,
    Gapcursor,
    Heading,
    Strike,
    ListItem,
    OrderedList,
    HardBreak,
    HorizontalRule,
    BubbleMenu.configure({
      element: document.querySelector(".bubble-blog-menu") as HTMLElement,
      pluginKey: "blogBubbleMenu",
      shouldShow: ({ editor }) => {
        console.log("bro");
        return false;
      },
    }),
    Placeholder.configure({
      placeholder: "Start writing something...",
    }),
    Underline,
    ResizableImage.configure({
      HTMLAttributes: {
        class: "resizable-image",
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
    <editor-content :editor="editor" class="mt-4" />
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
