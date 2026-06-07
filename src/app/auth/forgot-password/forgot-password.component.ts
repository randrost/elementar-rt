import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, FormsModule, MatFormField, MatLabel, MatInput, MatButton],
  template: `
    <div class="auth-layout">
      <div class="auth-form-inner">
        @if (!_sent()) {
          <div class="auth-icon">📧</div>
          <h2 class="auth-title">Forgot your password?</h2>
          <p class="auth-sub">Enter your email and we'll send you a reset link.</p>

          <form class="auth-form" (ngSubmit)="_sent.set(true)">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Email</mat-label>
              <input matInput type="email" name="email" autocomplete="email" required />
            </mat-form-field>
            <button mat-flat-button color="primary" type="submit" class="auth-submit">Send reset link</button>
          </form>
        } @else {
          <div class="auth-icon">✅</div>
          <h2 class="auth-title">Check your email</h2>
          <p class="auth-sub">We've sent a password reset link to your email address.</p>
          <button mat-flat-button color="primary" class="auth-submit" (click)="_sent.set(false)">Back</button>
        }

        <div class="auth-footer">
          <a routerLink="/auth/login" class="auth-link">← Back to sign in</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @reference 'tailwindcss';

    .auth-layout { display: flex; min-height: 100dvh; align-items: center; justify-content: center; background: var(--color-surface); padding: --spacing(8) --spacing(6); }
    .auth-form-inner { width: 100%; max-width: --spacing(88); text-align: center; }
    .auth-icon { font-size: 2.5rem; margin-bottom: --spacing(4); }
    .auth-title { font-size: 1.75rem; font-weight: 800; margin-bottom: --spacing(1); }
    .auth-sub { color: var(--color-on-surface-variant); margin-bottom: --spacing(6); }
    .auth-form { display: flex; flex-direction: column; gap: --spacing(3); }
    .auth-link { color: var(--color-primary); font-weight: 500; text-decoration: none; &:hover { text-decoration: underline; } }
    .auth-submit { width: 100%; height: --spacing(11); }
    .auth-footer { margin-top: --spacing(6); }
  `],
})
export class ForgotPasswordComponent {
  protected _sent = signal(false);
}
