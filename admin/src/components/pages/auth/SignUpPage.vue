<script setup lang="ts">
import {
  isFieldRequired,
  isEmailValid,
  isUsernameValid,
  isPasswordValid,
} from "@lib/validation";
import router from "@src/routes";
import useStore from "@src/stores";

import { ref } from "vue";

const $store = useStore();

const signUpEmail = ref("");
const signUpUserName = ref("");
const signUpPassword = ref("");

async function signup() {
  await $store.app.signup(
    signUpUserName.value,
    signUpEmail.value,
    signUpPassword.value
  );

  router.push({ name: "login" });
}
</script>

<template>
  <q-page class="flex flex-col p-6">
    <q-img
      src="https://storage.googleapis.com/takeme-public-assets/takeme/logo.png"
      class="w-40"
    />
    <h1 class="mt-6">Create a free account</h1>

    <q-form @submit="signup" class="mt-20 [&>*]:mb-2">
      <div class="flex">
        <strong class="text-xl md:text-2xl mr-2 mt-1">takeme.blog / </strong>
        <q-input
          standout
          dense
          hide-bottom-space
          lazy-rules
          debounce="500"
          placeholder="Enter your username"
          v-model="signUpUserName"
          class="flex-1"
          :rules="[isFieldRequired, isUsernameValid]"
        />
      </div>
      <q-input
        standout
        dense
        lazy-rules
        hide-bottom-space
        v-model="signUpEmail"
        placeholder="Enter your email"
        :rules="[isFieldRequired, isEmailValid]"
      />
      <q-input
        standout
        dense
        lazy-rules
        hide-bottom-space
        placeholder="Enter your password"
        v-model="signUpPassword"
        type="password"
        :rules="[isFieldRequired, isPasswordValid]"
      />
      <q-btn
        class="takeme-button black font-bold text-lg mt-10 w-full"
        label="Sign In"
        type="submit"
      />
    </q-form>

    <router-link to="/login" class="underline mx-auto mt-6">
      Sign up if you already have an account yet
    </router-link>
  </q-page>
</template>

<style scoped></style>
