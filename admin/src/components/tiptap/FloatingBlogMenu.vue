<script setup lang="ts">
import { Editor, FloatingMenu } from "@tiptap/vue-3";

const props = defineProps<{ editor?: Editor }>();

function addImage() {
  const url = window.prompt("URL");

  if (url) {
    props.editor?.chain().focus().setImage({ src: url }).run();
  }
}
</script>

<template>
  <floating-menu
    v-if="editor"
    :editor="editor"
    :tippy-options="{ duration: 125 }"
    class="floating-blog-menu"
  >
    <button @click="addImage">
      <q-icon name="eva-image-outline" size="1.25rem" />
    </button>
    <button>
      <q-icon name="mdi-youtube" size="1.25rem" />
    </button>
  </floating-menu>
</template>

<style scoped lang="less">
.floating-blog-menu {
  background-color: white;
  padding: 0.25rem;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 5px rgba(128, 128, 128, 0.1);
}

div {
  display: flex;
  align-items: center;

  > * + * {
    margin-left: 0.25rem;
  }
}

button {
  border-radius: 5px;
  padding: 0.1rem 0.25rem;
  font-weight: 600;
}
</style>
