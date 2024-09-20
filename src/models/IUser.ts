import { ITenant } from './ITenant';

export interface IUser {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
    emailConfirmed: boolean;
    phoneNumber: string | null;
    imageUrl: string | null;
    tenantId: string | null;
    tenants: ITenant[] | null;
}
