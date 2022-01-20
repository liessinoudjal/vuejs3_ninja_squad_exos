<template>
  <div class="alert alert-danger" v-if="error">
    An error occurred while loading.
    <button type="button" class="btn-close" aria-label="Close" @click="closeAlert()"></button>
  </div>
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
const error = ref(false);

function closeAlert() {
  document.querySelector('.alert-danger').style('display', 'none');
}

onMounted(async () => {
  try {
    races.value = await raceService.list();
  } catch (e) {
    error.value = true;
  }
});
</script>
