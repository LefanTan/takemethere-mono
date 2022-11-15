<script setup lang="ts">
import useStore from "@src/stores";
import { useFileDialog } from "@vueuse/core";
import { computed, watch } from "vue";

const $store = useStore();
const { files, open, reset } = useFileDialog();

withDefaults(
  defineProps<{ uploadedUrl?: string | null; type?: "image" | "audio" }>(),
  { type: "image" }
);
const emits = defineEmits<{
  (e: "delete"): void;
  (e: "fileAdded", file: FileList): Promise<void>;
}>();

const localFileUrl = computed(() => {
  if (!files.value || (files.value?.length ?? 0) <= 0) return;

  return URL.createObjectURL(files.value[0]);
});

watch(files, async () => {
  if (files.value && (files.value?.length ?? 0) > 0) {
    await emits("fileAdded", files.value);
    reset();
  }
});
</script>

<template>
  <label
    for="media"
    class="relative w-28 rounded-lg overflow-hidden hover:brightness-75 cursor-pointer transition-all"
    @click.stop="
      () =>
        open({
          accept:
            type === 'image'
              ? $store.app.allowedImageFormat
              : $store.app.allowedAudioFormat,
        })
    "
  >
    <!-- If there's no locally selected url or uploaded url, show default logo -->
    <div
      v-if="!localFileUrl && !uploadedUrl"
      class="w-full h-full bg-secondary-light flex items-center justify-center"
    >
      <q-icon
        :name="type === 'image' ? `eva-image-outline` : `eva-music-outline`"
        size="2rem"
      />
    </div>

    <q-img
      v-else-if="type === 'image'"
      :src="localFileUrl || (uploadedUrl ?? '')"
      alt="profile picture"
      class="w-full h-full"
      fit="cover"
    />

    <div
      v-else
      class="w-full h-full bg-secondary-light flex items-center justify-center"
    >
      <q-icon name="eva-activity" size="2rem" />
    </div>

    <button
      @click.stop="
        () => {
          $emit('delete');
          reset();
        }
      "
      class="absolute top-1 right-1 bg-white rounded-full p-0.5"
    >
      <q-icon name="eva-trash-2-outline" size="1.25rem" />
    </button>
  </label>
</template>

<style scoped></style>
