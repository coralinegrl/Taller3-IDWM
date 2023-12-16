<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Perfil de Usuario</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Muestra los datos del usuario -->
      <div>
        <p v-if="user">Nombre Completo: {{ user.fullname }}</p>
        <p v-if="user">Correo Electrónico: {{ user.email }}</p>
        <p v-if="user">Año de Nacimiento: {{ user.birthYear }}</p>
      </div>

      <!-- Botón para editar el perfil -->
      <ion-button expand="full" color="primary" @click="showEditModal = true">
        Editar Perfil
      </ion-button>

      <div>
        <p>Contraseña: ***********</p>
      </div>

      <!-- Botón para editar la contraseña -->
      <ion-button expand="full" color="primary" @click="editPassword">
        Editar Contraseña
      </ion-button>

      <!-- Botón para cerrar sesión -->
      <ion-button expand="full" color="danger" @click="logout">
        Cerrar Sesión
      </ion-button>
    </ion-content>
    <profile-edit-modal v-if="showEditModal" @close-modal="showEditModal = false" />


  </ion-page>
</template>
  
<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/vue';
import { defineComponent, ref, onMounted, computed } from 'vue';
import router from '../router'; // Importa el enrutador de Vue Router
import { UserStore } from '@/stores/user_state';
import ProfileEditModal from '@/components/ProfileEditModal.vue';

export default defineComponent({
  name: 'ProfileView',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    ProfileEditModal,
  },
  setup() {

    const mainStore = UserStore();
    const user = computed(() => mainStore.user);
    const showEditModal = ref(false);
    console.log(user.value);

    const logout = () => {
      mainStore.logout();
      router.push('/login');
    };



    const editPassword = () => {
      // Abre el modal PasswordUpdateModal.vue
      // Puedes implementar esta parte según la lógica de tu aplicación
    };



    return {
      user,
      logout,
      editPassword,
      showEditModal,
    };
  },
});
</script>

<style scoped>
/* Estilos específicos para la vista ProfileView.vue */
</style>