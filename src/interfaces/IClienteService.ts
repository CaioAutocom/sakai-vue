import { ICliente } from 'models/ICliente';

export interface IClienteService {
    createCliente(cliente: ICliente): Promise<void>;
    getClientes(): Promise<ICliente[]>;
}
