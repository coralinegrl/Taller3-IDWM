<template>
    <div class="password-modal">
        <form @submit.prevent="updatePassword">
            <div class="form-group">
                <label for="newPassword">Nueva Contraseña</label>
                <input id="newPassword" v-model="newPassword" type="password" required>
            </div>

            <div class="form-group">
                <label for="confirmPassword">Confirmar Nueva Contraseña</label>
                <input id="confirmPassword" v-model="confirmPassword" type="password" required>
            </div>

            <ion-button type="submit">Actualizar Contraseña</ion-button>
            <ion-button @click="closeModal">Cancelar</ion-button>
        </form>
    </div>
</template>
  
<script>
import { defineComponent, ref } from 'vue';
import axios from 'axios';

export default defineComponent({
    name: 'PasswordUpdateModal',
    emits: ['close-modal'],
    setup(props, { emit }) {
        const newPassword = ref('');
        const confirmPassword = ref('');

        const updatePassword = async () => {
            try {
                if (newPassword.value !== confirmPassword.value) {
                    // Manejar error: Las contraseñas no coinciden
                    console.error('Las contraseñas no coinciden.');
                    return;
                }
                // Envía la nueva contraseña al backend
                await axios.put('http://localhost:3000/api/user/update-password', {
                    newPassword: newPassword.value,
                    confirmPassword: confirmPassword.value
                }, {
                    headers: {
                        // Asegúrate de incluir el token de autenticación aquí
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                // Cierra el modal y posiblemente muestra un mensaje de éxito
                closeModal();
            } catch (error) {
                // Manejar errores de la respuesta del servidor o de la red
                console.error('Error al actualizar la contraseña:', error);
            }
        };


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
/* Estilos para el modal */
.password-modal {
    /* ... */
}

.form-group {
    /* ... */
}
</style>
  