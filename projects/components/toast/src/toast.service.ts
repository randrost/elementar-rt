import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable
} from '@angular/core';
import { ToastComponent, ToastVariant } from './toast/toast.component';

export interface ToastConfig {
  title?: string;
  message: string;
  action?: string;
  variant?: ToastVariant;
  duration?: number;
  showProgress?: boolean;
  position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
}

@Injectable({ providedIn: 'root' })
export class EmrToast {
  private _appRef = inject(ApplicationRef);
  private _injector = inject(EnvironmentInjector);
  private _containers = new Map<string, HTMLElement>();

  private _getContainer(position: string): HTMLElement {
    if (!this._containers.has(position)) {
      const el = document.createElement('div');
      el.className = `emr-toast-container emr-toast-${position}`;
      document.body.appendChild(el);
      this._containers.set(position, el);
    }
    return this._containers.get(position)!;
  }

  open(config: ToastConfig): void {
    const {
      title = '', message, action = '', variant = 'default',
      duration = 4000, showProgress = true, position = 'top-right'
    } = config;

    const container = this._getContainer(position);
    const host = document.createElement('div');
    container.appendChild(host);

    const ref: ComponentRef<ToastComponent> = createComponent(ToastComponent, {
      environmentInjector: this._injector,
      hostElement: host,
    });

    ref.setInput('title', title);
    ref.setInput('message', message);
    ref.setInput('action', action);
    ref.setInput('variant', variant);
    ref.setInput('duration', duration);
    ref.setInput('showProgress', showProgress);

    const destroy = () => { ref.destroy(); host.remove(); };
    ref.instance.dismissed.subscribe(destroy);
    ref.instance.actionClick.subscribe(destroy);

    this._appRef.attachView(ref.hostView);
    ref.changeDetectorRef.detectChanges();
  }

  success(message: string, config?: Partial<ToastConfig>) { this.open({ ...config, message, variant: 'success' }); }
  error(message: string, config?: Partial<ToastConfig>) { this.open({ ...config, message, variant: 'error' }); }
  warning(message: string, config?: Partial<ToastConfig>) { this.open({ ...config, message, variant: 'warning' }); }
  info(message: string, config?: Partial<ToastConfig>) { this.open({ ...config, message, variant: 'info' }); }
}
