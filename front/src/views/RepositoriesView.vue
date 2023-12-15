<template>
    <ion-page>
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Repositories</ion-title>
          <!-- Agrega el botón en la parte superior derecha -->
          <ion-buttons slot="end">
            <ion-button @click="goToProfile">
              Perfil
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <!-- Contenido de la vista RepositoriesView.vue -->
      </ion-content>
    </ion-page>
</template>
  
<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons } from '@ionic/vue';
import { defineComponent } from 'vue';
import router from '../router'; // Importa el enrutador de Vue Router
  
export default defineComponent({
    name: 'RepositoriesView',
    components: {
      IonContent,
      IonHeader,
      IonPage,
      IonTitle,
      IonToolbar,
      IonButton,
      IonButtons,
    },
    methods: {
      // Función para redirigir al perfil (ProfileView.vue)
      goToProfile() {
        router.push('/profile'); // Cambia '/profile' a la ruta de tu vista ProfileView.vue
      },
    },
});
</script>
  
<style scoped>
    /* Estilos específicos para la vista RepositoriesView.vue */
</style>
  