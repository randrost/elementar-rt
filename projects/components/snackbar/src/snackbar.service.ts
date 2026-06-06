import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable
} from '@angular/core';
import { SnackbarComponent, SnackbarVariant } from './snackbar/snackbar.component';

export interface SnackbarConfig {
  message: string;
  action?: string;
  duration?: number;
  variant?: SnackbarVariant;
  position?: 'bottom-center' | 'bottom-left' | 'bottom-right' | 'top-center';
}

@Injectable({ providedIn: 'root' })
export class EmrSnackbar {
  private _appRef = inject(ApplicationRef);
  private _injector = inject(EnvironmentInjector);
  private _container: HTMLElement | null = null;

  private _getContainer(position: string): HTMLElement {
    if (!this._container) {
      this._container = document.createElement('div');
      this._container.className = `emr-snackbar-container emr-snackbar-${position}`;
      document.body.appendChild(this._container);
    }
    return this._container;
  }

  open(config: SnackbarConfig): void {
    const { message, action, duration = 4000, variant = 'default', position = 'bottom-center' } = config;
    const host = document.createElement('div');
    const container = this._getContainer(position);
    container.appendChild(host);

    const ref: ComponentRef<SnackbarComponent> = createComponent(SnackbarComponent, {
      environmentInjector: this._injector,
      hostElement: host,
    });

    ref.setInput('message', message);
    ref.setInput('action', action ?? '');
    ref.setInput('variant', variant);

    const dismiss = () => {
      ref.destroy();
      host.remove();
    };

    ref.instance.dismissed.subscribe(dismiss);
    ref.instance.actionClick.subscribe(dismiss);
    this._appRef.attachView(ref.hostView);
    ref.changeDetectorRef.detectChanges();

    if (duration > 0) setTimeout(dismiss, duration);
  }

  success(message: string, config?: Partial<SnackbarConfig>) {
    this.open({ ...config, message, variant: 'success' });
  }

  error(message: string, config?: Partial<SnackbarConfig>) {
    this.open({ ...config, message, variant: 'error' });
  }

  warning(message: string, config?: Partial<SnackbarConfig>) {
    this.open({ ...config, message, variant: 'warning' });
  }

  info(message: string, config?: Partial<SnackbarConfig>) {
    this.open({ ...config, message, variant: 'info' });
  }
}
