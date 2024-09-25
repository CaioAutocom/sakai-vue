import { injectable } from 'inversify';
import { ILocalStorageService } from '../interfaces/ILocalStorageService';

@injectable()
export class LocalStorageService implements ILocalStorageService {
    setItem(key: string, value: string, useSession: boolean = false): void {
        if (useSession) {
            sessionStorage.setItem(key, value);
        } else {
            localStorage.setItem(key, value);
        }
    }
    getItem(key: string, useSession: boolean = false): string | null {
        if (useSession) {
            return sessionStorage.getItem(key);
        } else {
            return localStorage.getItem(key);
        }
    }

    removeItem(key: string, useSession: boolean = false): void {
        if (useSession) {
            sessionStorage.removeItem(key);
        } else {
            localStorage.removeItem(key);
        }
    }
}
