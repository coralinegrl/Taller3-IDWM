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
            console.log('Iniciando sesión con el usuario:', userData);
            this.user = user;
            this.token = token;
            console.log('Estado del usuario después del inicio de sesión:', this.user);
            router.push('/repositories');
        },
        setUser(userData) {
            this.user = userData;
        },
        updateUserProfile(updatedUserData) {
            this.user = { ...this.user, ...updatedUserData };
        },          

        async logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem('token');
            await router.push('/login');
        }
          
    },
});