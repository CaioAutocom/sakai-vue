import { injectable } from 'inversify';
import { ToastMessageOptions } from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { INotificationService } from '../interfaces/INotificationService';

@injectable()
export class NotificationService implements INotificationService {
    private toast = useToast();

    success(message: string, title = 'Sucesso') {
        this.toast.add({
            severity: 'success',
            summary: title,
            detail: message,
            life: 3000
        });
    }

    error(message: string, title = 'Erro') {
        this.toast.add({
            severity: 'error',
            summary: title,
            detail: message,
            life: 3000
        });
    }

    info(message: string, title = 'Informação') {
        this.toast.add({
            severity: 'info',
            summary: title,
            detail: message,
            life: 3000
        });
    }

    warn(message: string, title = 'Atenção') {
        this.toast.add({
            severity: 'warn',
            summary: title,
            detail: message,
            life: 3000
        });
    }

    custom(message: string, title: string, severity: ToastMessageOptions['severity'], duration = 3000) {
        this.toast.add({
            severity,
            summary: title,
            detail: message,
            life: duration
        });
    }
}
