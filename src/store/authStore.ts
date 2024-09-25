import { IAuthState } from 'interfaces/pinia/IAuthState';
import { ITenant } from 'models/ITenant';
import { IUser } from 'models/IUser';
import { defineStore } from 'pinia';
import { container } from '../containers';
import { IAuthService } from '../interfaces/IAuthService';
import { ILocalStorageService } from '../interfaces/ILocalStorageService';
import { TYPES } from '../types';

const authService = container.get<IAuthService>(TYPES.IAuthService);
const storageService = container.get<ILocalStorageService>(TYPES.ILocalStorageService);

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
        wrongUserNameOrPassword: false,
        rememberMe: false
    }),

    actions: {
        async login(email: string, password: string) {
            try {
                this.loading = true;
                this.error = null;
                this.wrongUserNameOrPassword = false;
                this.isLoggedIn = false;

                if (!this.isLoggedIn) {
                    const user = await authService.login(email, password);
                    if (user) this.setUser(email, user);
                }
            } catch (err) {
                if (err.status === 401) {
                    this.error = 'Usuário ou senha inválidos.';
                    this.wrongUserNameOrPassword = true;
                }
                this.error = err.message;
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async obterToken(email: string, password: string) {
            try {
                this.loading = true;
                this.error = null;
                let idTenant = this.isSingleTenant ? this.user.tenants[0].id : this.selectedTenant.id;
                this.token = await authService.obterToken(email, password, idTenant);

                if (this.token) {
                    storageService.setItem('token', JSON.stringify(this.token), !this.rememberMe);
                }
            } catch (err) {
                this.error = err.message;
                throw err;
            } finally {
                this.loading = false;
            }
        },

        setSelectedTenant(tenant: ITenant) {
            this.selectedTenant = tenant;
        },

        setUser(emailInput: string, user: IUser) {
            this.user = user;
            this.isLoggedIn = true;
            this.loggedUserEmail = emailInput;
            this.wrongUserNameOrPassword = false;
            this.isSingleTenant = user.tenants.length === 1;
        },

        logout() {
            this.$reset();
            storageService.removeItem('token', true);
            storageService.removeItem('token', false);
        }
    }
});
