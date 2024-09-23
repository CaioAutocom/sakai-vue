import { IAuthState } from 'interfaces/pinia/IAuthState';
import { ITenant } from 'models/ITenant';
import { defineStore } from 'pinia';
import { container } from '../containers';
import { IAuthService } from '../interfaces/IAuthService';

const authService = container.get<IAuthService>('IAuthService');

export const useAuthStore = defineStore('auth', {
    state: (): IAuthState => ({
        email: '',
        password: '',
        user: null,
        selectedTenant: null,
        isSingleTenant: false,
        isLoggedIn: false,
        token: ''
    }),

    actions: {
        async login(email: string, password: string) {
            try {
                if (!this.isLoggedIn) {
                    const user = await authService.login(email, password);

                    this.user = user;
                    this.isLoggedIn = true;
                    this.isSingleTenant = user.tenants.length === 1;
                }
            } catch (error) {
                console.error('Login failed', error);
            }
        },

        async obterToken() {
            try {
                let idTenant = this.isSingleTenant ? this.user.tenants[0].id : this.selectedTenant.id;
                this.token = await authService.obterToken(this.email, this.password, idTenant);
                if (this.token) localStorage.setItem('token', JSON.stringify(this.token));
            } catch (error) {
                console.log(error);
            }
        },

        setSelectedTenant(tenant: ITenant) {
            this.selectedTenant = tenant;
        }
    }
});
