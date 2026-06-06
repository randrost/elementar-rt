import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  TemplateRef,
  Type
} from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';

export interface DialogConfig<D = any> {
  data?: D;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
  disableClose?: boolean;
  panelClass?: string | string[];
}

export interface DialogRef<R = any> {
  close: (result?: R) => void;
  afterClosed: () => Promise<R | undefined>;
}

@Injectable({ providedIn: 'root' })
export class EmrDialog {
  private _appRef = inject(ApplicationRef);
  private _injector = inject(EnvironmentInjector);

  open<T, R = any>(
    componentOrTemplate: Type<T> | TemplateRef<T>,
    config: DialogConfig = {}
  ): DialogRef<R> {
    const host = document.createElement('div');
    document.body.appendChild(host);

    const dialogRef: DialogRef<R> = {} as any;
    let resolveClose: (value: R | undefined) => void;
    const afterClosedPromise = new Promise<R | undefined>(res => (resolveClose = res));

    const close = (result?: R) => {
      compRef.destroy();
      host.remove();
      resolveClose(result);
    };

    const compRef: ComponentRef<DialogComponent> = createComponent(DialogComponent, {
      environmentInjector: this._injector,
      hostElement: host,
    });

    compRef.setInput('size', config.size ?? 'md');
    compRef.setInput('disableClose', config.disableClose ?? false);
    compRef.setInput('panelClass', config.panelClass ?? '');
    compRef.setInput('contentComponent', componentOrTemplate instanceof TemplateRef ? null : componentOrTemplate);
    compRef.setInput('contentTemplate', componentOrTemplate instanceof TemplateRef ? componentOrTemplate : null);
    compRef.setInput('data', config.data);
    compRef.instance.closeRequest.subscribe(() => close());

    this._appRef.attachView(compRef.hostView);
    compRef.changeDetectorRef.detectChanges();

    dialogRef.close = close;
    dialogRef.afterClosed = () => afterClosedPromise;

    return dialogRef;
  }
}
