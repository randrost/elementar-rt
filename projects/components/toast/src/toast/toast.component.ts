import { Component, input, output, signal, OnInit, OnDestroy, computed } from '@angular/core';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

@Component({
  selector: 'emr-toast',
  exportAs: 'emrToast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  host: {
    'class': 'emr-toast',
    '[attr.data-variant]': 'variant()',
  }
})
export class ToastComponent implements OnInit, OnDestroy {
  title = input('');
  message = input('');
  action = input('');
  variant = input<ToastVariant>('default');
  duration = input(4000);
  showProgress = input(true);

  readonly dismissed = output<void>();
  readonly actionClick = output<void>();

  protected _progress = signal(100);
  private _timer: any;
  private _interval: any;

  ngOnInit() {
    const d = this.duration();
    if (d <= 0) return;
    const step = 50;
    const decrement = (step / d) * 100;
    this._interval = setInterval(() => {
      this._progress.update(p => Math.max(0, p - decrement));
    }, step);
    this._timer = setTimeout(() => this.dismissed.emit(), d);
  }

  ngOnDestroy() {
    clearTimeout(this._timer);
    clearInterval(this._interval);
  }

  protected _dismiss() {
    clearTimeout(this._timer);
    clearInterval(this._interval);
    this.dismissed.emit();
  }
}
