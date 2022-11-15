<script setup lang="ts">
import { MediasService } from "@common/webapi";
import useStore from "@src/stores";
import FileInput from "../FileInput.vue";

const $store = useStore();

const props = defineProps<{ pageEntryIndex: number }>();
const audioSnippet = $store.page.pageEntries[props.pageEntryIndex].audioSnippet;

async function onFileAdded(files: FileList) {
  if (!audioSnippet?.id) return;

  if (audioSnippet.mediaUrl)
    $store.app.deleteMediaGateway(audioSnippet.mediaUrl);

  const res = await MediasService.postMediaAddToAudio(
    audioSnippet?.id,
    files[0]
  );

  if (audioSnippet) audioSnippet.mediaUrl = res;
}

function deleteMedia() {
  if (!audioSnippet?.mediaUrl) return;

  $store.app.deleteMediaGateway(audioSnippet.mediaUrl);
  audioSnippet.mediaUrl = null;
}
</script>

<template>
  <q-card-section horizontal v-if="audioSnippet">
    <file-input
      :uploaded-url="audioSnippet.mediaUrl"
      @file-added="onFileAdded"
      @delete="deleteMedia"
      type="audio"
      class="h-16 w-16"
    />

    <q-card-section class="flex-1 p-0 ml-2">
      <q-input
        standout
        dense
        placeholder="Text"
        class="mb-2"
        v-model="audioSnippet.text"
      />
    </q-card-section>
  </q-card-section>
</template>

<style scoped></style>
