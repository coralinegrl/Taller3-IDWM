<template>

  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Inicio</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="logo-container">
        <img src="../assets/mobilehub.png" alt="Logo" class="logo" />
      </div>

      <div class="button-container">
        <ion-button expand="full" color="primary" @click="goToLogin">
          Iniciar sesión
        </ion-button>
        <ion-button expand="full" color="secondary" @click="goToRegister">
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
.logo-container {
  text-align: center;
  margin-top: 50px;
}

.logo {
  width: 200px;
  height: 200px;
}

.button-container {
  margin-top: 50px;
}
</style>
  

