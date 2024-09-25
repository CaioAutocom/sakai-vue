import { IGetAllPersonResponse } from 'models/responses/IGetAllPersonResponse';
import { IPerson } from '../../models/IPerson';

export interface IPersonState {
    getAllPersonsResponse: IGetAllPersonResponse;
    persons: IPerson[] | null;
    selectedPerson: IPerson | null;
    formVisible: boolean;
    error: null;
}
