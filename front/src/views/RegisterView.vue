<template>
    <ion-page>
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Registrarse</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <form @submit.prevent="register">
          <ion-item>
            <ion-label position="floating">Nombre Completo</ion-label>
            <ion-input v-model="fullname" type="text" required></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-label position="floating">Correo Electrónico (Dominio UCN)</ion-label>
            <ion-input v-model="email" type="email" required></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-label position="floating">Año de Nacimiento</ion-label>
            <ion-input v-model="birthYear" type="number" required></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-label position="floating">RUT (con puntos y guión)</ion-label>
            <ion-input v-model="rut" type="text" required></ion-input>
          </ion-item>
  
          <ion-button expand="full" color="primary" type="submit">
            Registrarse
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
    name: 'RegisterView',
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
      const fullname = ref('');
      const email = ref('');
      const birthYear = ref('');
      const rut = ref('');
  
      const register = async () => {
        try {
          const response = await axios.post('/api/', {
            fullname: fullname.value,
            email: email.value,
            birthYear: birthYear.value,
            rut: rut.value,
          });
  
          // Si el registro es exitoso, puedes mostrar un mensaje de éxito o redirigir al usuario a la página de inicio de sesión (LoginView)
          console.log('Registro exitoso:', response.data);
          
          // Redirige al usuario a la página de inicio de sesión (LoginView) después del registro exitoso
          router.push('/login');
        } catch (error) {
          console.error('Error en el registro:', error);
          // Maneja el error de registro, muestra mensajes de error específicos para cada campo, etc.
        }
      };
  
      return {
        fullname,
        email,
        birthYear,
        rut,
        register,
      };
    },
});
</script>
  
<style scoped>
</style>
  