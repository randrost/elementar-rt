import { Component } from '@angular/core';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import { BasicDigitRollerExampleComponent } from '../_examples/basic-digit-roller-example/basic-digit-roller-example.component';
import { DigitRollerAnimatedExampleComponent } from '../_examples/digit-roller-animated-example/digit-roller-animated-example.component';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';
import { MatDivider } from '@angular/material/divider';

@Component({
  imports: [
    PlaygroundComponent,
    BasicDigitRollerExampleComponent,
    DigitRollerAnimatedExampleComponent,
    PageComponent, PageContentDirective, PageTitleDirective, MatDivider
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {}
