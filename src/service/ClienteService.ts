import { injectable } from 'inversify';
import 'reflect-metadata';
import { API_ENDPOINTS } from '../api/api.endpoints';
import { IClienteService } from '../interfaces/IClienteService';
import { ICliente } from '../models/ICliente';

@injectable()
export class ClienteService implements IClienteService {
    async createCliente(cliente: ICliente): Promise<void> {
        let baseUrl: string = API_ENDPOINTS.personCreate;
        // await api.post<void>(`${baseUrl}`, cliente);
    }

    async getClientes(): Promise<ICliente[]> {
        let baseUrl: string = API_ENDPOINTS.personListAll;
        // const response = await api.get<ICliente[]>(baseUrl);
        return []; //response.data
    }
}
