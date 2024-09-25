import { IPerson } from '../models/IPerson';
import { IGetAllPersonResponse } from '../models/responses/IGetAllPersonResponse';

export interface IPersonService {
    create(pessoa: IPerson): Promise<void>;
    getbyId(id: number): Promise<IPerson[]>;
    getbyName(name: string): Promise<IPerson[]>;
    getByCpfCnpj(cpfCnpj: string): Promise<IPerson[]>;
    getAll(): Promise<IGetAllPersonResponse>;
    update(person: IPerson): Promise<void>;
    delete(id: number): Promise<void>;
}
