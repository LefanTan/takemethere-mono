<script setup lang="ts">
import { computed } from "vue";
import IconButton from "@src/components/buttons/IconButton.vue";
import useStore from "@src/stores";
import UserProfile from "./UserProfile.vue";

const $store = useStore();
</script>

<template>
  <div class="p-3 flex flex-col no-wrap items-center shadow-lg">
    <router-link to="/" class="h-12 w-full">
      <q-img
        src="https://storage.googleapis.com/takeme-public-assets/compact-logo.png"
        fit="contain"
        class="block"
        img-class="block"
      />
    </router-link>

    <UserProfile class="w-16 h-16 mt-6" />

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
  </div>
</template>

<style scoped></style>
