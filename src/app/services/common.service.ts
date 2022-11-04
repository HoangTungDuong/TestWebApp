import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  commonValidation = [Validators.required, Validators.maxLength(40)];
  constructor(private http: HttpClient) {}

  getLoggedInUser() {
    return {
      nickName: 'Nick001',
      password: '123456',
      confirmPassword: '123456',
      email: 'account001@gmail.com',
      phone: '0123456789',
      country: 'Laos',
    };
  }

  userFormControl(countries: Country[]) {
    return {
      nickName: ['', [...this.commonValidation]],
      password: ['', [...this.commonValidation]],
      confirmPassword: ['', [...this.commonValidation]],
      email: [
        '',
        [
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      phone: ['', [Validators.required, Validators.maxLength(15)]],
      country: [countries[0].value, [...this.commonValidation]],
    }
  }
}
