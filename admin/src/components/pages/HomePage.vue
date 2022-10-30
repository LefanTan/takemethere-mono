<script setup lang="ts">
import { onMounted, ref } from "vue";
import { v4 as uuid } from "uuid";
import { useQuasar } from "quasar";
import draggable from "vuedraggable";
import { watchDebounced } from "@vueuse/core";
import isEquals from "lodash.isequal";

import { PageWithEntries } from "@common/types/client";
import { PagesService } from "@common/webapi";
import { deepCopy } from "@firebase/util";
import useStore from "@src/stores";
import IconButton from "../buttons/IconButton.vue";

const $store = useStore();

let oldPage: PageWithEntries;
const page = ref<PageWithEntries>();

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

      const result = await PagesService.putPagePageEntries({
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
              </q-card-section>

              <!-- Link Entry -->
              <q-card-section class="flex-1 p-0 [&>*]:mb-2" v-if="element.link">
                <q-input
                  standout
                  dense
                  placeholder="Display Text"
                  v-model="element.link!.displayText"
                />
                <q-input
                  standout
                  dense
                  placeholder="Link"
                  v-model="element.link!.link"
                />
                <q-input
                  standout
                  dense
                  placeholder="Photo Url"
                  type="url"
                  v-model="element.link.mediaUrl"
                />
              </q-card-section>

              <!-- Blog Entry -->
              <q-card-section
                class="flex-1 p-0 [&>*]:mb-2"
                v-else-if="element.blog"
              >
                <q-input
                  standout
                  dense
                  placeholder="Restaurant Name"
                  v-model="element.blog!.name"
                />
                <q-input
                  standout
                  dense
                  placeholder="Location"
                  v-model="element.blog!.location"
                />
                <q-input
                  standout
                  dense
                  placeholder="Rating"
                  type="number"
                  :model-value="element.blog!.rating"
                  @update:model-value="(val: any) => element.blog!.rating = parseFloat(val)"
                />
                <q-input
                  standout
                  dense
                  placeholder="Photo Url"
                  type="url"
                  v-model="element.blog.mediaUrl"
                />
                <q-input
                  standout
                  dense
                  placeholder="External Link"
                  v-model="element.blog!.externalLink"
                />
              </q-card-section>

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
