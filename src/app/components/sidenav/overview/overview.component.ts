import { Component } from '@angular/core';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import { BasicSidenavExampleComponent } from '../_examples/basic-sidenav-example/basic-sidenav-example.component';
import { SidenavPersistentExampleComponent } from '../_examples/sidenav-persistent-example/sidenav-persistent-example.component';
import { SidenavOverlayExampleComponent } from '../_examples/sidenav-overlay-example/sidenav-overlay-example.component';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';
import { MatDivider } from '@angular/material/divider';

@Component({
  imports: [
    PlaygroundComponent,
    BasicSidenavExampleComponent,
    SidenavPersistentExampleComponent,
    SidenavOverlayExampleComponent,
    MatDivider,
    PageComponent,
    PageContentDirective,
    PageTitleDirective
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {}