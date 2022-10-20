<script setup lang="ts">
import router from "@src/routes";
import useStore from "@src/stores";
import { ref, watch } from "vue";

const $store = useStore();

const signInEmail = ref("");
const signInPassword = ref("");

async function signIn() {
  try {
    await $store.app.signin(signInEmail.value, signInPassword.value);
    router.push("/");
  } catch (e) {
    console.error(e);
  }
}
</script>

<template>
  <!-- <router-view /> -->
  <q-input label="Email" v-model="signInEmail" />
  <q-input label="Password" v-model="signInPassword" type="password" />
  <q-btn label="Login" @click="signIn" />
</template>

<style scoped></style>
