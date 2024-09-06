import axios from 'axios';
import { injectable } from 'inversify';
import { IAuthService } from '../interfaces/IAuthService';
import { User } from '../models/User';
import { API_ENDPOINTS } from './api.endpoints';

@injectable()
export class AuthService implements IAuthService {
    private urlLogin = API_ENDPOINTS.apiUrl + API_ENDPOINTS.login;

    async login(email: string, password: string): Promise<User> {
        const response = await axios.post<User>(this.urlLogin, { email, password });
        console.log(response.data);
        return response.data;
    }
}
