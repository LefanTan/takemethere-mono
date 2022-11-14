<script setup lang="ts">
import { watchDebounced } from "@vueuse/shared";
import isEqual from "lodash.isequal";
import { computed, ref, watch } from "vue";

import { deepCopy } from "@src/lib/helpers";
import useStore from "@src/stores";
import { UsersService } from "@common/webapi/services/UsersService";
import { MediasService } from "@common/webapi/services/MediasService";
import { User } from "@common/types";
import FileInput from "../FileInput.vue";

const $store = useStore();
const takeMeUserData = $store.app.takeMeUser ?? ({} as User);

const user = ref(takeMeUserData);

// To be used as comparison with user to see if there's changes made
let oldUser = deepCopy(user.value);

watchDebounced(
  user,
  async () => {
    if (!isEqual(user.value, oldUser)) {
      // Call API
      await UsersService.putUsers(undefined, user.value);

      $store.app.updatePreview();
      console.log("Update OK");
      oldUser = deepCopy(user.value);
    }
  },
  { deep: true, debounce: 250 }
);

async function onFileAdded(files: FileList) {
  const res = await MediasService.postMediaAddProfilePicture(files[0]);

  // Assign newly upload media to user's object
  user.value.profileMediaUrl = res;
}

function deleteCurrentProfilePicture() {
  const splitUrl = user.value.profileMediaUrl?.split("/") ?? [];

  // Grab the file name and Call api to delete current profile picture
  MediasService.deleteMedia(splitUrl[splitUrl?.length - 1]);

  user.value.profileMediaUrl = null;
}
</script>

<template>
  <div class="p-5">
    <q-card>
      <q-card-section class="flex flex-col gap-2">
        <div class="flex items-end">
          <file-input
            :uploaded-url="user.profileMediaUrl"
            @file-added="onFileAdded"
            @delete="deleteCurrentProfilePicture"
            class="h-28"
          />

          <!-- Add validation to be non null -->
          <q-input
            standout
            dense
            v-model="user.displayName"
            placeholder="Display name"
            class="flex-1 ml-4 takeme-input"
          />
        </div>

        <q-editor
          class="mt-4"
          placeholder="Add your own Bio here (make it interesting :D)"
          :model-value="user.bio ?? ''"
          @update:model-value="(val: string) => user.bio = val"
          min-height="5rem"
          :toolbar="[
            [
              {
                label: $q.lang.editor.align,
                icon: $q.iconSet.editor.align,
                fixedLabel: true,
                list: 'only-icons',
                options: ['left', 'center', 'right', 'justify'],
              },
            ],
            [
              'bold',
              'italic',
              'strike',
              'underline',
              'subscript',
              'superscript',
            ],
            ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
            ['undo', 'redo'],
            ['viewsource'],
          ]"
        />

        <q-card-section horizontal class="flex items-center mt-2">
          <q-icon size="1.25rem" name="eva-email-outline" class="mr-2" />
          <q-input
            v-model="user.externalEmail"
            dense
            placeholder="Add your contact email"
            standout
            class="flex-1"
          />
        </q-card-section>

        <q-card-section horizontal class="flex items-center">
          <q-icon size="1.25rem" name="fa-brands fa-tiktok" class="mr-2" />
          <q-input
            v-model="user.tiktokUrl"
            placeholder="Add a Tiktok Url"
            standout
            dense
            class="flex-1"
          />
        </q-card-section>

        <q-card-section horizontal class="flex items-center">
          <q-icon size="1.25rem" name="fa-brands fa-instagram" class="mr-2" />
          <q-input
            v-model="user.instagramUrl"
            placeholder="Add a Instagram Url"
            standout
            dense
            class="flex-1"
          />
        </q-card-section>

        <q-card-section horizontal class="flex items-center">
          <q-icon size="1.25rem" name="fa-brands fa-youtube" class="mr-2" />
          <q-input
            v-model="user.youtubeUrl"
            dense
            placeholder="Add a Youtube Url"
            standout
            class="flex-1"
          />
        </q-card-section>

        <q-card-section horizontal class="flex items-center">
          <q-icon size="1.25rem" name="eva-twitter" class="mr-2" />
          <q-input
            v-model="user.twitterUrl"
            dense
            placeholder="Add a Twitter Url"
            standout
            class="flex-1"
          />
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped></style>
