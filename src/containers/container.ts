import { Container } from 'inversify';
import { AuthService } from '../api/AuthService';
import { IAuthService } from '../interfaces/IAuthService';

const container = new Container();
container.bind<IAuthService>('IAuthService').to(AuthService);

export { container };
