<script setup lang="ts">
import { Editor, BubbleMenu } from "@tiptap/vue-3";

defineProps<{ editor?: Editor }>();
</script>

<template>
  <!-- Show bubble menu for when selecting anything that's not image -->
  <bubble-menu
    v-if="editor"
    :editor="editor"
    :tippy-options="{ duration: 125 }"
    class="bubble-blog-menu"
    :class="{ hidden: editor.isActive('resizable-image') }"
  >
    <button @click="editor?.chain().focus().setHeading({ level: 1 }).run()">
      h1
    </button>
    <button @click="editor?.chain().focus().setHeading({ level: 2 }).run()">
      h2
    </button>
    <button @click="editor?.chain().focus().setHeading({ level: 3 }).run()">
      h3
    </button>
    <button @click="editor?.chain().focus().setParagraph().run()">P</button>
    <button class="px-0" @click="editor?.chain().focus().toggleBold().run()">
      <q-icon name="format_bold" size="1rem" />
    </button>
    <button
      class="px-0"
      @click="editor?.chain().focus().toggleUnderline().run()"
    >
      <q-icon name="format_underlined" size="1rem" />
    </button>
    <button class="px-0" @click="editor?.chain().focus().toggleItalic().run()">
      <q-icon name="format_italic" size="1rem" />
    </button>
    <button
      class="px-0"
      @click="editor?.chain().focus().toggleBlockquote().run()"
    >
      <q-icon name="mdi-format-quote-close" size="1rem" />
    </button>
    <button @click="editor?.chain().focus().setTextAlign('left').run()">
      <q-icon name="format_align_left" size="1rem" />
    </button>
    <button @click="editor?.chain().focus().setTextAlign('center').run()">
      <q-icon name="format_align_center" size="1rem" />
    </button>
    <button @click="editor?.chain().focus().setTextAlign('right').run()">
      <q-icon name="format_align_right" size="1rem" />
    </button>
    <button @click="editor?.chain().focus().toggleBulletList().run()">
      <q-icon name="format_list_bulleted" size="1rem" />
    </button>
    <button @click="editor?.chain().focus().toggleOrderedList().run()">
      <q-icon name="format_list_numbered" size="1rem" />
    </button>
  </bubble-menu>
</template>

<style lang="less"></style>

<style scoped lang="less">
.bubble-blog-menu {
  background-color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 5px rgba(128, 128, 128, 0.297);

  display: flex;
  align-items: center;

  > button:not(:has(i)) + button:not(:has(i)) {
    margin-left: 0.5rem;
  }

  > * + * {
    margin-left: 0.25rem;
  }
}

button {
  border-radius: 5px;
  font-weight: 600;
}
</style>
