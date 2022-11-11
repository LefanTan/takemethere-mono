<script setup lang="ts">
import { computed, ref } from "vue";

withDefaults(
  defineProps<{
    text: string;
    className?: string;
    tag?: string;
  }>(),
  {
    tag: "p",
  }
);

const componentRef = ref<HTMLElement>();
const showMore = ref(false);

const showArrowButton = computed(
  () => componentRef.value?.scrollHeight > componentRef.value?.offsetHeight
);
</script>

<template>
  <div>
    <component
      ref="componentRef"
      :is="tag"
      :class="{
        [className]: true,
        'line-clamp-3': !showMore,
        'line-clamp-none': showMore,
      }"
    >
      {{ text }}
    </component>
    <button
      v-if="showArrowButton"
      class="w-full text-right inline-flex items-center justify-end"
      @click="() => (showMore = !showMore)"
    >
      <iconify-icon
        :icon="`${
          !showMore ? 'akar-icons:chevron-down' : 'akar-icons:chevron-up'
        }`"
        width="1rem"
      />
    </button>
  </div>
</template>

<style scoped></style>
