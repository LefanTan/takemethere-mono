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

const currentRoutePath = computed(() => router.currentRoute.value.path);
</script>

<template>
  <q-layout view="lhr lpr lfr">
    <q-drawer
      v-model="showLeftDrawer"
      side="left"
      :width="75"
      class="p-3 flex flex-col"
      bordered
    >
      <!-- replace with logo -->
      <q-img
        src="https://i.pinimg.com/originals/7f/c7/17/7fc717724414a8f51fbb592c1a36b33d.png"
        fit="contain"
      />
      <q-img
        class="mt-auto rounded-full cursor-pointer"
        :ratio="1"
        src="https://lefantan.com/static/media/tv_photo.918d5f50d9927464c4a4.jpg"
      >
        <q-popup-proxy :offset="[-40, 10]">
          <q-card class="py-3 rounded-lg">
            <strong class="px-6">Lefan</strong>
            <q-card-section class="px-3 py-0">
              <q-list class="mt-2">
                <q-item class="rounded-lg px-3" clickable>
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
        name="eva-log-out"
        tooltip-label="Logout"
        :tooltip-props="{
          offset: [40, 0],
          anchor: 'center end',
          self: 'center middle',
        }"
        size="2rem"
        class="mt-3 rotate-180"
        @click="$store.app.logout()"
      />
    </q-drawer>

    <q-drawer v-model="showRightDrawer" side="right" :width="400" bordered>
      <Suspense>
        <preview />

        <template #fallback> Loading... </template>
      </Suspense>
    </q-drawer>

    <q-page-container class="flex flex-col min-h-0 max-h-screen flex-nowrap">
      <nav class="border-b border-gray-200 px-3 py-2">
        <router-link
          v-for="link in navLinks"
          :to="link.to"
          class="inline-block text-lg font-medium transition-all py-2 px-3 h-full hover:bg-gray-50 rounded-lg"
          :class="{ 'text-gray-400': currentRoutePath !== link.to }"
          >{{ link.text }}</router-link
        >
      </nav>
      <q-page class="overflow-auto flex-1" style="min-height: 0px">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
