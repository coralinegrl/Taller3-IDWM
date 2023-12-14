<template>
    <ion-page>
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Registrarme</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <!-- Contenido de la vista de registro -->
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'RegisterView',
    components: {
      IonContent,
      IonHeader,
      IonPage,
      IonTitle,
      IonToolbar,
    },
  });
  </script>
  
  <style scoped>
  /* Estilos específicos para la vista de registro */
  </style>
  