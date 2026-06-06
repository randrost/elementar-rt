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
import { BottomSheetComponent, BottomSheetSize } from './bottom-sheet/bottom-sheet.component';

export interface BottomSheetConfig {
  size?: BottomSheetSize;
  disableClose?: boolean;
}

@Injectable({ providedIn: 'root' })
export class EmrBottomSheet {
  private _appRef = inject(ApplicationRef);
  private _injector = inject(EnvironmentInjector);

  open<T>(componentOrTemplate: Type<T> | TemplateRef<T>, config: BottomSheetConfig = {}): { close: () => void } {
    const host = document.createElement('div');
    document.body.appendChild(host);

    const ref: ComponentRef<BottomSheetComponent> = createComponent(BottomSheetComponent, {
      environmentInjector: this._injector,
      hostElement: host,
    });

    ref.setInput('size', config.size ?? 'auto');
    ref.setInput('disableClose', config.disableClose ?? false);

    if (componentOrTemplate instanceof TemplateRef) {
      ref.setInput('contentTemplate', componentOrTemplate);
    } else {
      ref.setInput('contentComponent', componentOrTemplate);
    }

    this._appRef.attachView(ref.hostView);

    setTimeout(() => ref.setInput('open', true), 16);

    const close = () => {
      ref.setInput('open', false);
      setTimeout(() => { ref.destroy(); host.remove(); }, 350);
    };

    ref.instance.closeRequest.subscribe(close);
    ref.changeDetectorRef.detectChanges();

    return { close };
  }
}
