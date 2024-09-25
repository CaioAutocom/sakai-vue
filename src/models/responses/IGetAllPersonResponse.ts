import { IPerson } from 'models/IPerson';

export interface IGetAllPersonResponse {
    items: IPerson[];
    pageIndex: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasPrevious: boolean;
    hasNext: boolean;
}
