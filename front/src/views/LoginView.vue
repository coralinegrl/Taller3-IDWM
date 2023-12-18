<template>
  <!-- Página de inicio de sesión -->
  <ion-page>
    <ion-header>
      <!-- Barra de herramientas con título de inicio de sesión -->
      <ion-toolbar>
        <ion-title>Iniciar Sesión</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Formulario de inicio de sesión -->
      <form @submit.prevent="login" class="login-form">
        <!-- Contenedor del formulario -->
        <div class="login-container">
          <!-- Campo de correo electrónico -->
          <ion-item lines="full" class="ion-margin-bottom">
            <ion-label position="floating">Correo Electrónico</ion-label>
            <ion-input v-model="email" type="text" placeholder="Ingresa tu email"></ion-input>
          </ion-item>

          <!-- Campo de contraseña -->
          <ion-item lines="full" class="ion-margin-bottom">
            <ion-label position="floating">Contraseña</ion-label>
            <ion-input v-model="password" type="password" placeholder="Ingresa tu contraseña"></ion-input>
          </ion-item>

          <!-- Botón para iniciar sesión -->
          <ion-button expand="block" type="submit" class="ion-margin-top">Iniciar sesión</ion-button>
        </div>

        <!-- Enlace para registrarse -->
        <p class="register-link">¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonLabel } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import router from '../router'; // Importa el enrutador de Vue Router
import { UserStore } from '@/stores/user_state'; // Importa el almacenamiento local de usuario

/**
 * Componente Vue para la vista de inicio de sesión.
 * Permite a los usuarios autenticarse en la aplicación.
 *
 * @component
 */
export default defineComponent({
  name: 'LoginView',

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
    const mainStore = UserStore();
    const email = ref('');
    const password = ref('');
    const errors = ref('');

    /**
     * Navega hacia atrás en el historial del router.
     */
    const goBack = () => {
      router.back();
    };

    return {
      email,
      password,
      goBack,
      mainStore,
      errors,
    };
  },

  methods: {
    /**
     * Realiza una solicitud de inicio de sesión al servidor y maneja la respuesta.
     * Si es exitosa, guarda el token y los detalles del usuario en el almacenamiento
     * local y redirige al usuario a la página principal.
     */
    async login() {
      try {
        // Solicitud de inicio de sesión al servidor
        const response = await axios.post('http://localhost:3000/api/user/login', {
          email: this.email,
          password: this.password,
        });

        // Procesamiento de la respuesta exitosa
        const token = response.data.token;
        const user = response.data.user;
        console.log('Token:', token);
        console.log('Usuario:', user);
        this.mainStore.login(user, token);

      } catch (error) {
        // Manejo de errores durante la solicitud
        console.error('Error al iniciar sesión:', error);
        if (error.response && error.response.data.message) {
          this.errors = error.response.data.message;
          alert(this.errors);
        };
      }
    },
  },
});
</script>

  
<style scoped>
.login-form {
  max-width: 380px;
  margin-top: 210px;
  margin-left: 30px;
  padding: 1em;
}

.login-container {
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

.register-link {
  text-align: center;
  margin-top: 2em;
  font-size: 0.8em;
}

.register-link a {
  color: #ff7675;
  text-decoration: none;
}
</style>