<script setup lang="ts">
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
  <q-page>
    <q-input
      v-model="signUpEmail"
      type="email"
      label="Email"
      :rules="[(val) => !!val || 'Field is required']"
    />

    <q-input
      v-model="signUpUserName"
      label="Username"
      :rules="[(val) => !!val || 'Field is required']"
    />

    <q-input
      v-model="signUpPassword"
      type="password"
      label="Password"
      :rules="[(val) => !!val || 'Field is required']"
    />

    <q-btn label="Signup" @click="signup" />

    <router-link to="/login" replace>Already have account?</router-link>
  </q-page>
</template>

<style scoped></style>
