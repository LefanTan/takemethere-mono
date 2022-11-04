<script setup lang="ts">
import useStore from "@src/stores";
import { useFileDialog } from "@vueuse/core";
import { computed, watch } from "vue";

const $store = useStore();
const { files, open, reset } = useFileDialog();

defineProps<{ uploadedUrl?: string | null }>();
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
    @click.stop="() => open({ accept: $store.app.allowedMediaFormat })"
  >
    <!-- If there's no locally selected url or uploaded url, show default logo -->
    <div
      v-if="!localFileUrl && !uploadedUrl"
      class="w-full h-full bg-secondary-light flex items-center justify-center"
    >
      <q-icon name="eva-image-outline" size="2rem" />
    </div>

    <q-img
      v-else
      :src="localFileUrl || (uploadedUrl ?? '')"
      alt="profile picture"
      class="w-full h-full"
      fit="cover"
    />

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
