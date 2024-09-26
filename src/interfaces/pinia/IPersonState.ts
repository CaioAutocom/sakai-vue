import { IGetAllPersonRequest, IGetAllPersonResponse } from 'models/responses/IGetAllPersonResponse';
import { IPerson } from '../../models/IPerson';

export interface IPersonState {
    personsResponse: IGetAllPersonResponse;
    personsRequest: IGetAllPersonRequest;
    persons: IPerson[] | null;
    selectedPerson: IPerson | null;
    selectedPersons: IPerson[] | null;
    formVisible: boolean;
    error: null;
}
