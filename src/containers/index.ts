import { Container } from 'inversify';
import { IAuthService } from '../interfaces/IAuthService';
import { AuthService } from '../service/AuthService';
import { TYPES } from '../types';

const container = new Container();

container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);


export { container };

