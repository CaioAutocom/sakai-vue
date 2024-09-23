import { Container } from 'inversify';
import { IAuthService } from '../interfaces/IAuthService';
import { INotificationService } from '../interfaces/INotificationService';
import { AuthService } from '../service/AuthService';
import { NotificationService } from '../service/NotificationService';
import { TYPES } from '../types';

const container = new Container();
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
container.bind<INotificationService>(TYPES.INotificationService).to(NotificationService);

export { container };

