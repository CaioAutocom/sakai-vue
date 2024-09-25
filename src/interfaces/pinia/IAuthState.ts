import { ITenant } from 'models/ITenant';
import { IToken } from 'models/IToken';
import { IUser } from 'models/IUser';

export interface IAuthState {
    loggedUserEmail: string | null;
    user: IUser | null;
    selectedTenant: ITenant | null;
    isSingleTenant: boolean;
    isLoggedIn: boolean;
    token: IToken | null;
    error: string;
    loading: boolean;
    wrongUserNameOrPassword: boolean;
    rememberMe: boolean;
}
