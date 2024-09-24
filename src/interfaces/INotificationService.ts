import { ToastMessageOptions } from 'primevue/toast';

export interface INotificationService {
    success(message: string, duration: number);
    error(message: string, duration: number);
    info(message: string, duration: number);
    warn(message: string, duration: number);
    custom(message: string, title: string, severity: ToastMessageOptions['severity'], duration: number);
}
