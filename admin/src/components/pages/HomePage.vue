<script setup lang="ts">
import { UsersService } from "@common/webapi";
import { PageEntry } from "@common/types";
import { onMounted } from "vue";

async function loadData() {
  const pageEntries: PageEntry[] = await UsersService.getUsersAllEntries();
  console.log(pageEntries);
}

onMounted(() => {
  loadData();
});
</script>

<template>
  <div class="p-5">
    <div class="flex gap-2">
      <q-btn label="Add Link" /> <q-btn label="Add Restaurant Blog" />
    </div>

    <div class="flex flex-col mt-4 gap-4">
      <!-- Link Entry -->
      <q-card>
        <q-card-section>
          <q-input label="Display Text" />
          <q-input label="Link" />
        </q-card-section>
        <q-card-actions>
          <q-btn label="Save" color="primary" class="ml-auto" />
        </q-card-actions>
      </q-card>

      <!-- Blog Entry -->
      <q-card>
        <q-card-section>
          <q-input label="Restaurant Name" />
          <q-input label="Location" />
          <q-input label="Rating" type="number" />
          <q-input label="External Link" />
        </q-card-section>
        <q-card-actions>
          <q-btn label="Save" color="primary" class="ml-auto" />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<style scoped></style>
