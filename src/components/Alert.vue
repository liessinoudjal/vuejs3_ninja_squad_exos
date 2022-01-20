<template>
  <div :class="alertClasses">
    <slot></slot>
    <button v-if="dismissible" @click="dismiss()" type="button" class="btn-close" aria-label="Close"></button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  dismissible?: boolean;
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
}>();

const emits = defineEmits<{
  (e: 'dismissed'): void;
}>();

const alertClasses = computed(() => {
  return `alert ${props.dismissible ? 'alert-dismissible' : ''} alert-${props.variant}`;
});

function dismiss() {
  emits('dismissed');
}
</script>
