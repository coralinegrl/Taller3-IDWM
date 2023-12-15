<template>
    <ion-page>
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Iniciar Sesión</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <form @submit.prevent="login">
          <ion-item>
            <ion-label position="floating">Correo Electrónico</ion-label>
            <ion-input v-model="email" type="email" required></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-label position="floating">Contraseña</ion-label>
            <ion-input v-model="password" type="password" required></ion-input>
          </ion-item>
  
          <ion-button expand="full" color="primary" type="submit">
            Iniciar sesión
          </ion-button>
        </form>
      </ion-content>
    </ion-page>
</template>
  
<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonLabel } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import router from '../router'; // Importa el enrutador de Vue Router
  
export default defineComponent({
    name: 'LoginView',
    components: {
      IonContent,
      IonHeader,
      IonPage,
      IonTitle,
      IonToolbar,
      IonInput,
      IonButton,
      IonItem,
      IonLabel,
    },
    setup() {
      const email = ref('');
      const password = ref('');
  
      const login = async () => {
        try {
          const response = await axios.post('/api/login', {
            email: email.value,
            password: password.value,
          });
  
          // Si la autenticación es exitosa, puedes guardar el token en el almacenamiento local o en una cookie
          // También puedes redirigir al usuario a la página deseada (RepositoriesView en este caso)
          const token = response.data.token;
          console.log('Token:', token);
  
          // Redirige al usuario a la página de RepositoriesView después del inicio de sesión exitoso
          router.push('/repositories');
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
          // Maneja el error, muestra un mensaje al usuario, etc.
        }
      };
  
      return {
        email,
        password,
        login,
      };
    },
});
</script>
  
<style scoped>
    /* Estilos específicos para la vista de inicio de sesión */
</style>
  