<script setup lang="ts">
import { ref } from "vue";

const showDrawer = ref(true);
</script>

<template>
  <q-layout view="lhr lpr lfr">
    <q-header> Header </q-header>

    <q-drawer v-model="showDrawer" side="left" :width="300"> Drawer </q-drawer>
    <q-drawer :model-value="true" side="right" :width="300"> Iframe </q-drawer>

    <q-page-container>
      <q-page> bro </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
