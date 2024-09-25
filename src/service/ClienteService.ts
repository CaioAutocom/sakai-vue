import setupApi from 'interceptors/api.interceptors';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { API_ENDPOINTS } from '../api/api.endpoints';
import { IPessoaService } from '../interfaces/IPessoaService';
import { IPerson } from '../models/IPerson';

const api = setupApi();
@injectable()
export class PessoaService implements IPessoaService {
    private apiUrl = API_ENDPOINTS.apiUrl;

    async getbyId(id: number): Promise<IPerson[]> {
        throw new Error('Method not implemented.');
    }
    async getbyName(name: string): Promise<IPerson[]> {
        throw new Error('Method not implemented.');
    }
    async getByCpfCnpj(cpfCnpj: string): Promise<IPerson[]> {
        throw new Error('Method not implemented.');
    }
    async getAll(): Promise<IPerson[]> {
        let baseUrl: string = this.apiUrl + API_ENDPOINTS.personListAll;
        const response = await api.get<IPerson[]>(baseUrl);
        return response.data;
    }
    async update(person: IPerson): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async delete(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async create(pessoa: IPerson): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
