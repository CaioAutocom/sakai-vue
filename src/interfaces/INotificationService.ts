import { ToastMessageOptions } from 'primevue/toast';

export interface INotificationService {
    success(message: string, title: 'Sucesso');
    error(message: string, title: 'Erro');
    info(message: string, title: 'Informação');
    warn(message: string, title: 'Atenção');
    custom(message: string, title: string, severity: ToastMessageOptions['severity'], duration: number);
}
