import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  Injectable,
} from '@angular/core';
import { ToastComponent } from '../toast.component';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private toastRef: ComponentRef<ToastComponent> | null = null;
  private counter = 0;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector,
  ) {
    this.createToastHost();
  }

  private createToastHost(): void {
    this.toastRef = createComponent(ToastComponent, {
      environmentInjector: this.injector,
    });
    this.appRef.attachView(this.toastRef.hostView);
    document.body.appendChild(this.toastRef.location.nativeElement);
  }

  private show(
    message: string,
    type: 'default' | 'success' | 'info' | 'warning' | 'error',
  ): void {
    const id = this.counter++;
    this.toastRef!.instance.toasts.push({ id, message, type });
    this.toastRef!.changeDetectorRef.detectChanges();
    setTimeout(() => {
      this.toastRef!.instance.toasts = this.toastRef!.instance.toasts.filter(
        (t) => t.id !== id,
      );
      this.toastRef!.changeDetectorRef.detectChanges();
    }, 3000);
  }

  onDefault(message: string): void {
    this.show(message, 'default');
  }
  onSuccess(message: string): void {
    this.show(message, 'success');
  }
  onInfo(message: string): void {
    this.show(message, 'info');
  }
  onWarning(message: string): void {
    this.show(message, 'warning');
  }
  onError(message: string): void {
    this.show(message, 'error');
  }
}
