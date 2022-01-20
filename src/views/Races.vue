<template>
  <!-- eslint-disable-next-line vue/require-v-for-key -->
  <div v-for="race in races" :key="race.id">
    <Race :raceModel="race" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Race from '@/components/Race.vue';
import { RaceModel } from '@/models/RaceModel';

import { useRaceService } from '@/composables/RaceService';

const races = ref<Array<RaceModel> | null>(null);
const raceService = useRaceService();

races.value = await raceService.list();
</script>
