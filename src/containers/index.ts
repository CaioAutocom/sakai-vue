import { Container } from 'inversify';
import { IAuthService } from '../interfaces/IAuthService';
import { INotificationService } from '../interfaces/INotificationService';
import { AuthService } from '../service/AuthService';
import { NotificationService } from '../service/NotificationService';

const container = new Container();
container.bind<IAuthService>('IAuthService').to(AuthService);
container.bind<INotificationService>('INotificationService').to(NotificationService);

export { container };
