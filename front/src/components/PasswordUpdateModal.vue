<template>
    <!-- Modal para actualizar la contraseña del usuario -->
    <div class="modal">
        <div class="modal-content">
            <form @submit.prevent="updatePassword">
                <!-- Campo para la nueva contraseña -->
                <div class="form-group">
                    <label for="newPassword">Nueva Contraseña</label>
                    <input id="newPassword" v-model="newPassword" type="password" required>
                </div>
                <!-- Campo para confirmar la nueva contraseña -->
                <div class="form-group">
                    <label for="confirmPassword">Confirmar Contraseña</label>
                    <input id="confirmPassword" v-model="confirmPassword" type="password" required>
                </div>
                <!-- Botones para actualizar la contraseña o cancelar la operación -->
                <ion-button type="submit" class="custom-button save-button">Actualizar</ion-button>
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
 * Componente Vue para un modal que permite a los usuarios actualizar su contraseña.
 *
 * @component
 * @emits close-modal - Emite un evento para cerrar el modal.
 */
export default defineComponent({
    name: 'PasswordUpdateModal',
    emits: ['close-modal'],
    setup(props, { emit }) {
        const newPassword = ref('');
        const confirmPassword = ref('');
        const mainStore = UserStore();
        const editableUser = ref({ ...mainStore.getUser });
        /**
         * Realiza la actualización de la contraseña del usuario.
         * Envia una solicitud PUT al servidor con la nueva contraseña y su confirmación.
         * Cierra el modal y desloguea al usuario en caso de éxito.
         */
        const updatePassword = async () => {
            try {

                // Envía la nueva contraseña al backend
                await axios.put(`http://localhost:3000/api/user/update-password/${editableUser.value.id}`, {
                    newPassword: newPassword.value,
                    confirmPassword: confirmPassword.value
                }, {
                    headers: {
                        // Asegúrate de incluir el token de autenticación aquí
                        Authorization: `Bearer ${mainStore.getToken}`
                    }
                }).then((response) => {

                    if (response.status === 200) {
                        // Cierra el modal
                        closeModal();
                        mainStore.logout();
                    }
                });
                // Cierra el modal y posiblemente muestra un mensaje de éxito

            } catch (error) {
                if (error.response && error.response.data) {
                    // Mostrar el mensaje de error del servidor
                    const errorMessage = error.response.data.message;
                    alert(errorMessage); // O usar otra forma de mostrar mensajes en tu aplicación
                } else {
                    console.error('Error al actualizar la contraseña:', error);
                }
            }
        };

        /**
         * Emite un evento para cerrar el modal.
         */
        const closeModal = () => {
            emit('close-modal');
        };

        return {
            newPassword,
            confirmPassword,
            updatePassword,
            closeModal
        };
    }
});
</script>
  
<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    width: auto;
    max-width: 500px;
    box-sizing: border-box;
}

.custom-button {
    --background: #ff7675;
    --border-radius: 10px;
    --padding-start: 20px;
    --padding-end: 20px;
    --padding-top: 10px;
    --padding-bottom: 10px;
    margin: 10px;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1rem;
}

/* Estilos específicos para el botón de cancelar si es necesario */
.cancel-button {
    --background: #ff7675;
}
</style>

  