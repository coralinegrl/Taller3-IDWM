<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Crear cuenta</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <form @submit.prevent="register" class="register-form">
        <div class="register-container">
          <ion-item lines="full" class="ion-margin-bottom">
            <ion-label position="floating">Nombre completo</ion-label>
            <ion-input v-model="fullname" type="text" required placeholder="Ingresa tu nombre completo"></ion-input>
          </ion-item>

          <ion-item lines="full" class="ion-margin-bottom">
            <ion-label position="floating">Email</ion-label>
            <ion-input v-model="email" type="email" required placeholder="Ingresa tu email"></ion-input>
          </ion-item>

          <ion-item lines="full" class="ion-margin-bottom">
            <ion-label position="floating">RUT</ion-label>
            <ion-input v-model="rut" type="rut" required placeholder="Ingresa tu rut con puntos y guión"></ion-input>
          </ion-item>

          <ion-item lines="full" class="ion-margin-bottom">
            <ion-label position="floating">Año de nacimiento</ion-label>
            <ion-input v-model="birthYear" type="number" min="1900" required placeholder="Ingresa un año"></ion-input>
          </ion-item>

          <ion-button expand="block" type="submit" class="ion-margin-top">Registrarme</ion-button>
        </div>

        <p class="login-link">¿Ya estás registrado? <a href="/login">Iniciar Sesión aquí</a></p>
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
      const birthYear = ref(0);
      const rut = ref('');
  
      const register = async () => {
        try {
          console.log(fullname.value, email.value, birthYear.value, rut.value)
          const response = await axios.post('http://localhost:3000/api/user/', {
            fullname: fullname.value,
            email: email.value,
            birthYear: Number(birthYear.value),
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
      const goBack = () => {
      router.back();
      };
  
      return {
        fullname,
        email,
        birthYear,
        rut,
        register,
        goBack,
      };
    },
});
</script>
  
<style scoped>
.register-form {
  max-width: 380px;
  margin: auto;
  padding: 1em;
}

.register-container {
  border-radius: 20px;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

ion-header {
  background: transparent;
  --ion-color-primary: #000000; /* Asegúrate de definir el color de fondo deseado */
}

ion-title {
  text-align: center;
  color: #5E2750; /* Color del texto del título */
}

ion-toolbar {
  --background: #ffffff; /* Fondo del toolbar si es necesario */
}

ion-item {
  --background: #ffffff; /* Fondo de los items */
  --padding-start: 0;
  --inner-padding-end: 0;
  --border-radius: 10px; /* Bordes redondeados para los items */
  --border-color: transparent;
  --box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15);
}

ion-label {
  --color: #8a8a8f; /* Color de los labels */
}

ion-input {
  --color: #000; /* Color del texto de los inputs */
  --placeholder-color: #8a8a8f; /* Color del placeholder */
  --placeholder-font-style: italic;
  --padding-start: 1em;
  --text-align: start;
  --border-radius: 10px; /* Bordes redondeados para los inputs */
}

ion-button {
  --background: #ff7675; /* Color de fondo del botón */
  --border-radius: 10px; /* Bordes redondeados para el botón */
  --color: #fff; /* Color del texto del botón */
}

.login-link {
  text-align: center;
  margin-top: 2em;
  font-size: 0.8em;
}

.login-link a {
  color: #ff7675; /* Color del enlace */
  text-decoration: none;
}
</style>
  