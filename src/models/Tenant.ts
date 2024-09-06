export interface Tenant {
    id: string;
    name: string;
    connectionString: string | null;
    tenantGroupId: string;
    adminEmail: string;
    isActive: boolean;
    validUpto: string;
    issuer: string;
    licenseId: string | null;
    tenantsLicense: string | null;
}
