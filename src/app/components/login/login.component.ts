import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: '../auth-shared.css',
})
export class LoginComponent {
  

  readonly errorMessage = signal<string | null>(null);
  readonly submitting = signal(false);
  private fb = inject(FormBuilder);
  constructor(
    // private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.errorMessage.set(null);
    const { email, password } = this.form.getRawValue();
    const result = this.auth.login(email!, password!);
    this.submitting.set(false);

    if (!result.ok) {
      this.errorMessage.set(result.message ?? 'Could not log in.');
      return;
    }
    const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo') ?? '/';
    this.router.navigateByUrl(redirectTo);
  }
}
