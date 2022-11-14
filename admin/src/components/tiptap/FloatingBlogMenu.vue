<script setup lang="ts">
import { MediasService } from "@common/webapi";
import { isYoutubeUrlValid } from "@src/lib/validation";
import useStore from "@src/stores";
import { Editor, FloatingMenu } from "@tiptap/vue-3";
import { ref } from "vue";
import FileInput from "../FileInput.vue";

const $store = useStore();
const props = defineProps<{ editor?: Editor }>();

const showImageDialog = ref(false);
const showYoutubeDialog = ref(false);

const uploadedUrl = ref();
const youtubeVideoUrl = ref();

async function onFileAdded(files: FileList) {
  $store.app.deleteMediaGateway(uploadedUrl.value ?? undefined);
  const res = await MediasService.postMediaAddToBlog(
    $store.page.blog.id,
    files[0]
  );

  uploadedUrl.value = res;
}

function onCancel() {
  uploadedUrl.value = undefined;
  showImageDialog.value = false;
}

function onConfirm() {
  props.editor?.chain().focus().setImage({ src: uploadedUrl.value }).run();
  onCancel();
}

function deleteMedia() {
  if (!uploadedUrl.value) return;
  $store.app.deleteMediaGateway(uploadedUrl.value ?? undefined);

  uploadedUrl.value = null;
}

function addYoutubeEmbed() {
  if (!props.editor) return;

  props.editor.commands.setYoutubeVideo({
    src: youtubeVideoUrl.value,
  });

  cancelYoutubeEmbed();
}

function cancelYoutubeEmbed() {
  showYoutubeDialog.value = false;
  youtubeVideoUrl.value = undefined;
}
</script>

<template>
  <floating-menu
    v-if="editor"
    :editor="editor"
    :tippy-options="{ duration: 125 }"
    class="floating-blog-menu"
  >
    <button @click="showImageDialog = true">
      <q-icon name="eva-image-outline" size="1.25rem" />
    </button>
    <button>
      <q-icon
        @click="showYoutubeDialog = true"
        name="mdi-youtube"
        size="1.25rem"
      />
    </button>
  </floating-menu>

  <q-dialog v-model="showImageDialog">
    <q-card class="flex-col p-4">
      <q-card-section>
        <h2>Add your image here</h2>
      </q-card-section>
      <q-card-section class="flex justify-center">
        <file-input
          :uploaded-url="uploadedUrl"
          @file-added="onFileAdded"
          @delete="deleteMedia"
          class="w-36 h-36"
        />
      </q-card-section>
      <q-card-actions align="center">
        <q-btn label="Cancel" class="takeme-button" @click="onCancel" />
        <q-btn label="Ok" class="takeme-button black" @click="onConfirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showYoutubeDialog">
    <q-card class="flex-col p-4">
      <q-card-section>
        <h2>Enter a youtube video URL to embed onto your blog</h2>
      </q-card-section>
      <q-card-section>
        <q-form id="youtubeEmbedForm" @submit="addYoutubeEmbed">
          <q-input
            standout
            dense
            label="Youtube Video URL"
            v-model="youtubeVideoUrl"
            :rules="[isYoutubeUrlValid]"
            class="flex-1"
          />
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Cancel" class="takeme-button" @click="addYoutubeEmbed" />
        <q-btn
          label="Ok"
          form="youtubeEmbedForm"
          class="takeme-button black"
          type="submit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="less">
.floating-blog-menu {
  background-color: white;
  padding: 0.25rem;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 5px rgba(128, 128, 128, 0.1);
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
  padding: 0.1rem 0.25rem;
  font-weight: 600;
}
</style>
