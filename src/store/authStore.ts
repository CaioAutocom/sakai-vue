import { defineStore } from 'pinia';
import { container } from '../containers';
import { IAuthService } from '../interfaces/IAuthService';
import { ITenant } from '../models/ITenant';
import { IUser } from '../models/IUser';

const authService = container.get<IAuthService>('IAuthService');

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as IUser | null,
        selectedCompany: null as ITenant | null,
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
        },
        setSelectedCompany(company) {
            this.selectedCompany = company;
        }
    }
});
