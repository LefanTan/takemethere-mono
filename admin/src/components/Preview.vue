<script setup lang="ts">
import useStore from "@src/stores";
import { useClipboard } from "@vueuse/core";
import { useQuasar } from "quasar";
import { onMounted, onBeforeUnmount, ref, computed } from "vue";
import IconButton from "./buttons/IconButton.vue";

const preview = ref<HTMLIFrameElement>();

const $q = useQuasar();
const $store = useStore();
const iframeLoaded = ref(false);

const userData = $store.app.takeMeUser;

const previewUrl = import.meta.env.PROD
  ? `https://takeme.blog/${userData?.username}`
  : `http://localhost:3000/${userData?.username}`;

const previewHeight = computed(() => {
  return `${$q.screen.gt.md ? 750 : 600}px`;
});

const { copy } = useClipboard({ source: previewUrl });

onMounted(() => {
  document.documentElement?.addEventListener("pageChange", triggerIframeReload);
});

onBeforeUnmount(() => {
  document.documentElement?.removeEventListener(
    "pageChange",
    triggerIframeReload
  );
});

function triggerIframeReload() {
  iframeLoaded.value = false;
  preview.value?.contentWindow?.postMessage("reload", previewUrl);
}

function onCopyClipboard() {
  copy();
  $q.notify({ message: "Link copied!" });
}
</script>

<template>
  <p class="text-base flex items-center justify-center m-6">
    <a :href="previewUrl" target="_blank" class="font-semibold mr-2">{{
      previewUrl
    }}</a>
    <icon-button
      name="eva-share-outline"
      class="bg-black text-white rounded-lg p-1"
      @click="onCopyClipboard"
    />
  </p>
  <div class="flex-1 flex flex-col justify-center items-center -mt-20 p-6">
    <div class="relative w-full">
      <iframe
        ref="preview"
        :src="previewUrl"
        :height="previewHeight"
        width="100%"
        class="rounded-lg ring-4 ring-black small-scrollbar"
        @load="iframeLoaded = true"
      >
      </iframe>
      <q-spinner
        v-if="!iframeLoaded"
        color="black"
        size="2em"
        :thickness="4"
        class="absolute top-2 right-2"
      />
    </div>
  </div>
</template>

<style scoped></style>
