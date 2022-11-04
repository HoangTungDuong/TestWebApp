import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs';
import {
  checkIfMatchingPasswords, uniqueText
} from 'src/app/helper/custom-validation';
import { countries } from 'src/app/models/mock-data';
import { User } from 'src/app/models/user';
import { CommonService } from 'src/app/services/common.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  userNameList: string[] = [];
  commonValidation = [Validators.required, Validators.maxLength(40)];
  registerForm = this.fb.group(this.commonService.userFormControl(countries), {validator: checkIfMatchingPasswords('password', 'confirmPassword')});
  emailList: string[] = [];
  listCountry = countries;
  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private userService: UserService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateNicknameValidation();
    this.updateEmailValidation();
  }

  get nickName() {
    return this.registerForm.get('nickName');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get phone() {
    return this.registerForm.get('phone');
  }
  get country() {
    return this.registerForm.get('country');
  }

  updateNicknameValidation() {
    this.userNameList = this.userService.getUsernameList();
    if (this.userNameList?.length) {
      this.nickName?.addValidators([
        ...this.commonService.commonValidation,
        uniqueText(this.userNameList, '', true),
      ]);
      this.nickName?.updateValueAndValidity();
    }
  }

  updateEmailValidation() {
    this.emailList = this.userService.getEmailList();
    if (this.emailList?.length) {
      this.email?.addValidators([
        ...this.commonService.commonValidation,
        uniqueText(this.emailList, '', true),
      ]);
      this.email?.updateValueAndValidity();
    }
  }

  save() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      return;
    }
    const userInput = this.registerForm.value as User;
    this.userService
      .registerUser(userInput)
      .pipe(
        concatMap((val) => this.doLogin(userInput.nickName, userInput.password))
      )
      .subscribe((user) => {
        this.loginSuccess(user);
      });
  }

  doLogin(username: string, password: string) {
    return this.userService.login(username || '', password || '');
  }

  loginSuccess(value: User) {
    this.storageService.setLoggedInKey(value);
    this.redirectToBoard();
  }

  redirectToBoard() {
    this.router.navigate(['user']);
  }
}
