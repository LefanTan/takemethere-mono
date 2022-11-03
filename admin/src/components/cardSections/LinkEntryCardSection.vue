<script setup lang="ts">
import { PageEntriesWithBlogAndLink } from "@common/types/client";

defineProps<{ pageEntry: PageEntriesWithBlogAndLink }>();
</script>

<template>
  <q-card-section class="flex-1 p-0 [&>*]:mb-2" v-if="pageEntry.link">
    <q-input
      standout
      dense
      placeholder="Display Text"
      v-model="pageEntry.link!.displayText"
    />
    <q-input standout dense placeholder="Link" v-model="pageEntry.link!.link" />
    <q-input
      standout
      dense
      placeholder="Photo Url"
      type="url"
      v-model="pageEntry.link.mediaUrl"
    />
  </q-card-section>
</template>

<style scoped></style>
