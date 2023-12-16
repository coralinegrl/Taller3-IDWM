<template>
    <div class="modal">
        <form @submit.prevent="updateProfile">
            <div class="form-group">
                <label for="fullname">Nombre Completo</label>
                <input id="fullname" v-model="editableUser.fullname" type="text" required>
            </div>

            <div class="form-group">
                <label for="email">Correo Electrónico</label>
                <input id="email" v-model="editableUser.email" type="email" required>
            </div>

            <div class="form-group">
                <label for="birthYear">Año de Nacimiento</label>
                <input id="birthYear" v-model="editableUser.birthYear" type="number" min="1900" required>
            </div>

            <button type="submit">Guardar Cambios</button>
            <button @click="closeModal">Cancelar</button>
        </form>
    </div>
</template>
  
<script>
import { defineComponent, ref } from 'vue';
import { UserStore } from '@/stores/user_state';
import axios from 'axios';

export default defineComponent({
    name: 'ProfileEditModal',
    // Define los eventos que este componente puede emitir
    emits: ['close-modal'],
    setup(props, { emit }) { // Asegúrate de incluir el segundo argumento { emit }
        const mainStore = UserStore();
        const editableUser = ref({ ...mainStore.getUser });

        const updateProfile = async () => {
            try {
                // Llama a tu API para actualizar el perfil aquí
                const response = await axios.put('http://localhost:3000/api/user/profile', {
                    fullname: editableUser.value.fullname,
                    email: editableUser.value.email,
                    birthYear: editableUser.value.birthYear
                });
                mainStore.setUser(response.data.user); // Actualiza la información del usuario en la store
                closeModal(); // Cierra el modal
            } catch (error) {
                console.error('Error al actualizar el perfil:', error);
                // Manejar el error aquí
            }
        };

        // Definición correcta del método closeModal utilizando emit
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
/* Estilos para tu modal */
.modal {
    /* ... */
}

.form-group {
    margin-bottom: 1em;
}
</style>
  