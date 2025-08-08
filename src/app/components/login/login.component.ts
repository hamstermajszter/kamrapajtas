import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Bejelentkezés</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="form" (ngSubmit)="onSignIn()">
          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" type="email" />
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Jelszó</mat-label>
            <input matInput formControlName="password" type="password" />
          </mat-form-field>

          <div class="actions">
            <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || loading()">Belépés</button>
            <button mat-button type="button" (click)="onRegister()" [disabled]="form.invalid || loading()">Regisztráció</button>
          </div>
        </form>

        <div class="divider">vagy</div>

        <button mat-stroked-button color="primary" (click)="onGoogle()" [disabled]="loading()">Belépés Google-lel</button>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card { max-width: 480px; margin: 24px auto; }
    .actions { display: flex; gap: 12px; margin-top: 8px; }
    .divider { text-align: center; margin: 12px 0; color: #666; }
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private snack = inject(MatSnackBar);

  loading = signal(false);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async onSignIn(): Promise<void> {
    if (this.form.invalid) return;
    this.loading.set(true);
    try {
      await this.auth.signInWithEmail(this.form.value.email!, this.form.value.password!);
      this.router.navigate(['/kamra']);
    } catch (e: any) {
      this.snack.open(e?.message || 'Bejelentkezési hiba', 'Bezár', { duration: 4000 });
    } finally {
      this.loading.set(false);
    }
  }

  async onRegister(): Promise<void> {
    if (this.form.invalid) return;
    this.loading.set(true);
    try {
      await this.auth.registerWithEmail(this.form.value.email!, this.form.value.password!);
      this.router.navigate(['/kamra']);
    } catch (e: any) {
      this.snack.open(e?.message || 'Regisztrációs hiba', 'Bezár', { duration: 4000 });
    } finally {
      this.loading.set(false);
    }
  }

  async onGoogle(): Promise<void> {
    this.loading.set(true);
    try {
      await this.auth.signInWithGoogle();
      this.router.navigate(['/kamra']);
    } catch (e: any) {
      this.snack.open(e?.message || 'Google bejelentkezési hiba', 'Bezár', { duration: 4000 });
    } finally {
      this.loading.set(false);
    }
  }
}