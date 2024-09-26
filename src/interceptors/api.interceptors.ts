import axios from 'axios';
import { IToken } from 'models/IToken';
import { API_ENDPOINTS } from '../api/api.endpoints';

export default function setupApi() {
    const api = axios.create({
        baseURL: API_ENDPOINTS.apiUrl
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
            if (error.response) {
                const message = error.response.data?.message || 'Erro desconhecido';
                //toast.add({ severity: 'error', summary: 'Erro', detail: message, life: 3000 });
            } else {
                // toast.add({ severity: 'error', summary: 'Erro', detail: 'Falha na comunicação com o servidor', life: 3000 });
            }
            return Promise.reject(error);
        }
    );

    return api;
}
