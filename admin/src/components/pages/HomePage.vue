<script setup lang="ts">
import { onMounted, ref } from "vue";
import { v4 as uuid } from "uuid";
import { useQuasar } from "quasar";
import { watchDebounced } from "@vueuse/core";
import isEquals from "lodash.isequal";

import { PageWithEntries } from "@common/types/client";
import { PagesService } from "@common/webapi";
import { deepCopy } from "@firebase/util";

const $q = useQuasar();

let oldPage: PageWithEntries;
const page = ref<PageWithEntries>();

async function loadData() {
  const loadedPage: PageWithEntries = await PagesService.getPage();

  page.value = loadedPage;
  oldPage = deepCopy(page.value);
}

onMounted(() => {
  loadData();
});

watchDebounced(
  page,
  async () => {
    if (!page.value) return;

    // Update pageEntries if pageEntries have changed
    if (!isEquals(page.value.pageEntries, oldPage.pageEntries)) {
      const newPage = await PagesService.putPagePageEntries({
        pageEntries: page.value.pageEntries,
      });
      console.log(newPage);
    } else oldPage = deepCopy(page.value);
  },
  { deep: true, debounce: 500 }
);

async function addEntry(type: "Link" | "Blog") {
  if (!page.value?.id) return;

  const newId = uuid();
  const newEntryId = uuid();

  if (type === "Blog") {
    page.value.pageEntries.push({
      id: newEntryId,
      pageId: page.value.id,
      blog: {
        id: newId,
        name: "",
        pageEntryId: newEntryId,
      },
      link: null,
      createdAt: new Date(),
    });
  } else {
    page.value.pageEntries.push({
      id: newEntryId,
      pageId: page.value.id,
      blog: null,
      link: {
        id: newId,
        displayText: "",
        link: "",
        pageEntryId: newEntryId,
      },
      createdAt: new Date(),
    });
  }

  // Sort by createdAt, descending order
  page.value.pageEntries.sort((a, b) => {
    if (!a.createdAt || !b.createdAt) return 0;

    if (new Date(a.createdAt) > new Date(b.createdAt)) return -1;
    return 1;
  });
}

function deleteEntry(entryId: string) {
  if (!page.value) return;

  page.value.pageEntries = page.value?.pageEntries.filter(
    (entry) => entry.id !== entryId
  );
}
</script>

<template>
  <div class="p-5">
    <div class="flex gap-2">
      <q-btn label="Add Link" @click="addEntry('Link')" />
      <q-btn label="Add Restaurant Blog" @click="addEntry('Blog')" />
    </div>

    <div class="flex flex-col mt-4 gap-4">
      <template
        v-if="page && (page.pageEntries?.length ?? 0) > 0"
        v-for="entry in page.pageEntries"
      >
        <!-- Link Entry -->
        <q-card v-if="entry.link">
          <q-card-section>
            <q-input label="Display Text" v-model="entry.link!.displayText" />
            <q-input label="Link" v-model="entry.link!.link" />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              label="Delete"
              color="secondary"
              @click="deleteEntry(entry.id ?? '')"
            />
          </q-card-actions>
        </q-card>

        <!-- Blog Entry -->
        <q-card v-else-if="entry.blog">
          <q-card-section>
            <q-input label="Restaurant Name" v-model="entry.blog!.name" />
            <q-input label="Location" v-model="entry.blog!.location" />
            <q-input
              label="Rating"
              type="number"
              v-model="entry.blog!.rating"
            />
            <q-input label="External Link" v-model="entry.blog!.externalLink" />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              label="Delete"
              color="secondary"
              @click="deleteEntry(entry.id ?? '')"
            />
          </q-card-actions>
        </q-card>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
