<template>
  <Alert v-if="error" :dismissible="true" :variant="'danger'" @dismissed="error = false"> An error occurred while loading</Alert>

  <!-- eslint-disable-next-line vue/require-v-for-key -->
  <div v-for="race in races" :key="race.id">
    <Race :raceModel="race" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RaceModel } from '@/models/RaceModel';
import Race from '@/components/Race.vue';
import Alert from '@/components/Alert.vue';
import { useRaceService } from '@/composables/RaceService';

const races = ref<Array<RaceModel> | null>(null);
const raceService = useRaceService();
const error = ref(false);

onMounted(async () => {
  try {
    races.value = await raceService.list();
  } catch (e) {
    error.value = true;
  }
});
</script>
