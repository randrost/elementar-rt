import { Component } from '@angular/core';
import { ToolbarComponent } from '@elementar-rt/components/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-toolbar-overflow-example',
  imports: [ToolbarComponent, MatIcon, MatIconButton],
  templateUrl: './toolbar-overflow-example.component.html',
  styleUrl: './toolbar-overflow-example.component.scss'
})
export class ToolbarOverflowExampleComponent {}
