import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

function passwordsMatch(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirm = control.get('confirmPassword')?.value;
  return password && confirm && password !== confirm ? { mismatch: true } : null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: '../auth-shared.css',
})
export class RegisterComponent {
private fb = inject(FormBuilder);

  readonly form = this.fb.group(
    {
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordsMatch }
  );

  readonly errorMessage = signal<string | null>(null);
  readonly submitting = signal(false);

  constructor(
    // private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.errorMessage.set(null);
    const { fullName, email, password } = this.form.getRawValue();
    const result = this.auth.register(fullName!, email!, password!);
    this.submitting.set(false);

    if (!result.ok) {
      this.errorMessage.set(result.message ?? 'Could not create account.');
      return;
    }
    this.router.navigateByUrl('/');
  }
}
