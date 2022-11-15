<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ src: string; id: string }>();

const audioElement = ref<HTMLAudioElement>();
const playing = ref(false);

function togglePlay() {
  playing.value = !playing.value;

  // (Lazy-loading) First time playing, update src object to url stored in data-src
  if (!audioElement.value.src) {
    audioElement.value.src = audioElement.value.dataset.src;
    audioElement.value.volume = 0.5;
  }

  if (playing.value) {
    audioElement.value.play();

    window.AnalyticTracker?.logAnalytic("AudioClick", {
      audioSnippetId: props.id,
    });
  } else audioElement.value.pause();
}
</script>

<template>
  <button class="flex items-center" @click="togglePlay">
    <iconify-icon
      :icon="playing ? `akar-icons:pause` : `akar-icons:play`"
      width="2rem"
    />
  </button>
  <audio :data-src="src" ref="audioElement"></audio>
</template>

<style scoped></style>
