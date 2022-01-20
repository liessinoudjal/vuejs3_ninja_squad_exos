<template>
  <Navbar />
  <main class="container" style="margin-top: 70px">
    <h1>Ponyracer</h1>
    <Alert v-if="error" :dismissible="true" :variant="'danger'" @dismissed="error = false"> An error occurred while loading</Alert>
    <Suspense>
      <Races />
      <template #fallback>Loading...</template>
    </Suspense>
  </main>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import Races from '@/views/Races.vue';
import { onErrorCaptured, ref } from 'vue';
import Alert from '@/components/Alert.vue';

const error = ref(false);

onErrorCaptured(() => {
  error.value = true;
  return false;
});
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.min.css';
@import '~font-awesome/css/font-awesome.min.css';
</style>
