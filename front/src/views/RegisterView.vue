<template>
  <!-- Página de registro de cuenta -->
  <ion-page>
    <ion-header>
      <!-- Barra de herramientas con título de registro -->
      <ion-toolbar>
        <ion-title>Crear cuenta</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="logo-container">
        <img src="../assets/mobilehub.png" alt="Logo" class="logo" />
      </div>
      <div class="title">
        <p>MobileHub</p>
      </div>
      <!-- Formulario de registro -->
      <form @submit.prevent="register" class="register-form">
        <!-- Contenedor del formulario -->
        <div class="register-container">
          <!-- Campo de nombre completo -->
          <ion-item lines="full" class="ion-margin-bottom">
            <ion-label position="floating">Nombre completo</ion-label>
            <ion-input v-model="fullname" type="text" required placeholder="Ingresa tu nombre completo"></ion-input>
          </ion-item>
          <!-- Campo de email -->
          <ion-item lines="full" class="ion-margin-bottom">
            <ion-label position="floating">Email</ion-label>
            <ion-input v-model="email" type="email" required placeholder="Ingresa tu email"></ion-input>
          </ion-item>
          <!-- Campo de RUT -->
          <ion-item lines="full" class="ion-margin-bottom">
            <ion-label position="floating">RUT</ion-label>
            <ion-input v-model="rut" type="rut" required placeholder="Ingresa tu rut con puntos y guión"></ion-input>
          </ion-item>
          <!-- Campo de año de nacimiento -->
          <ion-item lines="full" class="ion-margin-bottom">
            <ion-label position="floating">Año de nacimiento</ion-label>
            <ion-input v-model="birthYear" type="number" min="1900" required placeholder="Ingresa un año"></ion-input>
          </ion-item>
          <!-- Botón para registrar -->
          <ion-button expand="block" type="submit" class="ion-margin-top">Registrarme</ion-button>
        </div>
        <!-- Enlace para iniciar sesión -->
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
/**
 * Componente Vue para la vista de registro de usuario.
 * Permite a los usuarios crear una nueva cuenta proporcionando su información personal.
 *
 * @component
 */
export default defineComponent({
  name: 'RegisterView',
  /**
   * Registra los componentes Ionic utilizados.
   */
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
    // Referencias reactivas para los datos del formulario
    const fullname = ref('');
    const email = ref('');
    const birthYear = ref(0);
    const rut = ref('');
    const errors = ref('');
    /**
     * Realiza la operación de registro enviando los datos del formulario al servidor.
     * Maneja la respuesta del servidor, mostrando mensajes de éxito o error según corresponda.
     */
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
        if (error.response && error.response.data.error) {
          console.log('Error en el registro:', error.response.data.error.issues)
          const apiErrors = error.response.data.error.issues;
          errors.value = apiErrors.map(issue => issue.message || "Error desconocido").join('\n');
          alert(errors.value)
        };
        console.error('Error en el registro:', error);
        // Maneja el error de registro, muestra mensajes de error específicos para cada campo, etc.
      }
    };
    /**
     * Navega hacia atrás en el historial del router.
     */
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
      errors,
    };
  },
});
</script>
  
<style scoped>
.logo-container {
  text-align: center;
  margin-top: 50px;
}
.title {
  font-size: 2.5em; 
  font-weight: bold; 
  color: #000000; 
  margin-bottom: 2px;
}
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
  --ion-color-primary: #000000;
  
}

ion-title {
  text-align: center;
  color: #5E2750;
  
}

ion-toolbar {
  --background: #ffffff;
  
}

ion-item {
  --background: #ffffff;
  
  --padding-start: 0;
  --inner-padding-end: 0;
  --border-radius: 10px;
  
  --border-color: transparent;
  --box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15);
}

ion-label {
  --color: #8a8a8f;
  
}

ion-input {
  --color: #000;
  
  --placeholder-color: #8a8a8f;
  
  --placeholder-font-style: italic;
  --padding-start: 1em;
  --text-align: start;
  --border-radius: 10px;
  
}

ion-button {
  --background: #ff7675;
  
  --border-radius: 10px;
  
  --color: #fff;
  
}

.login-link {
  text-align: center;
  margin-top: 2em;
  font-size: 0.8em;
}

.login-link a {
  color: #ff7675;
  
  text-decoration: none;
}
</style>
  