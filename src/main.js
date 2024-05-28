
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router.js';
// import ecpay from '@/router/index.js';

createApp(App)
    .use(router)
    // .use(ecpay)
    .mount('#app')
