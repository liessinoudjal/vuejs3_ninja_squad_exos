<template>
  <figure @click="clicked(ponyModel)">
    <img :src="ponyImageUrl" :alt="ponyModel.name" />
    <figcaption>{{ ponyModel.name }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { PonyModel } from '@/models/PonyModel';

const props = defineProps<{
  ponyModel: PonyModel;
}>();
const emits = defineEmits<{
  (e: 'ponySelected'): void;
}>();

const ponyImageUrl = computed(() => {
  const color = props.ponyModel.color.toLowerCase();
  return `/images/pony-${color}.gif`;
});

function clicked(pony: PonyModel) {
  emits('ponySelected', { pony });
}
</script>

<style scoped>
figure {
  margin: 3px;
  padding: 3px;
  font-size: 12px;
}

img {
  height: 50px;
}
</style>
