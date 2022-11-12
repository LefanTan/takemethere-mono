<script setup lang="ts"></script>

<template>
  <div class="bg-white rounded-md m-2 p-6 h-full min-h-90vh flex flex-col">
    <input class="text-4xl leading-tight" placeholder="Title" />
    <input class="text-lg mt-3" placeholder="Short description" />
  </div>
</template>

<style lang="less">
// input {
//   // Hide
//   &:focus {
//     border: 2px solid green;
//   }
//   &:focus-visible {
//     outline: 2px solid black;
//   }
// }

input:focus:not(:focus-visible) {
  outline: none !important;
}

input:focus-visible {
  outline: 2px solid black;
}
</style>

<style scoped></style>
