import { Component } from '@angular/core';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import {
  BasicSignaturePadExampleComponent
} from '../_examples/basic-signature-pad-example/basic-signature-pad-example.component';
import {
  SignaturePadFormExampleComponent
} from '../_examples/signature-pad-form-example/signature-pad-form-example.component';

@Component({
  imports: [
    PageComponent,
    PageContentDirective,
    PageTitleDirective,
    PlaygroundComponent,
    BasicSignaturePadExampleComponent,
    SignaturePadFormExampleComponent
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {

}
