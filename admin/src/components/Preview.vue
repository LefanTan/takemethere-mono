<script setup lang="ts">
import useStore from "@src/stores";
import { onMounted, onBeforeUnmount, ref } from "vue";

const preview = ref<HTMLIFrameElement>();

const $store = useStore();
const userData = await $store.app.getTakeMeUserData();

const previewUrl = import.meta.env.PROD
  ? `https://takeme.blog/${userData?.username}`
  : `http://localhost:3000/${userData?.username}`;

function triggerIframeReload() {
  preview.value?.contentWindow?.postMessage("reload", previewUrl);
}

onMounted(() => {
  document.documentElement?.addEventListener("pageChange", triggerIframeReload);
});

onBeforeUnmount(() => {
  document.documentElement?.removeEventListener(
    "pageChange",
    triggerIframeReload
  );
});
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center p-6">
    <iframe
      ref="preview"
      :src="previewUrl"
      height="650px"
      width="100%"
      class="rounded-lg ring-4 ring-black small-scrollbar"
    />

    <q-btn
      label="Open Link"
      class="my-4 text-white bg-black"
      :href="previewUrl"
      replace
      target="_blank"
    />
  </div>
</template>

<style scoped></style>
