<template>
  <figure @click="clicked(ponyModel.id)">
    <img :src="ponyImageUrl" :alt="ponyModel.name" />
    <figcaption>{{ ponyModel.name }}</figcaption>
  </figure>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { PonyModel } from '@/models/PonyModel';

export default defineComponent({
  name: 'Pony',
  props: {
    ponyModel: {
      type: Object as PropType<PonyModel>,
      required: true
    }
  },
  emits: ['ponySelected'],
  setup(props) {
    const ponyImageUrl = computed(() => {
      const color = props.ponyModel.color.toLowerCase();
      return `/images/pony-${color}.gif`;
    });

    return {
      ponyImageUrl
    };
  },
  methods: {
    clicked(ponyId: number) {
      this.$emit('ponySelected', { ponyId });
    }
  }
});
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
