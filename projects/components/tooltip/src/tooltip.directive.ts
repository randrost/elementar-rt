import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  Directive,
  ElementRef,
  EnvironmentInjector,
  inject,
  input,
  OnDestroy,
  TemplateRef
} from '@angular/core';
import { TooltipComponent } from './tooltip.component';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

@Directive({
  selector: '[emrTooltip]',
  exportAs: 'emrTooltip',
  host: {
    '(mouseenter)': '_show()',
    '(mouseleave)': '_hide()',
    '(focusin)': '_show()',
    '(focusout)': '_hide()',
  }
})
export class TooltipDirective implements OnDestroy {
  emrTooltip = input<string | TemplateRef<any>>('');
  tooltipPlacement = input<TooltipPlacement>('top');
  tooltipDisabled = input(false);

  private _el = inject(ElementRef<HTMLElement>);
  private _appRef = inject(ApplicationRef);
  private _injector = inject(EnvironmentInjector);
  private _ref: ComponentRef<TooltipComponent> | null = null;

  protected _show() {
    if (this.tooltipDisabled() || !this.emrTooltip() || this._ref) return;

    const host = document.createElement('div');
    document.body.appendChild(host);

    this._ref = createComponent(TooltipComponent, {
      environmentInjector: this._injector,
      hostElement: host,
    });

    const content = this.emrTooltip();
    if (typeof content === 'string') {
      this._ref.setInput('text', content);
    } else {
      this._ref.setInput('templateRef', content);
    }
    this._ref.setInput('placement', this.tooltipPlacement());

    this._appRef.attachView(this._ref.hostView);
    this._ref.changeDetectorRef.detectChanges();

    this._position(host);
  }

  protected _hide() {
    this._ref?.destroy();
    this._ref = null;
  }

  private _position(host: HTMLElement) {
    const rect = this._el.nativeElement.getBoundingClientRect();
    const tooltip = host.firstElementChild as HTMLElement;
    if (!tooltip) return;

    const gap = 8;
    const place = this.tooltipPlacement();

    requestAnimationFrame(() => {
      const tw = tooltip.offsetWidth;
      const th = tooltip.offsetHeight;
      let top = 0, left = 0;

      if (place === 'top') {
        top = rect.top + window.scrollY - th - gap;
        left = rect.left + window.scrollX + rect.width / 2 - tw / 2;
      } else if (place === 'bottom') {
        top = rect.bottom + window.scrollY + gap;
        left = rect.left + window.scrollX + rect.width / 2 - tw / 2;
      } else if (place === 'left') {
        top = rect.top + window.scrollY + rect.height / 2 - th / 2;
        left = rect.left + window.scrollX - tw - gap;
      } else {
        top = rect.top + window.scrollY + rect.height / 2 - th / 2;
        left = rect.right + window.scrollX + gap;
      }

      host.style.cssText = `position:absolute;top:${top}px;left:${left}px;z-index:9999;pointer-events:none;`;
    });
  }

  ngOnDestroy() { this._hide(); }
}
