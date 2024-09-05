import { defineStore } from 'pinia';
import { container } from '../containers/container';
import { IAuthService } from '../interfaces/IAuthService';

const authService = container.get<IAuthService>('IAuthService');

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        isLoggedIn: false
    }),
    actions: {
        async login(email: string, password: string) {
            try {
                const user = await authService.login(email, password);
                this.user = user;
                this.isLoggedIn = true;
            } catch (error) {
                console.error('Login failed', error);
            }
        }
    }
});
