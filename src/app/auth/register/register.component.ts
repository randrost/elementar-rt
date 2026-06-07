import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, MatFormField, MatLabel, MatInput, MatButton, MatCheckbox, MatDivider],
  template: `
    <div class="auth-layout">
      <div class="auth-form-panel">
        <div class="auth-form-inner">
          <h2 class="auth-title">Create an account</h2>
          <p class="auth-sub">Get started with Elementar RT today.</p>

          <form class="auth-form">
            <div class="auth-row-2">
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>First name</mat-label>
                <input matInput type="text" name="firstName" autocomplete="given-name" />
              </mat-form-field>
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Last name</mat-label>
                <input matInput type="text" name="lastName" autocomplete="family-name" />
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Email</mat-label>
              <input matInput type="email" name="email" autocomplete="email" required />
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Password</mat-label>
              <input matInput type="password" name="password" autocomplete="new-password" required />
            </mat-form-field>

            <mat-checkbox>I agree to the <a routerLink="." class="auth-link">Terms of Service</a> and <a routerLink="." class="auth-link">Privacy Policy</a></mat-checkbox>

            <button mat-flat-button color="primary" type="submit" class="auth-submit">
              Create account
            </button>
          </form>

          <mat-divider class="my-6" />

          <p class="auth-footer">
            Already have an account?
            <a routerLink="/auth/login" class="auth-link">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @reference 'tailwindcss';

    .auth-layout { display: flex; min-height: 100dvh; align-items: center; justify-content: center; background: var(--color-surface); padding: --spacing(8) --spacing(6); }
    .auth-form-inner { width: 100%; max-width: --spacing(104); }
    .auth-title { font-size: 1.75rem; font-weight: 800; margin-bottom: --spacing(1); }
    .auth-sub { color: var(--color-on-surface-variant); margin-bottom: --spacing(6); }
    .auth-form { display: flex; flex-direction: column; gap: --spacing(1); }
    .auth-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: --spacing(3); }
    .auth-link { color: var(--color-primary); font-weight: 500; text-decoration: none; &:hover { text-decoration: underline; } }
    .auth-submit { width: 100%; height: --spacing(11); margin-top: --spacing(2); }
    .auth-footer { text-align: center; color: var(--color-on-surface-variant); font-size: 0.9rem; }
  `],
})
export class RegisterComponent {}
