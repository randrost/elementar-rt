import { Component } from '@angular/core';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import { BasicStepTrackerExampleComponent } from '../_examples/basic-step-tracker-example/basic-step-tracker-example.component';
import { StepTrackerVerticalExampleComponent } from '../_examples/step-tracker-vertical-example/step-tracker-vertical-example.component';
import { StepTrackerInteractiveExampleComponent } from '../_examples/step-tracker-interactive-example/step-tracker-interactive-example.component';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';
import { MatDivider } from '@angular/material/divider';

@Component({
  imports: [
    PlaygroundComponent,
    BasicStepTrackerExampleComponent,
    StepTrackerVerticalExampleComponent,
    StepTrackerInteractiveExampleComponent,
    PageComponent, PageContentDirective, PageTitleDirective, MatDivider
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {}
