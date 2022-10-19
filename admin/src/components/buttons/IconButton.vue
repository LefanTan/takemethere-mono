<script setup lang="ts">
import { QTooltipProps } from "quasar";

withDefaults(
  defineProps<{
    name: string;
    size?: string;
    to?: string;
    tooltipLabel?: string;
    tooltipProps?: QTooltipProps;
    type?: "button" | "submit" | "reset";
  }>(),
  {
    type: "button",
    to: "",
    size: "1.25rem",
  }
);

defineEmits<{ (e: "click", event: MouseEvent): void }>();
</script>

<template>
  <button
    class="flex items-center justify-center text-gray-900"
    :type="type"
    @click="(e) => $emit('click', e)"
  >
    <QTooltip
      v-if="tooltipLabel"
      class="bg-black text-white text-sm shadow-xl"
      transition-show="scale"
      transition-hide="scale"
      transition-duration="150"
      v-bind="tooltipProps"
      >{{ tooltipLabel }}</QTooltip
    >
    <QIcon :name="name" :size="size" />
  </button>
</template>

<style scoped></style>
