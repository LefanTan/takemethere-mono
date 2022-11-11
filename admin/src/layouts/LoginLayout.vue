<script setup lang="ts">
import { useQuasar } from "quasar";
import { computed } from "vue";

const $q = useQuasar();

const rightDrawerSize = computed(() => {
  return $q.screen.gt.md ? 600 : 400;
});
</script>

<template>
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-drawer
      :breakpoint="$q.screen.sizes.md"
      show-if-above
      side="right"
      :width="rightDrawerSize"
      class="bg-beige flex p-10 pb-0"
    >
      <q-img
        src="https://storage.googleapis.com/takeme-public-assets/takeme/login-illustration.png"
        class="w-full h-full flex-1"
        fit="contain"
      />
    </q-drawer>
  </q-layout>
</template>

<style scoped></style>
