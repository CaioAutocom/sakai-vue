import { Container } from 'inversify';
import { AuthService } from '../api/AuthService';
import { IAuthService } from '../interfaces/IAuthService';
import { IClienteService } from '../interfaces/IClienteService';
import { ClienteService } from '../service/ClienteService';

const container = new Container();
container.bind<IAuthService>('IAuthService').to(AuthService);
container.bind<IClienteService>('IClienteService').to(ClienteService);

export { container };
