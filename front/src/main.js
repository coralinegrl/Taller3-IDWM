import { createApp } from 'vue'; 
import App from './App.vue';
import router from './router';
import { IonicVue } from '@ionic/vue'; 
import '@ionic/core/css/ionic.bundle.css';

const app = createApp(App);

app.use(router);
app.use(IonicVue); 

app.mount('#app');
