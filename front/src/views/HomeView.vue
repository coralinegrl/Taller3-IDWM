<template>
  <!-- Página principal de MobileHub -->
  <ion-page>
    <ion-header>
      <!-- Barra de herramientas con título -->
      <ion-toolbar>
        <ion-title class="up-title">MobileHub</ion-title>
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
@media (max-width: 768px) {
  .content-container {
    padding: 1rem; /* Usa 'rem' para que el espaciado sea relativo al tamaño de fuente base */
  }

  .logo-container {
    margin: 1em 0; /* Menos margen en pantallas pequeñas */
  }

  .logo {
    max-width: 100%; /* Para que la imagen nunca sea más ancha que su contenedor */
    margin-top: 100px; /* Menor margen superior */
  }

  .primary-button {
  background-color: #ff7675; /* Color de fondo */
  color: white; /* Color del texto */
  border: none; /* Sin bordes */
  border-radius: 50px; /* Bordes redondeados */
  padding: 10px 20px; /* Espaciado interno */
  font-size: 1rem; /* Tamaño del texto */
  margin-bottom: 10px; /* Margen debajo del botón */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra para dar profundidad */
  cursor: pointer; /* Estilo del cursor como un puntero */
  }

  .title {
  font-size: 2.5em; 
  font-weight: bold; 
  color: #000000; 
  margin-bottom: 1px;
  margin-top: 10px;
  }

}




.auth-button.secondary {
  --background: transparent; 
  -webkit-text-fill-color: #d08181;
}

.up-title {
  color: #ffffff;
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

ion-toolbar {
  --background:#ff7675; 
}


</style>
  

