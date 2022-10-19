<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const navLinks = [
  {
    text: "Home",
    to: "/",
  },
  {
    text: "Appearance",
    to: "/appearance",
  },
  {
    text: "Settings",
    to: "/settings",
  },
];

const router = useRouter();
const currentRoutePath = router.currentRoute.value.path;
</script>

<template>
  <q-page>
    <nav class="border-b border-gray-200 px-3 py-2">
      <a
        v-for="link in navLinks"
        :href="link.to"
        class="inline-block text-lg font-medium transition-all py-2 px-3 h-full hover:bg-gray-50 rounded-lg"
        :class="{ 'text-gray-400': currentRoutePath !== link.to }"
        >{{ link.text }}</a
      >
    </nav>
    <router-view />
  </q-page>
</template>

<style scoped></style>
