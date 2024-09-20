import { defineStore } from 'pinia';
import { ref } from 'vue';
import { container } from '../containers';
import { IAuthService } from '../interfaces/IAuthService';
import { ITenant } from '../models/ITenant';
import { IUser } from '../models/IUser';

const authService = container.get<IAuthService>('IAuthService');

export const useAuthStore = defineStore('auth', {
    state: () => ({
        email: ref(''),
        password: ref(''),
        user: null as IUser | null,
        selectedTenant: ref<ITenant | null>(null),
        isSingleTenant: ref(false),
        isLoggedIn: ref(false),
        token: ref('')
    }),

    actions: {
        async login(email: string, password: string) {
            try {
                if (!this.isLoggedIn) {
                    const user = await authService.login(email, password);
                    this.user = user;
                    this.isLoggedIn = true;

                    if (user.tenants.length === 1) {
                        this.isSingleTenant = true;
                    }
                }
            } catch (error) {
                console.error('Login failed', error);
            }
        },

        async obterToken(): Promise<any> {
            try {
                let idTenant = this.isSingleTenant ? this.user.tenants[0].id : this.selectedTenant.id;
                const token = await authService.obterToken(this.email, this.password, idTenant);
                this.token = token;
            } catch (error) {
                console.log(error);
            }
        },

        setSelectedTenant(tenant) {
            this.selectedTenant = tenant;
        }
    }
});
