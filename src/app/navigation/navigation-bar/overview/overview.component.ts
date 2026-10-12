import { Component } from '@angular/core';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';
import { MatDivider } from '@angular/material/divider';
import { BasicNavigationBarExampleComponent } from '../_examples/basic-navigation-bar-example/basic-navigation-bar-example.component';
import { NavigationBarBadgesExampleComponent } from '../_examples/navigation-bar-badges-example/navigation-bar-badges-example.component';
import { WideNavigationBarExampleComponent } from '../_examples/wide-navigation-bar-example/wide-navigation-bar-example.component';
import { NavigationBarTwoWayBindingExampleComponent } from '../_examples/navigation-bar-two-way-binding-example/navigation-bar-two-way-binding-example.component';

@Component({
  imports: [
    PlaygroundComponent,
    PageComponent,
    PageContentDirective,
    PageTitleDirective,
    MatDivider,
    BasicNavigationBarExampleComponent,
    NavigationBarBadgesExampleComponent,
    WideNavigationBarExampleComponent,
    NavigationBarTwoWayBindingExampleComponent
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {}
