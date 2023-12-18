<template>
  <!-- Página de perfil del usuario -->
  <ion-page>
    <ion-header>
      <!-- Barra de herramientas personalizada con título y botón de retroceso -->
      <ion-toolbar class="custom-toolbar">
        <ion-title class="white-title">Perfil</ion-title>
        <ion-buttons slot="end">
          <ion-button class="white-title" @click="goToRepositories">
            ATRÁS
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
      <ion-button expand="full" class="custom-button" @click="showEditModal = true">
        Editar Perfil
      </ion-button>
      <profile-edit-modal v-if="showEditModal" @close-modal="showEditModal = false" />

      <div>
        <p>Contraseña: ***********</p>
      </div>

      <!-- Botón para editar la contraseña -->
      <ion-button expand="full" class="custom-button" @click="editPassword">
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

/**
 * Componente Vue para la vista del perfil del usuario.
 * Permite visualizar y editar la información del perfil, cambiar la contraseña y cerrar sesión.
 *
 * @component
 */
export default defineComponent({
  name: 'ProfileView',
  /**
   * Registra los componentes Ionic y componentes personalizados utilizados.
   */
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

    /**
     * Cierra la sesión del usuario y redirige a la página de inicio de sesión.
     */
    const logout = async () => {
      mainStore.logout();
      await router.push('/login');
    };

    /**
     * Activa el modal para cambiar la contraseña del usuario.
     */
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
.custom-toolbar {
  --background: #ff7675;
}

.white-title {
  color: rgb(255, 255, 255);
}

.white-button {
  color: white;
}
.custom-button {
  --background: #ff7675;
  --border-radius: 40px; /* Ajusta según tus preferencias */
}


</style>