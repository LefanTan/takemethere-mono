<script setup lang="ts">
import { PageEntriesWithData } from "@common/types/client";
import { MediasService } from "@common/webapi";
import useStore from "@src/stores";
import FileInput from "../FileInput.vue";

const $store = useStore();

const props = defineProps<{ pageEntry: PageEntriesWithData }>();

// Assign newly upload media to pageEntry's Blog object
const pageEntryIndex = $store.page.page.pageEntries.findIndex(
  (entry) => entry.id === props.pageEntry.id
);

const review =
  pageEntryIndex !== -1
    ? $store.page.page.pageEntries[pageEntryIndex].review
    : undefined;

async function onFileAdded(files: FileList) {
  if (!props.pageEntry.review?.id) return;

  const res = await MediasService.postMediaAddToReview(
    props.pageEntry.review.id,
    files[0]
  );

  if (review) review.mediaUrl = res;
}

function deleteMedia() {
  if (!review?.mediaUrl) return;

  const splitUrl = review.mediaUrl.split("/") ?? [];

  // Grab the file name and Call api to delete current profile picture
  MediasService.deleteMedia(splitUrl[splitUrl?.length - 1]);

  review.mediaUrl = null;
}
</script>

<template>
  <q-card-section class="flex-1 p-0 [&>*]:mb-2" v-if="pageEntry.review">
    <q-card-section horizontal class="flex-col sm:flex-row">
      <file-input
        :uploaded-url="pageEntry.review.mediaUrl"
        @file-added="onFileAdded"
        @delete="deleteMedia"
        class="mr-4 mb-4 sm:mb-0"
      />
      <div class="flex flex-col flex-1 [&>*]:mb-2">
        <q-input
          standout
          dense
          placeholder="Restaurant Name"
          v-model="pageEntry.review.name"
        />
        <q-input
          standout
          dense
          placeholder="Location"
          v-model="pageEntry.review.location"
        />
        <div class="flex items-end sm:self-end">
          <q-input
            standout
            dense
            placeholder="Rating"
            type="number"
            :model-value="pageEntry.review.rating"
            @update:model-value="(val: any) => pageEntry.review!.rating = parseFloat(val)"
            class="mr-2"
          />
          <strong> / 10 </strong>
        </div>
      </div>
    </q-card-section>

    <q-card-section horizontal class="flex">
      <q-input
        standout
        dense
        placeholder="Button #1 Name"
        type="url"
        class="basis-2/5 mr-2"
        v-model="pageEntry.review.firstButtonText"
      />
      <q-input
        standout
        dense
        placeholder="Link attached to Button #1"
        class="flex-1"
        v-model="pageEntry.review.firstButtonLink"
      />
    </q-card-section>

    <q-card-section horizontal class="flex">
      <q-input
        standout
        dense
        placeholder="Button #2 Name"
        type="url"
        class="basis-2/5 mr-2"
        v-model="pageEntry.review.secondButtonText"
      />
      <q-input
        standout
        dense
        placeholder="Link attached to Button #2"
        class="flex-1"
        v-model="pageEntry.review.secondButtonLink"
      />
    </q-card-section>

    <q-input
      standout
      dense
      placeholder="Enter a short review!"
      type="textarea"
      class="test"
      :maxlength="350"
      v-model="pageEntry.review.shortReview"
    >
      <template #append>
        <p class="absolute bottom-2 right-2 text-black text-sm">
          {{ 350 - (pageEntry.review.shortReview?.length ?? 0) }}/350
        </p>
      </template>
    </q-input>
  </q-card-section>
</template>

<style></style>
