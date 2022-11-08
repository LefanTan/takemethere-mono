<script setup lang="ts">
import {
  isFieldRequired,
  isUsernameValid,
  isPasswordValid,
} from "@lib/validation";
import router from "@src/routes";
import useStore from "@src/stores";

import { ref } from "vue";

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
  <q-page class="flex flex-col p-6">
    <q-img
      src="https://storage.googleapis.com/takeme-public-assets/takeme/logo.png"
      class="w-40"
    />
    <h1 class="mt-6">Sign in to your account</h1>

    <q-form @submit="signIn" class="mt-20">
      <div class="flex items-start mb-2">
        <strong class="text-xl md:text-2xl mr-2 mt-1">takeme.blog / </strong>
        <q-input
          standout
          dense
          hide-bottom-space
          placeholder="Enter your username"
          v-model="signInUsername"
          class="flex-1"
          :rules="[isFieldRequired]"
        />
      </div>
      <q-input
        standout
        dense
        placeholder="Enter your password"
        v-model="signInPassword"
        type="password"
        :rules="[isFieldRequired, isPasswordValid]"
      />
      <q-btn
        class="takeme-button black font-bold text-lg mt-10 w-full"
        label="Sign In"
        type="submit"
      />
    </q-form>

    <router-link to="/signup" class="underline mx-auto mt-6">
      Sign up if you don't have an account yet
    </router-link>
  </q-page>
</template>

<style scoped></style>
