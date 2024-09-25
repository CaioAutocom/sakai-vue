export interface ILocalStorageService {
    setItem(key: string, value: string, useSession: boolean): void;
    getItem(key: string, useSession: boolean): string | null;
    removeItem(key: string, useSession: boolean): void;
}
