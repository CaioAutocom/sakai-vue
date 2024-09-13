import axios from 'axios';
import { useToast } from 'primevue/usetoast';
import { API_ENDPOINTS } from '../api/api.endpoints';

const toast = useToast();

const api = axios.create({
    baseURL: API_ENDPOINTS.apiUrl
});

api.interceptors.response.use(
    (response) => {
        if (response.status === 200 || response.status === 201) {
            toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Operação realizada com sucesso', life: 3000 });
        }
        return response;
    },
    (error) => {
        if (error.response) {
            const message = error.response.data?.message || 'Erro desconhecido';
            toast.add({ severity: 'error', summary: 'Erro', detail: message, life: 3000 });
        } else {
            toast.add({ severity: 'error', summary: 'Erro', detail: 'Falha na comunicação com o servidor', life: 3000 });
        }
        return Promise.reject(error);
    }
);

export default api;
