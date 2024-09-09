import axios from 'axios';
import { injectable } from 'inversify';
import { IAuthService } from '../interfaces/IAuthService';
import { IUser } from '../models/IUser';
import { API_ENDPOINTS } from './api.endpoints';

@injectable()
export class AuthService implements IAuthService {
    private urlLogin = API_ENDPOINTS.apiUrl + API_ENDPOINTS.login;

    async login(email: string, password: string): Promise<IUser> {
        const response = await axios.post<IUser>(this.urlLogin, { email, password });
        console.log(response.data);
        return response.data;
    }
}
