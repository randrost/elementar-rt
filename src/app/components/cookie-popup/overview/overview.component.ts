import { Component } from '@angular/core';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import {
  BasicCookiePopupExampleComponent
} from '../_examples/basic-cookie-popup-example/basic-cookie-popup-example.component';
import {
  CookiePopupReopenExampleComponent
} from '../_examples/cookie-popup-reopen-example/cookie-popup-reopen-example.component';
import { PageTitleDirective } from '@meta/page/page-title.directive';

@Component({
  imports: [
    PageComponent,
    PageContentDirective,
    PlaygroundComponent,
    BasicCookiePopupExampleComponent,
    CookiePopupReopenExampleComponent,
    PageTitleDirective
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {

}
