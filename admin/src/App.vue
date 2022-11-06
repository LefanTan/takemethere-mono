<script setup lang="ts">
import { OpenAPI } from "@common/webapi";
import { useQuasar } from "quasar";

OpenAPI.BASE = import.meta.env.VITE_WEBAPI_URL;

const $q = useQuasar();

$q.screen.setSizes({ sm: 640, md: 824, lg: 1024, xl: 1280 });
</script>

<template>
  <router-view />
</template>

<style scoped></style>
