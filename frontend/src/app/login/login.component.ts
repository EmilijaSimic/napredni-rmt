import {
  CommonModule
} from '@angular/common';
import {
  Component
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  Router,
  RouterModule
} from '@angular/router';
import {
  AccountService
} from '../shared/services/account.service';
import {
  LS_USER_TOKEN,
  LS_USER_ROLES
} from '../shared/constants';

@Component({
  selector: 'la-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private accountService: AccountService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }

    // TODO: Implement real authentication
    localStorage.setItem(LS_USER_TOKEN, 'token');
    localStorage.setItem(LS_USER_ROLES, 'admin, customer');

    this.router.navigate(['/projekti']);
  }

  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}