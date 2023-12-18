<template>
    <!-- Modal para editar el perfil del usuario -->
    <div class="modal">
        <div class="modal-content">
            <form @submit.prevent="updateProfile">
                <!-- Campo para editar el nombre completo -->
                <div class="form-group">
                    <label for="fullname">Nombre Completo</label>
                    <input id="fullname" v-model="editableUser.fullname" type="text" required>
                </div>
                <!-- Campo para editar el correo electrónico -->
                <div class="form-group">
                    <label for="email">Correo Electrónico</label>
                    <input id="email" v-model="editableUser.email" type="email" required>
                </div>
                <!-- Campo para editar el año de nacimiento -->
                <div class="form-group">
                    <label for="birthYear">Año de Nacimiento</label>
                    <input id="birthYear" v-model="editableUser.birthYear" type="number" min="1900" required>
                </div>
                <!-- Botones para guardar cambios o cancelar la edición -->
                <ion-button type="submit" class="custom-button save-button">Guardar Cambios</ion-button>
                <ion-button @click="closeModal" class="custom-button cancel-button">Cancelar</ion-button>
            </form>
        </div>
    </div>
</template>
  
<script>
import { defineComponent, ref } from 'vue';
import { UserStore } from '@/stores/user_state';
import axios from 'axios';
/**
 * Componente Vue para un modal que permite a los usuarios editar su perfil.
 *
 * @component
 * @emits close-modal - Emite un evento para cerrar el modal.
 */
export default defineComponent({
    name: 'ProfileEditModal',
    // Define los eventos que este componente puede emitir
    emits: ['close-modal'],
    setup(props, { emit }) { // Asegúrate de incluir el segundo argumento { emit }
        const mainStore = UserStore();
        const editableUser = ref({ ...mainStore.getUser });
        /**
         * Envía una solicitud PUT al servidor para actualizar la información del perfil del usuario.
         * En caso de éxito, cierra el modal y actualiza la información del usuario en la tienda.
         */
        const updateProfile = async () => {
            try {
                
                console.log('editableUser', editableUser);
                console.log('editableUser.value', editableUser.value.id);
                const response = await axios.put(`http://localhost:3000/api/user/${editableUser.value.id}`, {
                    fullname: editableUser.value.fullname,
                    email: editableUser.value.email,
                    birthYear: editableUser.value.birthYear

                }, {
                    headers: {
                        Authorization: `Bearer ${mainStore.getToken}` // Incluye el token de autenticación en la cabecera
                    }   
                });

                mainStore.setUser(response.data.user); // Actualiza la información del usuario en la store
                closeModal(); // Cierra el modal
            } catch (error) {
                console.error('Error al actualizar el perfil:', error);
                // Manejar el error aquí
            }
        };

        /**
         * Emite un evento para cerrar el modal.
         */
        const closeModal = () => {
            emit('close-modal'); // Emite el evento close-modal para el componente padre
        };

        return {
            editableUser,
            updateProfile,
            closeModal
        };
    }
});
</script>


  
<style>

.modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Fondo semitransparente */
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px; /* Espaciado para evitar que el modal toque los bordes de la pantalla */
}

.modal-content {
    background-color: white; /* Fondo blanco para el contenido del modal */
    padding: 20px; /* Espaciado interno para el contenido */
    border-radius: 10px; /* Bordes redondeados */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* Sombra sutil */
    width: auto; /* Ancho automático basado en el contenido */
    max-width: 500px; /* Máximo ancho para grandes pantallas */
    box-sizing: border-box; /* Incluye el padding y border dentro del ancho y alto */
}


.form-group {
    margin-bottom: 1em;
}

ion-button {
  --background: #ff7675; /* Color de fondo */
  --border-radius: 10px; /* Bordes redondeados */
  --padding-start: 20px; /* Espacio interno horizontal */
  --padding-end: 20px;
  --padding-top: 10px; /* Espacio interno vertical */
  --padding-bottom: 10px;
  margin: 10px; /* Margen entre botones */
  color: white; /* Color del texto */
  border: none; /* Sin borde */
  cursor: pointer; /* Estilo del cursor */
  font-size: 1rem; /* Tamaño del texto */
}


.cancel-button {
  --background: #ff7675; 
}
</style>
  