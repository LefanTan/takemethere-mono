<script setup lang="ts">
import { PageEntriesWithBlogAndLink } from "@common/types/client";
import FileInput from "../FileInput.vue";

defineProps<{ pageEntry: PageEntriesWithBlogAndLink }>();
</script>

<template>
  <q-card-section class="flex-1 p-0 [&>*]:mb-2" v-if="pageEntry.blog">
    <q-card-section horizontal>
      <file-input class="mr-4" />
      <div class="flex flex-col flex-1 [&>*]:mb-2">
        <q-input
          standout
          dense
          placeholder="Restaurant Name"
          v-model="pageEntry.blog.name"
        />
        <q-input
          standout
          dense
          placeholder="Location"
          v-model="pageEntry.blog.location"
        />
        <div class="flex items-end self-end">
          <q-input
            standout
            dense
            placeholder="Rating"
            type="number"
            :model-value="pageEntry.blog.rating"
            @update:model-value="(val: any) => pageEntry.blog!.rating = parseFloat(val)"
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
        v-model="pageEntry.blog.firstButtonText"
      />
      <q-input
        standout
        dense
        placeholder="Link attached to Button #1"
        class="flex-1"
        v-model="pageEntry.blog.firstButtonLink"
      />
    </q-card-section>

    <q-card-section horizontal class="flex">
      <q-input
        standout
        dense
        placeholder="Button #2 Name"
        type="url"
        class="basis-2/5 mr-2"
        v-model="pageEntry.blog.secondButtonText"
      />
      <q-input
        standout
        dense
        placeholder="Link attached to Button #2"
        class="flex-1"
        v-model="pageEntry.blog.secondButtonLink"
      />
    </q-card-section>

    <q-input
      standout
      dense
      placeholder="Enter a short review!"
      type="textarea"
      class="test"
      v-model="pageEntry.blog.shortReview"
    />
  </q-card-section>
</template>

<style></style>
