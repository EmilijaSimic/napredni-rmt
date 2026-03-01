import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '../shared/services/account.service';

@Component({
  selector: 'la-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage = '';
  isLoading = false;
  showPassword = false;

  constructor(private fb: FormBuilder, private router: Router, private accountService: AccountService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.accountService.signIn(this.loginForm.value).subscribe({
      next: () => {
        if (this.accountService.isInRole('kompanija')) {
          this.router.navigate(['/promo-materijali']);
        } else if (this.accountService.isInRole('admin')) {
          this.router.navigate(['/projekti']);
        } else {
          const iteracijaId = this.accountService.getIteracijaId();
          if (iteracijaId) {
            this.router.navigate(['/projekat', iteracijaId, 'robni-partneri'], {
              queryParams: { tipPartnera: 'robni' },
            });
          } else {
            this.router.navigate(['/projekti']);
          }
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message || 'Pogrešno korisničko ime ili lozinka.';
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
