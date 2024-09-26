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

export interface IGetAllPersonRequest {
    pageNumber: number | null;
    pageSize: number | null;
    searchTerm: string | null;
    sortColumn: string | null;
    reverseOrder: boolean;
    enable: boolean;
}
