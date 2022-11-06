<script setup lang="ts">
import { onMounted } from "vue";
import { v4 as uuid } from "uuid";
import draggable from "vuedraggable";
import { watchDebounced } from "@vueuse/core";
import isEquals from "lodash.isequal";

import { PageWithEntries } from "@common/types/client";
import { PagesService } from "@common/webapi";
import { deepCopy } from "@firebase/util";
import useStore from "@src/stores";
import IconButton from "../buttons/IconButton.vue";
import LinkEntryCardSection from "../cardSections/LinkEntryCardSection.vue";
import BlogEntryCardSection from "../cardSections/BlogEntryCardSection.vue";
import { storeToRefs } from "pinia";

const $store = useStore();

let oldPage: PageWithEntries;
const { page } = storeToRefs($store.app);

async function loadData() {
  const loadedPage: PageWithEntries = await PagesService.getPage();

  page.value = loadedPage;
  page.value.pageEntries.sort((a, b) => (b.order ?? 0) - (a.order ?? 0));

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
      const orderedEntries = page.value.pageEntries.map((entry, i) => ({
        ...entry,
        order: page.value!.pageEntries.length - i,
      }));

      const result = await PagesService.putPagePageEntries(undefined, {
        pageEntries: orderedEntries,
      });

      $store.app.updatePreview();
      oldPage = deepCopy(page.value);

      console.log("Saved", result);
    }
  },
  { deep: true, debounce: 500 }
);

async function addEntry(type: "Link" | "Blog" | "Category") {
  if (!page.value?.id) return;

  const newId = uuid();
  const newEntryId = uuid();
  const newOrder = page.value.pageEntries.length + 1;

  if (type === "Blog") {
    page.value.pageEntries.push({
      id: newEntryId,
      pageId: page.value.id,
      blog: {
        id: newId,
        name: "",
        pageEntryId: newEntryId,
      },
      order: newOrder,
    });
  } else if (type === "Link") {
    page.value.pageEntries.push({
      id: newEntryId,
      pageId: page.value.id,
      link: {
        id: newId,
        displayText: "",
        link: "",
        pageEntryId: newEntryId,
      },
      order: newOrder,
    });
  } else {
    page.value.pageEntries.push({
      id: newEntryId,
      pageId: page.value.id,
      title: "",
      order: newOrder,
    });
  }

  // Sort by createdAt, descending order
  page.value.pageEntries.sort((a, b) => (b.order ?? 0) - (a.order ?? 0));
}

function deleteEntry(entryId: string) {
  if (!page.value) return;

  page.value.pageEntries = page.value?.pageEntries.filter(
    (entry) => entry.id !== entryId
  );
}

function dragEnd() {
  if (!page.value) return;

  page.value.pageEntries = page.value.pageEntries.map((entry, i) => ({
    ...entry,
    order: page.value!.pageEntries.length - i,
  }));
}
</script>

<template>
  <div class="p-5">
    <div class="flex gap-2">
      <q-btn
        label="Add Link"
        class="takeme-button black"
        @click="addEntry('Link')"
      />
      <q-btn
        label="Add Restaurant Blog"
        class="takeme-button black"
        @click="addEntry('Blog')"
      />
      <q-btn
        label="Add Category"
        class="takeme-button black"
        @click="addEntry('Category')"
      />
    </div>

    <draggable
      v-if="page && (page.pageEntries?.length ?? 0) > 0"
      v-model="page.pageEntries"
      item-key="id"
      handle=".handle"
      class="flex flex-col gap-4 my-6"
      @end="dragEnd"
    >
      <template #item="{ element }">
        <q-card>
          <q-card-section horizontal class="px-4">
            <q-icon
              name="drag_indicator"
              size="1rem"
              class="handle self-center"
            />

            <q-card-section class="flex-1">
              <q-card-section
                horizontal
                class="justify-end mb-4 [&>button]:pl-4"
              >
                <h4 class="mr-auto">
                  {{
                    element.link
                      ? "Link"
                      : element.blog
                      ? "Restaurant"
                      : "Category Title"
                  }}
                </h4>
                <template v-if="element.blog || element.link">
                  <icon-button
                    name="eva-bar-chart-2-outline"
                    tooltip-label="View analytic"
                    @click="deleteEntry(element.id ?? '')"
                  />
                  <icon-button
                    name="eva-eye-outline"
                    tooltip-label="Hide this link"
                    @click="deleteEntry(element.id ?? '')"
                  />
                  <icon-button
                    name="eva-trash-2-outline"
                    tooltip-label="Delete this link"
                    @click="deleteEntry(element.id ?? '')"
                  />
                </template>
              </q-card-section>

              <!-- Link Entry -->
              <link-entry-card-section
                :page-entry="element"
                v-if="element.link"
              />

              <!-- Blog Entry -->
              <blog-entry-card-section
                :page-entry="element"
                v-else-if="element.blog"
              />

              <!-- Category title Entry -->
              <q-card-section class="flex-1 p-0" v-else>
                <q-input
                  standout
                  dense
                  placeholder="Category Title"
                  v-model="element.title"
                />
              </q-card-section>
            </q-card-section>
          </q-card-section>
        </q-card>
      </template>
    </draggable>
  </div>
</template>

<style scoped></style>
