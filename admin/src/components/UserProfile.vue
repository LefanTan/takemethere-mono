<script setup lang="ts">
import useStore from "@src/stores";
import { computed } from "vue";

const $store = useStore();

// To be used as Profile Picture if user hasn't uploaded any profile picture
const firstValidLetter = computed(() =>
  [...($store.app.takeMeUser?.displayName ?? "")]
    .find((char) => char.toUpperCase() != char.toLowerCase())
    ?.toUpperCase()
);
</script>

<template>
  <q-img
    class="rounded-full cursor-pointer"
    :class="{ 'bg-black': !$store.app.takeMeUser?.profileMediaUrl }"
    :ratio="1"
    :src="$store.app.takeMeUser?.profileMediaUrl ?? ''"
  >
    <h3
      v-if="!$store.app.takeMeUser?.profileMediaUrl"
      class="text-white absolute center-absolute"
    >
      {{ firstValidLetter }}
    </h3>
    <q-popup-proxy :offset="[-40, 10]">
      <q-card class="py-3 rounded-lg">
        <strong class="px-6">{{ $store.app.takeMeUser?.username }}</strong>
        <q-card-section class="px-3 py-0">
          <q-list class="mt-2">
            <q-item to="/profile" replace class="rounded-lg px-3" clickable>
              <q-item-section> Account Settings </q-item-section>
              <q-item-section side>
                <q-icon name="eva-arrow-ios-forward" />
              </q-item-section>
            </q-item>
            <q-item
              tag="a"
              href="mailto:lefantan@hotmail.com"
              class="rounded-lg px-3"
              clickable
            >
              <q-item-section> Get Help </q-item-section>
              <q-item-section side>
                <q-icon name="eva-arrow-ios-forward" />
              </q-item-section>
            </q-item>
            <q-item
              class="rounded-lg px-3"
              clickable
              @click="$store.app.logout()"
            >
              <q-item-section> Logout </q-item-section>
            </q-item>
          </q-list>
        </q-card-section></q-card
      >
    </q-popup-proxy>
  </q-img>
</template>

<style scoped></style>
