<script setup lang="ts">
import { ref } from "vue";
import IconButton from "@src/components/buttons/IconButton.vue";
import MainPage from "./MainPageLayout.vue";
import useStore from "@src/stores";

const $store = useStore();
const showDrawer = ref(true);
</script>

<template>
  <q-layout view="lhr lpr lfr">
    <q-drawer
      v-model="showDrawer"
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
    <q-drawer :model-value="true" side="right" :width="300" bordered>
      Iframe
    </q-drawer>

    <q-page-container>
      <main-page />
    </q-page-container>
  </q-layout>
</template>
