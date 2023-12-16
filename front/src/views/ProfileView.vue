<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Perfil</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="goToRepositories">
            Volver
          </ion-button>
        </ion-buttons>
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
      <profile-edit-modal v-if="showEditModal" @close-modal="showEditModal = false" />

      <div>
        <p>Contraseña: ***********</p>
      </div>

      <!-- Botón para editar la contraseña -->
      <ion-button expand="full" color="primary" @click="editPassword">
        Editar Contraseña
      </ion-button>

      <!-- PasswordUpdateModal -->
      <password-update-modal v-if="showPasswordUpdateModal" @close-modal="showPasswordUpdateModal = false" />

      <!-- Botón para cerrar sesión -->
      <ion-button expand="full" color="danger" @click="logout">
        Cerrar Sesión
      </ion-button>
    </ion-content>
    


  </ion-page>
</template>
  
<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons } from '@ionic/vue';
import { defineComponent, ref, computed } from 'vue';
import router from '../router'; // Importa el enrutador de Vue Router
import { UserStore } from '@/stores/user_state';
import ProfileEditModal from '@/components/ProfileEditModal.vue';
import PasswordUpdateModal from '@/components/PasswordUpdateModal.vue';
import { useRoute, useRouter } from 'vue-router';


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
    PasswordUpdateModal,
  },
  setup() {

    const mainStore = UserStore();
    const user = computed(() => mainStore.user);
    const showEditModal = ref(false);
    console.log(user.value);
    const showPasswordUpdateModal = ref(false);
    const route = useRoute();
    const router = useRouter();


    const logout = async () => {
      mainStore.logout();
      await router.push('/login');
    };

    const editPassword = () => {
      showPasswordUpdateModal.value = true;
    };

    return {
      user,
      logout,
      editPassword,
      showEditModal,
      showPasswordUpdateModal,
      goToRepositories() {
          router.push('/repositories');
      },
    };
  },
});
</script>

<style scoped>
/* Estilos específicos para la vista ProfileView.vue */
</style>