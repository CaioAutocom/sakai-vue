import { IAuthState } from 'interfaces/pinia/IAuthState';
import { ITenant } from 'models/ITenant';
import { defineStore } from 'pinia';
import { container } from '../containers';
import { IAuthService } from '../interfaces/IAuthService';
import { TYPES } from '../types';

const authService = container.get<IAuthService>(TYPES.IAuthService);

export const useAuthStore = defineStore('auth', {
    state: (): IAuthState => ({
        loggedUserEmail: null,
        user: null,
        selectedTenant: null,
        isSingleTenant: false,
        isLoggedIn: false,
        token: null,
        error: null,
        loading: false,
        wrongUserNameOrPassword: false
    }),

    actions:{
        async login(email: string, password: string) {
            try {
                this.loading = true;
                this.error = null;
                this.wrongUserNameOrPassword = false;

                if (!this.isLoggedIn) {
                    const user = await authService.login(email, password);
                    this.user = user;
                    this.isSingleTenant = user.tenants.length === 1;
                }
            } catch (err) {
                if(err.status === 401){
                    this.error = "Usuário ou senha inválidos.";
                    this.wrongUserNameOrPassword = true;
                    return;
                }
                this.error = err.message;
            }finally{
                this.loading = false;
            }
        },

        async obterToken(email: string, password: string) {
            try {
                this.loading = true;
                this.error = null;
                let idTenant = this.isSingleTenant ? this.user.tenants[0].id : this.selectedTenant.id;
                this.token = await authService.obterToken(email, password, idTenant);
                if (this.token) localStorage.setItem('token', JSON.stringify(this.token));
            } catch (err) {
                this.error = err.message;
            }finally{
                this.loading = false;
            }
        },

        setSelectedTenant(tenant: ITenant) {
            this.selectedTenant = tenant;
        },
        setUser(emailInput: string) {
            this.isLoggedIn = true;
            this.loggedUserEmail = emailInput;
            this.wrongUserNameOrPassword = false;
        },
        logout() {
            this.$reset();
        }
    }
});
