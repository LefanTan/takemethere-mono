<script setup lang="ts">
import { MediasService } from "@common/webapi";
import useStore from "@src/stores";
import FileInput from "../FileInput.vue";

const $store = useStore();

const props = defineProps<{ pageEntryIndex: number }>();
const review = $store.page.pageEntries[props.pageEntryIndex]?.review;

async function onFileAdded(files: FileList) {
  if (!review?.id) return;

  $store.app.deleteMediaGateway(review.mediaUrl ?? undefined);
  const res = await MediasService.postMediaAddToReview(review.id, files[0]);

  if (review) review.mediaUrl = res;
}

/**
 * Delete the media on storage and set media url to null (reset)
 */
function deleteMedia() {
  if (!review) return;
  $store.app.deleteMediaGateway(review.mediaUrl ?? undefined);
  review.mediaUrl = null;
}
</script>

<template>
  <q-card-section class="flex-1 p-0 [&>*]:mb-2" v-if="review">
    <q-card-section horizontal class="flex-col sm:flex-row">
      <file-input
        :uploaded-url="review.mediaUrl"
        @file-added="onFileAdded"
        @delete="deleteMedia"
        class="mr-2 mb-4 sm:mb-0 w-36 h-36"
      />
      <div class="flex flex-col flex-1 [&>*]:mb-2">
        <q-input
          standout
          dense
          placeholder="Restaurant Name"
          v-model="review.name"
        />
        <q-input
          standout
          dense
          placeholder="Location"
          v-model="review.location"
        />
        <div class="flex items-end sm:self-end">
          <q-input
            standout
            dense
            placeholder="Rating"
            type="number"
            :model-value="review.rating"
            @update:model-value="(val: any) => review!.rating = parseFloat(val)"
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
        v-model="review.firstButtonText"
      />
      <q-input
        standout
        dense
        placeholder="Link attached to Button #1"
        class="flex-1"
        v-model="review.firstButtonLink"
      />
    </q-card-section>

    <q-card-section horizontal class="flex">
      <q-input
        standout
        dense
        placeholder="Button #2 Name"
        type="url"
        class="basis-2/5 mr-2"
        v-model="review.secondButtonText"
      />
      <q-input
        standout
        dense
        placeholder="Link attached to Button #2"
        class="flex-1"
        v-model="review.secondButtonLink"
      />
    </q-card-section>

    <q-input
      standout
      dense
      placeholder="Enter a short review!"
      type="textarea"
      class="test"
      :maxlength="350"
      v-model="review.shortReview"
    >
      <template #append>
        <p class="absolute bottom-2 right-2 text-black text-sm">
          {{ 350 - (review.shortReview?.length ?? 0) }}/350
        </p>
      </template>
    </q-input>
  </q-card-section>
</template>

<style></style>
