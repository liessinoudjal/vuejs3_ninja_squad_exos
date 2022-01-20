import type { RouterView, RouterLink } from 'vue-router';

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    RouterLink: typeof RouterLink;
    RouterView: typeof RouterView;
  }
}
