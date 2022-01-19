<template>
  <h2>{{ raceModel.name }}</h2>
  <p>{{ startInstant }}</p>
  <ul>
    <div class="row">
      <div class="col" v-for="pony in raceModel.ponies" :key="pony.id"><Pony :ponyModel="pony" /></div>
    </div>
  </ul>
</template>

<script setup lang="ts">
import { RaceModel } from '@/models/RaceModel';
import { computed } from 'vue';
import fromNow from '@/utils/FromNow';
import Pony from '@/components/Pony.vue';

const props = defineProps<{
  raceModel: RaceModel;
}>();

const startInstant = computed(() => {
  return fromNow(props.raceModel.startInstant);
});
</script>
