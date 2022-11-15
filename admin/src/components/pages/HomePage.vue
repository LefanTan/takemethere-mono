<script setup lang="ts">
import draggable from "vuedraggable";
import { watchDebounced } from "@vueuse/core";
import { storeToRefs } from "pinia";
import isEquals from "lodash.isequal";

import { plural } from "@lib/helpers";
import useStore from "@src/stores";
import IconButton from "../buttons/IconButton.vue";
import LinkEntryCardSection from "../cardSections/LinkEntryCardSection.vue";
import ReviewEntryCardSection from "../cardSections/ReviewEntryCardSection.vue";
import { PageEntriesWithData } from "@common/types/client";
import AudioSnippetCardSection from "../cardSections/AudioSnippetCardSection.vue";

const $store = useStore();

await $store.page.loadPage();
const { pageEntries } = storeToRefs($store.page);

watchDebounced(
  pageEntries,
  async () => {
    if (!pageEntries.value) return;

    // Update pageEntries if pageEntries have changed
    if (!isEquals(pageEntries.value, $store.page.oldPageEntries)) {
      await $store.page.updatePage();
    }
  },
  { deep: true, debounce: 250 }
);

function dragEnd() {
  pageEntries.value = pageEntries.value.map((entry, i) => ({
    ...entry,
    order: pageEntries.value.length - i,
  }));
}

function getTitleText(entry: PageEntriesWithData) {
  // There should have been an enum in PageEntry

  if (entry.link) return "Link";
  else if (entry.review) return "Review";
  else if (entry.blog) return "Blog";
  else if (entry.audioSnippet) return "Audio Snippet";
  else return "Title";
}
</script>

<template>
  <div class="p-5">
    <div class="flex gap-2">
      <q-btn
        label="Add Link"
        class="takeme-button black"
        @click="$store.page.addEntry('Link')"
      />
      <q-btn
        label="Add Restaurant Review"
        class="takeme-button black"
        @click="$store.page.addEntry('Review')"
      />
      <q-btn
        label="Add Blog"
        class="takeme-button black"
        @click="$store.page.addEntry('Blog')"
      />
      <q-btn
        label="Add Audio Snippet"
        class="takeme-button black"
        @click="$store.page.addEntry('AudioSnippet')"
      />
      <q-btn
        label="Add Title Text"
        class="takeme-button black"
        @click="$store.page.addEntry('Title')"
      />
    </div>

    <draggable
      v-if="(pageEntries?.length ?? 0) > 0"
      v-model="pageEntries"
      item-key="id"
      handle=".handle"
      class="flex flex-col gap-4 my-6"
      @end="dragEnd"
    >
      <template
        #item="{
          element,
          index,
        }: {
          element: PageEntriesWithData,
          index: number,
        }"
      >
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
                class="justify-end mb-4 [&>button]:ml-4"
              >
                <h4 class="mr-auto">
                  {{ getTitleText(element) }}
                </h4>
                <template v-if="element.review || element.link || element.blog">
                  <div class="flex items-center gap-2">
                    {{ plural(element.click ?? 0, "click") }}
                    <icon-button name="ads_click" tooltip-label="Clicks" />
                  </div>
                  <icon-button
                    name="eva-bar-chart-2-outline"
                    tooltip-label="View analytic (coming soon?)"
                  />
                  <icon-button
                    :name="
                      element.hidden ? 'eva-eye-off-outline' : 'eva-eye-outline'
                    "
                    tooltip-label="Hide this link"
                    @click="element.hidden = !element.hidden"
                  />
                </template>
                <icon-button
                  name="eva-trash-2-outline"
                  tooltip-label="Delete this link"
                  @click="$store.page.deleteEntry(element.id ?? '')"
                />
              </q-card-section>

              <!-- Link Entry -->
              <link-entry-card-section
                :page-entry-index="index"
                v-if="element.link"
              />

              <!-- Review Entry -->
              <review-entry-card-section
                :page-entry-index="index"
                v-else-if="element.review"
              />

              <div v-else-if="element.blog" class="flex flex-col">
                <div class="rounded-lg shadow-lg p-4">
                  <strong class="text-lg">{{ element.blog.title }}</strong>
                  <p>{{ element.blog.description }}</p>
                </div>
                <q-btn
                  :to="`/blog/${element.blog.id}`"
                  label="Edit Blog"
                  class="takeme-button black self-end mt-4"
                />
              </div>

              <audio-snippet-card-section
                :page-entry-index="index"
                v-else-if="element.audioSnippet"
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
