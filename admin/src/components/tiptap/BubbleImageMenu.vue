<script setup lang="ts">
import { Editor, BubbleMenu } from "@tiptap/vue-3";

defineProps<{ editor?: Editor }>();
</script>

<template>
  <bubble-menu
    v-if="editor"
    :editor="editor"
    :tippy-options="{ duration: 125 }"
    class="bubble-image-menu"
    :class="{ hidden: !editor.isActive('resizable-image') }"
  >
    <span>Sizes:</span>
    <button @click="editor?.chain().focus().setSize({ size: 'small' }).run()">
      <q-icon name="eva-image-outline" size="0.8rem" />
    </button>
    <button @click="editor?.chain().focus().setSize({ size: 'medium' }).run()">
      <q-icon name="eva-image-outline" size="1rem" />
    </button>
    <button @click="editor?.chain().focus().setSize({ size: 'large' }).run()">
      <q-icon name="eva-image-outline" size="1.25rem" />
    </button>
    <span class="left-border">Alignment:</span>
    <button
      @click="
        editor?.chain().focus().setAlignment({ alignment: 'start' }).run()
      "
    >
      <q-icon name="format_align_left" size="1rem" />
    </button>
    <button
      @click="
        editor?.chain().focus().setAlignment({ alignment: 'center' }).run()
      "
    >
      <q-icon name="format_align_center" size="1rem" />
    </button>
    <button
      @click="editor?.chain().focus().setAlignment({ alignment: 'end' }).run()"
    >
      <q-icon name="format_align_right" size="1rem" />
    </button>
  </bubble-menu>
</template>

<style lang="less"></style>

<style scoped lang="less">
.bubble-image-menu {
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

.left-border {
  padding-left: 5px;
  border-left: 2px solid var(--secondary-light);
}

button {
  border-radius: 5px;
  font-weight: 600;
}
</style>
