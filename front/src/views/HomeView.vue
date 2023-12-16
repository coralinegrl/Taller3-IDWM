<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>MobileHub</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="content-container">
        <div class="logo-container">
          <img src="../assets/mobilehub.png" alt="Logo" class="logo" />
        </div>

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

export default defineComponent({
  name: 'HomeView',
  components: {
    IonButton,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  },
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
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
  max-width: 160%; /* O un tamaño fijo si lo prefieres */
  height: auto; /* Mantén la relación de aspecto */
  margin-top: 150px;
}

.auth-button {
  --background: #ec8585; /* Color de fondo del botón */
  --border-radius: 10px; /* Bordes redondeados para el botón */
  --color: #fff; /* Color del texto del botón */
  --padding-top: 1em; /* Aumenta el padding para hacer el botón más alto */
  --padding-bottom: 1em; /* Aumenta el padding para hacer el botón más alto */
  font-size: 1.2em; /* Tamaño de fuente más grande */
  margin-top: 1em;
  width: 100%; /* Asegura que el botón se expanda al ancho máximo del contenedor */
}

.auth-button.secondary {
  --background: #e7c8c8; /* Color de fondo del botón secundario */
}

ion-toolbar {
  --background: #d08181; /* Fondo del toolbar si es necesario */
  --color: #000000; /* Color del texto del título */
}

ion-title {
  color: #000000;
}

ion-header {
  --ion-color-primary: #fff; /* Cambia al color que prefieras para el fondo del encabezado */
  --ion-toolbar-background: #fff; /* Cambia al color que prefieras para el fondo de la barra de herramientas */
  --ion-toolbar-color: #5E2750; /* Cambia al color que prefieras para el color del texto de la barra de herramientas */
}

ion-content {
  --background: #ffffff; /* Cambia al color que prefieras para el fondo del contenido */
}

/* Ajustes adicionales para el tamaño y color de fondo según sea necesario */
</style>
  

