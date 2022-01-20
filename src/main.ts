import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Alert from '@/components/Alert.vue';

createApp(App).component('Alert', Alert).use(router).mount('#app');
