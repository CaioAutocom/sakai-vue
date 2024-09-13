import { Container } from 'inversify';
import { IClienteService } from '../interfaces/IClienteService';
import { ClienteService } from '../service/ClienteService';
import { TYPES } from '../types';

const container = new Container();
// container.bind<IAuthService>('IAuthService').to(AuthService);

container.bind<IClienteService>(TYPES.IClienteService).to(ClienteService);

export { container };
