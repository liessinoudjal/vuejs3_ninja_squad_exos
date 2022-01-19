<template>
  <!-- eslint-disable-next-line vue/require-v-for-key -->
  <div v-for="race in races">
    <h2>{{ race.name }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import RaceModel from '@/models/RaceModel';

export default defineComponent({
  name: 'Races',

  setup() {
    const races = ref<Array<RaceModel>>([{ name: 'Lyon' }, { name: 'London' }]);

    return {
      races
    };
  }
});
</script>
