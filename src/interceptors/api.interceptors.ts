import axios from 'axios';
import { IToken } from 'models/IToken';

import { API_ENDPOINTS } from '../api/api.endpoints';

export default function setupApi() {
    const api = axios.create({
        baseURL: API_ENDPOINTS.apiIdentidade
    });

    api.interceptors.request.use(
        (config) => {
            let token: IToken;
            token = JSON.parse(localStorage.getItem('token')) ?? JSON.parse(sessionStorage.getItem('token'));

            if (token) {
                config.headers['Authorization'] = `Bearer ${token.token}`;
            } else {
                console.log('token nao encontrado');
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    api.interceptors.response.use(
        (response) => {
            if (response.status === 200 || response.status === 201) {
                //toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Operação realizada com sucesso', life: 3000 });
            }
            return response;
        },
        (error) => {
            const message = null;
            switch (error.response.status) {
                case 0:
                    this.message = 'A API está offline! Não será possível prosseguir.';
                    break;
                case 400:
                    this.message = 'Usuário ou senha inválidos.';
                    break;
                case 401:
                    this.message = 'Usuário ou senha inválidos.';
                    localStorage.removeItem('Token');
                    sessionStorage.removeItem('Token');
                    break;
                case 404:
                    this.message = 'Erro 404. Recurso não encontrado!';
                    break;
                case 415:
                    this.message = 'Falha no objeto de request.';
                    break;
                default:
                    this.message = 'Houve um erro desconhecido na requisição.';
                    break;
            }
            console.log('Erro na requisição:', [status, message, error]);
            return Promise.reject(error);
        }
    );

    return api;
}
