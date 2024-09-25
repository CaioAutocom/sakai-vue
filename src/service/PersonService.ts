import { injectable } from 'inversify';
import { IGetAllPersonResponse } from 'models/responses/IGetAllPersonResponse';
import { API_ENDPOINTS } from '../api/api.endpoints';
import setupApi from '../interceptors/api.interceptors';
import { IPersonService } from '../interfaces/IPersonService';
import { IPerson } from '../models/IPerson';

const api = setupApi();

@injectable()
export class PersonService implements IPersonService {
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
    async getAll(): Promise<IGetAllPersonResponse> {
        let baseUrl: string = this.apiUrl + API_ENDPOINTS.personListAll;
        const response = await api.get<IGetAllPersonResponse>(baseUrl);
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
