import { ILocalStorageService } from 'interfaces/ILocalStorageService';
import { IPersonService } from 'interfaces/IPersonService';
import { Container } from 'inversify';
import { IAuthService } from '../interfaces/IAuthService';
import { AuthService } from '../service/AuthService';
import { LocalStorageService } from '../service/LocalStorageService';
import { PersonService } from '../service/PersonService';
import { TYPES } from '../types';

const container = new Container();

container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
container.bind<IPersonService>(TYPES.IPersonService).to(PersonService);
container.bind<ILocalStorageService>(TYPES.ILocalStorageService).to(LocalStorageService);

export { container };
