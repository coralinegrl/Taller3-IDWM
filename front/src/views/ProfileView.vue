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
          <p>Nombre Completo: {{ user.fullname }}</p>
          <p>Correo Electrónico: {{ user.email }}</p>
          <p>Año de Nacimiento: {{ user.birthYear }}</p>
          
        </div>
  
        <!-- Botón para editar el perfil -->
        <ion-button expand="full" color="primary" @click="editProfile">
          Editar Perfil
        </ion-button>
        
        <div>
            <p>Contraseña: {{ user.password }}</p>
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
    </ion-page>
</template>
  
<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/vue';
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import router from '../router'; // Importa el enrutador de Vue Router

export default defineComponent({
  name: 'ProfileView',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
  },
  setup() {
    const user = ref(null);


    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/profile'); // Reemplaza '/api/user-data' con la URL correcta para obtener los datos del usuario
        user.value = response.data.user;
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    
    onMounted(() => {
      fetchUserData();
    });

    // Función para abrir el modal de edición de perfil
    const editProfile = () => {
      // Abre el modal ProfileEditModal.vue
      // Puedes implementar esta parte según la lógica de tu aplicación
    };

    // Función para abrir el modal de edición de contraseña
    const editPassword = () => {
      // Abre el modal PasswordUpdateModal.vue
      // Puedes implementar esta parte según la lógica de tu aplicación
    };

    // Función para cerrar la sesión del usuario
    const logout = () => {
      // Implementa la lógica para cerrar la sesión del usuario, por ejemplo, eliminando el token de autenticación
      // y redirigiendo al usuario a la página de inicio (HomePage.vue)
      // Ejemplo de redirección:
      router.push('/home');
    };

    return {
      user,
      editProfile,
      editPassword,
      logout,
    };
  },
});
</script>

<style scoped>
  /* Estilos específicos para la vista ProfileView.vue */
</style>