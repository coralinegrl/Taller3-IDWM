import { createApp } from 'vue'; 
import App from './App.vue';
import router from './router';
import { IonicVue } from '@ionic/vue'; 
import '@ionic/core/css/ionic.bundle.css';
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'



const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
const app = createApp(App);

 
app.use(pinia);
app.use(IonicVue);
app.use(router);
app.mount('#app');