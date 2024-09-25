import { IPerson } from 'models/IPerson';

export interface IPessoaService {
    create(pessoa: IPerson): Promise<void>;
    getbyId(id: number): Promise<IPerson[]>;
    getbyName(name: string): Promise<IPerson[]>;
    getByCpfCnpj(cpfCnpj: string): Promise<IPerson[]>;
    getAll(): Promise<IPerson[]>;
    update(person: IPerson): Promise<void>;
    delete(id: number): Promise<void>;
}
