<script setup lang="ts">
import { OpenAPI } from "@common/webapi";

OpenAPI.BASE = import.meta.env.VITE_WEBAPI_URL;
</script>

<template>
  <router-view />
</template>

<style scoped></style>
