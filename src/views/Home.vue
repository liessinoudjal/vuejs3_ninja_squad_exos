<template>
  <div class="text-center" style="margin-top: 100px">
    <div>
      <h1>Ponyracer <small>Always a pleasure to bet on ponies</small></h1>
    </div>

    <div><router-link :to="{ name: 'races' }" class="btn btn-primary">Races</router-link></div>
  </div>
</template>

<script setup lang="ts"></script>
