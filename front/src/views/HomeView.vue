<template>
  <!-- Página principal de MobileHub -->
  <ion-page>
    <ion-header>
      <!-- Barra de herramientas con título -->
      <ion-toolbar>
        <ion-title>MobileHub</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      
      <!-- Contenedor principal del contenido -->
      <div class="content-container">
        
        <!-- Contenedor del logo -->
        <div class="logo-container">          
          <img src="../assets/mobilehub.png" alt="Logo" class="logo" />          
        </div>
        <div class="title">
          <p>MobileHub</p>          
        </div>
        
        <!-- Botones para iniciar sesión y registrarse -->
        <ion-button expand="full" class="auth-button" @click="goToLogin">
          Iniciar sesión
        </ion-button>
        <ion-button expand="full" class="auth-button secondary" @click="goToRegister">
          Registrarme
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

/**
 * Componente Vue para la vista de inicio de MobileHub.
 * Proporciona opciones para iniciar sesión o registrarse.
 *
 * @component
 */
export default defineComponent({
  name: 'HomeView',
  /**
   * Registra los componentes Ionic utilizados.
   */
  components: {
    IonButton,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  },
  methods: {
    /**
     * Navega a la vista de inicio de sesión.
     */
    goToLogin() {
      this.$router.push('/login');
    },
    /**
     * Navega a la vista de registro.
     */
    goToRegister() {
      this.$router.push('/register');
    },
  },
});
</script>

<style scoped>
.content-container {
  max-width: 380px;
  margin: auto;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-container {
  text-align: center;
  margin: 2em 0;
}

.logo {
  max-width: 160%; 
  height: auto; 
  margin-top: 150px;
}

.auth-button {
  --background: #ec8585; 
  --border-radius: 10px; 
  --color: #fff; 
  --padding-top: 1em; 
  --padding-bottom: 1em; 
  font-size: 1.2em; 
  margin-top: 1em;
  width: 100%; 
}

.auth-button.secondary {
  --background: #bd8f8f; 
}



ion-title {
  color: #000000;
}

ion-header {
  --ion-color-primary: #fff; 
  --ion-toolbar-background: #d08181; 
  --ion-toolbar-color: #000000; 
}

ion-content {
  --background: #ffffff; 
}

.title {
  font-size: 2.5em; 
  font-weight: bold; 
  color: #000000; 
  margin-bottom: 2px;
}

</style>
  

