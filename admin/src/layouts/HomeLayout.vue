<script setup lang="ts">
import { useQuasar } from "quasar";
import { computed, ref, watch } from "vue";

import Preview from "@components/Preview.vue";
import router from "@routes/index";
import UserNavBar from "@src/components/UserNavBar.vue";
import UserProfile from "@src/components/UserProfile.vue";

const $q = useQuasar();

const isMobile = computed(() => $q.screen.width < 1023);

const showLeftDrawer = ref(!isMobile.value);
const showRightDrawer = ref(!isMobile.value);

const rightDrawerSize = computed(() => {
  if ($q.screen.gt.sm) {
    if ($q.screen.gt.lg) {
      return 500;
    }
    return 400;
  }
  return $q.screen.width;
});

const navLinks = [
  {
    text: "Home",
    to: "/",
  },
  // {
  //   text: "Appearance",
  //   to: "/appearance",
  // },
  {
    text: "Profile",
    to: "/profile",
  },
  // {
  //   text: "Settings",
  //   to: "/settings",
  // },
];

const currentRoutePath = computed(() => router.currentRoute.value.path);
</script>

<template>
  <q-layout view="lhr lpr lfr" class="bg-secondary-light">
    <q-drawer
      v-model="showLeftDrawer"
      :breakpoint="$q.screen.sizes.md"
      show-if-above
      side="left"
      :width="100"
      class="flex"
    >
      <UserNavBar class="flex-1" />
    </q-drawer>

    <q-drawer
      v-model="showRightDrawer"
      :breakpoint="$q.screen.sizes.md"
      show-if-above
      side="right"
      :width="rightDrawerSize"
      class="shadow-lg flex flex-col gap-8"
    >
      <Suspense>
        <preview @close="showRightDrawer = false" />

        <template #fallback> Loading... </template>
      </Suspense>
    </q-drawer>

    <q-page-container class="flex flex-col min-h-0 max-h-screen flex-nowrap">
      <!-- Mobile only header -->
      <div
        class="only-mobile items-center justify-between w-full p-3 bg-white border-b-2 border-secondary-light"
      >
        <router-link to="/" class="w-28">
          <q-img
            src="https://storage.googleapis.com/takeme-public-assets/logo.png"
            fit="contain"
            class="block"
            img-class="block"
          />
        </router-link>
        <UserProfile class="w-12 h-12" />
      </div>
      <nav class="px-3 py-2 shadow-md z-10 bg-white">
        <router-link
          v-for="link in navLinks"
          :to="link.to"
          class="inline-block text-lg font-medium transition-all py-2 px-3 h-full hover:bg-gray-50 rounded-lg"
          :class="{ 'text-gray-400': currentRoutePath !== link.to }"
          >{{ link.text }}</router-link
        >
      </nav>
      <q-page class="overflow-auto flex-1" style="min-height: 0px">
        <Suspense>
          <router-view />
        </Suspense>
      </q-page>
      <q-btn
        label="Preview page"
        icon="eva-eye-outline"
        class="takeme-button black only-mobile fixed bottom-4 left-1/2 -translate-x-1/2"
        @click="showRightDrawer = true"
      />
    </q-page-container>
  </q-layout>
</template>
