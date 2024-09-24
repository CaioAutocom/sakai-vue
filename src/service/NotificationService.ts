import { ToastMessageOptions } from 'primevue/toast';
import { ToastServiceMethods } from 'primevue/toastservice';
import { useToast } from 'primevue/usetoast';
import { INotificationService } from '../interfaces/INotificationService';

class NotificationService implements INotificationService {
    private toast: ToastServiceMethods;

    constructor() {
        this.toast = useToast(); 
    }
    success(message: string) {
        this.toast.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: message,
            life: 3000
        });
    }

    error(message: string) {
        this.toast.add({
            severity: 'error',
            summary: 'Erro',
            detail: message,
            life: 3000
        });
    }

    info(message: string) {
        this.toast.add({
            severity: 'info',
            summary: 'Informação',
            detail: message,
            life: 3000
        });
    }

    warn(message: string) {
        this.toast.add({
            severity: 'warn',
            summary: 'Atenção',
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

export { NotificationService };

