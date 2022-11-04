import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { uniqueText } from 'src/app/helper/custom-validation';
import { countries } from 'src/app/models/mock-data';
import { User } from 'src/app/models/user';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  user!: User;
  userForm = this.fb.group(this.commonService.userFormControl(countries));
  listCountry = countries;
  userNameList: string[] = [];
  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getLoggedInUser();
    if (this.user) {
      this.patchValueToForm();
      this.updateNicknameValidation();
    }
  }

  get nickName() {
    return this.userForm.get('nickName');
  }
  get password() {
    return this.userForm.get('password');
  }
  get confirmPassword() {
    return this.userForm.get('confirmPassword');
  }
  get email() {
    return this.userForm.get('email');
  }
  get phone() {
    return this.userForm.get('phone');
  }
  get country() {
    return this.userForm.get('country');
  }

  updateNicknameValidation() {
    this.userNameList = this.userService.getUsernameList();
    if (this.userNameList?.length) {
      this.nickName?.addValidators([
        ...this.commonService.commonValidation,
        uniqueText(this.userNameList, this.user.nickName),
      ]);
      this.nickName?.updateValueAndValidity();
    }
  }

  update() {
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) {
      return;
    }
    const val = this.userForm.value as User;
    this.userService.updateUserDetail(val);
  }

  patchValueToForm() {
    this.userForm.patchValue(this.user);
  }
}
