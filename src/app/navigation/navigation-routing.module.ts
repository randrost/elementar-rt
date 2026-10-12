import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'breadcrumbs',
    loadChildren: () => import('./breadcrumbs/breadcrumbs.module').then(m => m.BreadcrumbsModule)
  },
  {
    path: 'tab-panel',
    loadChildren: () => import('./tab-panel/tab-panel.module').then(m => m.TabPanelModule)
  },
  {
    path: 'navigation',
    loadChildren: () => import('./nav/nav.module').then(m => m.NavModule)
  },
  {
    path: 'rail-nav',
    loadChildren: () => import('./rail-nav/rail-nav.module').then(m => m.RailNavModule)
  },
  {
    path: 'navigation-bar',
    loadChildren: () => import('./navigation-bar/navigation-bar.module').then(m => m.NavigationBarModule)
  },
  {
    path: 'side-panel',
    loadChildren: () => import('./side-panel/side-panel.module').then(m => m.SidePanelModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
