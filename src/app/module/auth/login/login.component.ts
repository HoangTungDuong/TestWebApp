import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { LoginCredential } from 'src/app/models/login-credential';
import { User } from 'src/app/models/user';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoginFailed = false;
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const savedCredential = this.storageService.getRememberUsernamePassword();
    if (savedCredential?.rememberMe) {
      this.patchValueToForm(savedCredential);
    }
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }
    this.spinner.show();
    const { username, password } = this.loginForm.value;
    this.userService
      .login(username || '', password || '')
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(
        (value) => {
          this.loginSuccess(value);
          this.handleRememberMe(this.loginForm.value as LoginCredential);
        },
        (error) => {
          this.isLoginFailed = true;
        }
      );
  }

  loginSuccess(value: User) {
    this.storageService.setLoggedInKey(value);
    this.redirectToBoard();
  }

  redirectToBoard() {
    this.router.navigate(['user']);
  }

  patchValueToForm(data: LoginCredential) {
    this.loginForm.patchValue(data);
  }

  handleRememberMe(data: LoginCredential) {
    if(data?.rememberMe) {
      this.storageService.setRememberUsernamePassword(data.username, data.password);
    } else {
      const keyRememberMe = "REMEMBER_USERNAME_PASSWORD"
      this.storageService.removeItem(keyRememberMe);
    }
  }
}
