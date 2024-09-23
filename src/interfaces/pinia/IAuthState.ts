import { ITenant } from 'models/ITenant';
import { IUser } from 'models/IUser';

export interface IAuthState {
    email: string | null;
    password: string | null;
    user: IUser | null;
    selectedTenant: ITenant | null;
    isSingleTenant: boolean;
    isLoggedIn: boolean;
    token: string | null;
}
