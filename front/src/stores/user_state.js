import { defineStore } from 'pinia';
import router from '@/router';

export const UserStore = defineStore({
    id: 'user',
        state: () => ({
        user: null,
        token: null,
    }),
    getters: {
        getUser() {
            return this.user;
        },
    },
    actions: {
        login(user, token) {
            this.user = user;
            this.token = token;
            router.push('/repositories');
        },
    },
});