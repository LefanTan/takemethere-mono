<script setup lang="ts">
import { MediasService } from "@common/webapi";
import useStore from "@src/stores";
import FileInput from "../FileInput.vue";

const $store = useStore();

const props = defineProps<{ pageEntryIndex: number }>();
const link = $store.page.pageEntries[props.pageEntryIndex].link;

async function onFileAdded(files: FileList) {
  if (!link?.id) return;

  const res = await MediasService.postMediaAddToLink(link?.id, files[0]);

  if (link) link.mediaUrl = res;
}

function deleteMedia() {
  if (!link?.mediaUrl) return;

  const splitUrl = link.mediaUrl.split("/") ?? [];

  // Grab the file name and Call api to delete current profile picture
  MediasService.deleteMedia(splitUrl[splitUrl?.length - 1]);

  link.mediaUrl = null;
}
</script>

<template>
  <q-card-section horizontal v-if="link">
    <file-input
      :uploaded-url="link.mediaUrl"
      @file-added="onFileAdded"
      @delete="deleteMedia"
      class="h-22"
    />

    <q-card-section class="flex-1 p-0 ml-2">
      <q-input
        standout
        dense
        placeholder="Display Text"
        class="mb-2"
        v-model="link!.displayText"
      />
      <q-input standout dense placeholder="Link" v-model="link!.link" />
    </q-card-section>
  </q-card-section>
</template>

<style scoped></style>
