<template>
  <Navbar />
  <main class="container" style="margin-top: 70px">
    <h1>Ponyracer</h1>
    <Races />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Races from '@/views/Races.vue';

export default defineComponent({
  name: 'App',

  components: { Navbar, Races }
});
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.min.css';
@import '~font-awesome/css/font-awesome.min.css';
</style>
