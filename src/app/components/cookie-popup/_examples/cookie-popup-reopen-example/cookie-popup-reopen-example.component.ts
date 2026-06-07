import { Component, signal } from '@angular/core';
import {
  CookiePopupComponent,
  CookiePopupTitleDirective,
  CookiePopupAcceptNecessaryOnlyButtonDirective,
  CookiePopupAcceptAllButtonDirective
} from '@elementar-rt/components/cookie-popup';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-cookie-popup-reopen-example',
  imports: [
    CookiePopupComponent,
    CookiePopupTitleDirective,
    CookiePopupAcceptNecessaryOnlyButtonDirective,
    CookiePopupAcceptAllButtonDirective,
    MatButton
  ],
  templateUrl: './cookie-popup-reopen-example.component.html',
  styleUrl: './cookie-popup-reopen-example.component.scss'
})
export class CookiePopupReopenExampleComponent {
  visible = signal(false);
  preference = signal('');

  onCookieAccepted(type: string): void {
    this.preference.set(type);
    this.visible.set(false);
  }
}
