import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, MatFormField, MatLabel, MatInput, MatButton, MatCheckbox, MatDivider],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = signal('');
  password = signal('');
  remember = signal(false);
  loading = signal(false);

  readonly features = [
    '120+ Angular components',
    'Material 3 design system',
    'Tailwind CSS 4 powered',
    'Signal-based APIs',
    'Dark mode support',
    'Fully accessible',
  ];

  onSubmit(): void {
    this.loading.set(true);
    setTimeout(() => this.loading.set(false), 1500);
  }
}
