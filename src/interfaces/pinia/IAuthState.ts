import { ITenant } from 'models/ITenant';
import { IUser } from 'models/IUser';

export interface IAuthState {
    loggedUserEmail: string | null;
    user: IUser | null;
    selectedTenant: ITenant | null;
    isSingleTenant: boolean;
    isLoggedIn: boolean;
    token: string | null;
    error: string;
    loading: boolean
    wrongUserNameOrPassword: boolean
}
