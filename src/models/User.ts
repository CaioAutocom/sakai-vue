import { Tenant } from './Tenant';

export interface User {
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
    tenants: Tenant[];
}
