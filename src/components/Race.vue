<template>
  <h2>{{ raceModel.name }}</h2>
  <p>{{ startInstant }}</p>
  <ul>
    <div class="row">
      <div class="col" v-for="pony in raceModel.ponies" :key="pony.id"><Pony :ponyModel="pony" @ponySelected="ponySelected($event)" /></div>
    </div>
  </ul>
</template>

<script lang="ts">
import { RaceModel } from '@/models/RaceModel';
import { defineComponent, PropType, computed } from 'vue';
import fromNow from '@/utils/FromNow';
import Pony from '@/components/Pony.vue';

export default defineComponent({
  components: {
    Pony
  },
  props: {
    raceModel: {
      type: Object as PropType<RaceModel>,
      required: true
    }
  },

  setup(props) {
    const startInstant = computed(() => {
      return fromNow(props.raceModel.startInstant);
    });

    return {
      startInstant
    };
  },
  methods: {
    ponySelected(event: Proxy) {
      console.log(event.pony);
    }
  }
});
</script>
