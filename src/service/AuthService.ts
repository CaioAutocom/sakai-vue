import axios from 'axios';
import { injectable } from 'inversify';
import { IToken } from 'models/IToken';
import { API_ENDPOINTS } from '../api/api.endpoints';
import { IAuthService } from '../interfaces/IAuthService';
import { IUser } from '../models/IUser';

@injectable()
export class AuthService implements IAuthService {
    private urlLogin = API_ENDPOINTS.apiUrl + API_ENDPOINTS.login;
    private urlObterToken = API_ENDPOINTS.apiUrl + API_ENDPOINTS.obterToken;

    async login(email: string, password: string): Promise<IUser> {
        const response = await axios.post<IUser>(this.urlLogin, { email, password });
        console.log(response.data);
        return response.data;
    }

    async obterToken(email: string, password: string, tenantId: string): Promise<IToken> {
        const response = await axios.post<IToken>(this.urlObterToken, { email, password, tenantId });
        console.log(response.data);
        return response.data;
    }
}
