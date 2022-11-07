<script setup lang="ts">
import { ref } from "vue";

import router from "@src/routes";
import useStore from "@src/stores";

const $store = useStore();

const signInUsername = ref("");
const signInPassword = ref("");

async function signIn() {
  try {
    await $store.app.signin(signInUsername.value, signInPassword.value);
    router.push("/");
  } catch (e) {
    console.error(e);
  }
}
</script>

<template>
  <q-page>
    <q-input label="Username" v-model="signInUsername" />
    <q-input label="Password" v-model="signInPassword" type="password" />
    <q-btn label="Login" @click="signIn" />

    <router-link to="/signup"> already have account? </router-link>
  </q-page>
</template>

<style scoped></style>
