import { ILocalStorageService } from 'interfaces/ILocalStorageService';
import { Container } from 'inversify';
import { IAuthService } from '../interfaces/IAuthService';
import { AuthService } from '../service/AuthService';
import { LocalStorageService } from '../service/LocalStorageService';
import { TYPES } from '../types';

const container = new Container();

container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
container.bind<ILocalStorageService>(TYPES.ILocalStorageService).to(LocalStorageService);

export { container };
