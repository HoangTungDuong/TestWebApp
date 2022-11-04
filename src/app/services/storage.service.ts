import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // Storage service will serve as BE server
  keyUserList = "USER_LIST";
  keyLoggedInUser = "USER_LOGGED_IN_USER";
  keyRememberMe = "REMEMBER_USERNAME_PASSWORD"

  constructor() { }

  setUserList(list: User[]) {
    localStorage.setItem(this.keyUserList, JSON.stringify(list));
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  getUserList(): User[] {
    const userListStr = localStorage.getItem(this.keyUserList);
    if(userListStr) {
      return JSON.parse(userListStr);
    }
    return [];
  }

  setLoggedInKey(user: User) {
    localStorage.setItem(this.keyLoggedInUser, JSON.stringify(user));
  }

  getLoggedInUser() {
    const userDetail = localStorage.getItem(this.keyLoggedInUser);
    if(userDetail) {
      return JSON.parse(userDetail);
    }
    return null;
  }

  logout() {
    localStorage.removeItem(this.keyLoggedInUser);
  }

  setRememberUsernamePassword(username: string, password: string) {
    localStorage.setItem(this.keyRememberMe, JSON.stringify({
      username,
      password,
      rememberMe: true
    }));
  }
  
  getRememberUsernamePassword() {
    const userCredential = localStorage.getItem(this.keyRememberMe);
    if(userCredential) {
      return JSON.parse(userCredential);
    }
  }
}
