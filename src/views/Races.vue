<template>
  <!-- eslint-disable-next-line vue/require-v-for-key -->
  <div v-for="race in races" :key="race.id">
    <Race :raceModel="race" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RaceModel } from '@/models/RaceModel';
import Race from '@/components/Race.vue';
import { useRaceService } from '@/composables/RaceService';

const races = ref<Array<RaceModel> | null>(null);
const raceService = useRaceService();

onMounted(async () => {
  races.value = await raceService.list();
});
</script>
