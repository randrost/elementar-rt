import { Component } from '@angular/core';

@Component({
  selector: 'emr-menu-divider',
  template: '',
  styles: [`:host { display: block; height: 1px; background: var(--color-outline-variant); margin: calc(var(--spacing) * 1) 0; }`],
  host: { 'class': 'emr-menu-divider', 'role': 'separator' }
})
export class MenuDividerComponent {}
