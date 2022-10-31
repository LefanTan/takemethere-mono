<script setup lang="ts">
import { useQuasar } from "quasar";
import { computed, ref, watch } from "vue";

import IconButton from "@src/components/buttons/IconButton.vue";
import Preview from "@components/Preview.vue";
import useStore from "@src/stores";
import router from "@routes/index";

const $q = useQuasar();
const $store = useStore();

const isMobile = computed(() => $q.screen.width < 1023);

const showLeftDrawer = ref(!isMobile.value);
const showRightDrawer = ref(!isMobile.value);

// To be used as Profile Picture if user hasn't uploaded any profile picture
const firstValidLetter = computed(() =>
  [...($store.app.takeMeUser?.displayName ?? "")]
    .find((char) => char.toUpperCase() != char.toLowerCase())
    ?.toUpperCase()
);

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
      side="left"
      :width="100"
      class="p-3 flex flex-col no-wrap items-center shadow-lg"
    >
      <!-- replace with logo -->
      <router-link to="/" class="h-12 w-full">
        <q-img
          src="https://storage.googleapis.com/takeme-public-assets/compact-logo.png"
          fit="contain"
          class="block"
          img-class="block"
        />
      </router-link>

      <q-img
        class="mt-6 h-16 w-16 rounded-full cursor-pointer"
        :class="{ 'bg-black': !$store.app.takeMeUser?.profileMediaUrl }"
        :ratio="1"
        :src="$store.app.takeMeUser?.profileMediaUrl ?? ''"
      >
        <h5
          v-if="!$store.app.takeMeUser?.profileMediaUrl"
          class="text-white absolute center-absolute font-semibold"
        >
          {{ firstValidLetter }}
        </h5>
        <q-popup-proxy :offset="[-40, 10]">
          <q-card class="py-3 rounded-lg">
            <strong class="px-6">Lefan</strong>
            <q-card-section class="px-3 py-0">
              <q-list class="mt-2">
                <q-item to="/profile" replace class="rounded-lg px-3" clickable>
                  <q-item-section> Account Settings </q-item-section>
                  <q-item-section side>
                    <q-icon name="eva-arrow-ios-forward" />
                  </q-item-section>
                </q-item>
                <q-item class="rounded-lg px-3" clickable>
                  <q-item-section> Upgrade to Premium </q-item-section>
                  <q-item-section side>
                    <q-icon name="eva-arrow-ios-forward" />
                  </q-item-section>
                </q-item>
              </q-list> </q-card-section
          ></q-card>
        </q-popup-proxy>
      </q-img>

      <icon-button
        name="eva-question-mark"
        tooltip-label="Get help"
        :tooltip-props="{
          offset: [40, 0],
          anchor: 'center end',
          self: 'center middle',
        }"
        size="2rem"
        class="mt-auto h-12 w-12 rounded-full bg-black text-white"
        @click="$store.app.logout()"
      />

      <icon-button
        name="eva-log-out"
        tooltip-label="Logout"
        :tooltip-props="{
          offset: [40, 0],
          anchor: 'center end',
          self: 'center middle',
        }"
        size="2rem"
        class="mt-2 rotate-180"
        @click="$store.app.logout()"
      />
    </q-drawer>

    <q-drawer
      v-model="showRightDrawer"
      side="right"
      :width="350"
      class="shadow-lg flex flex-col"
    >
      <Suspense>
        <preview />

        <template #fallback> Loading... </template>
      </Suspense>
    </q-drawer>

    <q-page-container class="flex flex-col min-h-0 max-h-screen flex-nowrap">
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
    </q-page-container>
  </q-layout>
</template>
