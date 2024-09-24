import { IAuthState } from 'interfaces/pinia/IAuthState';
import { ITenant } from 'models/ITenant';
import { defineStore } from 'pinia';
import { AuthService } from '../service/AuthService';

const authService = container.get<IAuthService>(TYPES.IAuthService);

export const useAuthStore = defineStore('auth', {
    state: (): IAuthState => ({
        loggedUserEmail: null,
        user: null,
        selectedTenant: null,
        isSingleTenant: false,
        isLoggedIn: false,
        token: null,
        error: null
    }),

    actions:{
        async login(email: string, password: string) {
            try {
                if (!this.isLoggedIn) {
                    const user = await authService.login(email, password);
                    this.user = user;
                    this.isSingleTenant = user.tenants.length === 1;
                }
            } catch (error) {
                console.error('Login failed', error);
            }
        },

        async obterToken(email: string, password: string) {
            try {
                let idTenant = this.isSingleTenant ? this.user.tenants[0].id : this.selectedTenant.id;
                this.token = await authService.obterToken(email, password, idTenant);
                if (this.token) localStorage.setItem('token', JSON.stringify(this.token));
            } catch (error) {
                console.log(error);
            }
        },

        setSelectedTenant(tenant: ITenant) {
            this.selectedTenant = tenant;
        },
        setIsLoggedIn(emailInput: string) {
            this.isLoggedIn = true;
            this.loggedUserEmail = emailInput;
        },
        logout() {
            this.$reset();
        }
    }
});
