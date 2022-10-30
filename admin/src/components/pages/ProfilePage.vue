<script setup lang="ts">
import { watchDebounced } from "@vueuse/shared";
import isEqual from "lodash.isequal";
import { computed, ref, watch } from "vue";

import { User } from "@common/types";
import { deepCopy } from "@src/lib/helpers";
import useStore from "@src/stores";
import { UsersService } from "@common/webapi/services/UsersService";
import { MediasService } from "@common/webapi/services/MediasService";
import { useFileDialog } from "@vueuse/core";

const $store = useStore();
const takeMeUserData = (await $store.app.getTakeMeUserData()) ?? ({} as User);

const user = ref(takeMeUserData);

// Profile Media
const { files, open, reset } = useFileDialog();

const localFileUrl = computed(() => {
  if (!files.value || (files.value?.length ?? 0) <= 0) return;

  return URL.createObjectURL(files.value[0]);
});

// To be used as comparison with user to see if there's changes made
let oldUser = deepCopy(user.value);

watchDebounced(
  user,
  async () => {
    if (!isEqual(user.value, oldUser)) {
      // Call API
      await UsersService.putUsers(user.value);

      $store.app.updatePreview();
      console.log("Update OK");
      oldUser = deepCopy(user.value);
    }
  },
  { deep: true, debounce: 500 }
);

watch(files, async () => {
  if (files.value && (files.value?.length ?? 0) > 0) {
    const res = await MediasService.postMediaAddProfilePicture(files.value[0]);

    // Assign newly upload media to user's object
    user.value.profileMediaUrl = res;

    // Reset local file url if there's any
    reset();
  }
});

function deleteCurrentProfilePicture() {
  if ((files.value?.length ?? 0) > 0) reset();

  const splitUrl = user.value.profileMediaUrl?.split("/") ?? [];

  // Call api to delete current profile picture
  MediasService.deleteMedia(splitUrl[splitUrl?.length - 1]);

  user.value.profileMediaUrl = null;
}
</script>

<template>
  <q-card>
    <q-card-section class="flex flex-col gap-2">
      <!-- Add validation to be non null -->
      <q-input v-model="user.displayName" label="Display name" />

      <p class="mt-2 font-medium mb-1">Profile Picture</p>
      <label
        class="relative h-28 w-28 rounded-lg overflow-hidden hover:brightness-75 cursor-pointer bg-gray-200 transition-all"
        @click="() => open({ accept: $store.app.allowedMediaFormat })"
      >
        <div
          v-if="!localFileUrl && !user.profileMediaUrl"
          class="w-full h-full bg-gray-200 flex items-center justify-center"
        >
          <q-icon name="eva-image-outline" size="2rem" />
        </div>

        <q-img
          v-else
          :src="localFileUrl || (user.profileMediaUrl ?? '')"
          alt="profile picture"
          class="w-full h-full"
          fit="cover"
        />

        <button
          @click.stop="deleteCurrentProfilePicture"
          class="absolute top-1 right-1 cursor-pointer"
        >
          <q-icon name="eva-trash-2" size="1.5rem" />
        </button>
      </label>

      <p class="mt-2 font-medium mb-1">Bio</p>
      <q-editor
        :model-value="user.bio ?? ''"
        @update:model-value="(val: string) => user.bio = val"
        min-height="5rem"
      />

      <q-input v-model="user.tiktokUrl" label="Tiktok URL" />
      <q-input v-model="user.instagramUrl" label="Instagram URL" />
      <q-input v-model="user.youtubeUrl" label="Youtube URL" />
    </q-card-section>
  </q-card>
</template>

<style scoped></style>