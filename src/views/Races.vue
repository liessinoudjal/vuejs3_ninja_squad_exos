<template>
  <!-- eslint-disable-next-line vue/require-v-for-key -->
  <div v-for="race in races" :key="race.id">
    <Race :raceModel="race" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { RaceModel } from '@/models/RaceModel';
import Race from '@/components/Race.vue';
import { useRaceService } from '@/composables/RaceService';

export default defineComponent({
  name: 'Races',
  components: {
    Race
  },

  setup() {
    const races = ref<Array<RaceModel> | null>(null);
    const raceService = useRaceService();

    onMounted(async () => {
      races.value = await raceService.list();
    });

    return {
      races
    };
  }
});
</script>
