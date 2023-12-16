import { defineStore } from 'pinia';
import router from '@/router';

export const UserStore = defineStore({
    id: 'user',
        state: () => ({
        user: {
            fullname: '',
            email: '',
            birthYear: '',
        },
        token: null,
    }),
    getters: {
        getUser() {
            return this.user;
        },
    },
    actions: {
        login(user, token) {
            console.log('Iniciando sesión con el usuario:', user);
            this.user = user;
            this.token = token;
            console.log('Estado del usuario después del inicio de sesión:', this.user);
            router.push('/repositories');
        },
        setUser(user) {
            this.user = user;
        },
        updateUserProfile(updatedUser) {
            console.log('Actualizando perfil del usuario:', updatedUser);
            this.user = updatedUser;
        }, 
               

        logout() {
            console.log('Cerrando sesión del usuario');
            this.user = null;
            this.token = null;
            localStorage.removeItem('token');
            console.log('Usuario después de cerrar sesión', this.user);
            router.push('/login');
        }
          
    },
});