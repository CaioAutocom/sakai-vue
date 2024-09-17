import { Container } from 'inversify';
import { IAuthService } from '../interfaces/IAuthService';
import { AuthService } from '../service/AuthService';

const container = new Container();
container.bind<IAuthService>('IAuthService').to(AuthService);

export { container };
