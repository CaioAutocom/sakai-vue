import { IToken } from 'models/IToken';
import { IUser } from 'models/IUser';

export interface IAuthService {
    login(email: string, password: string): Promise<IUser>;
    obterToken(email: string, password: string, tentantId: string): Promise<IToken>;
}
