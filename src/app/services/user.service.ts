import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../models/user';
import { StorageService } from './storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private storageService: StorageService) {}

  getLoggedInUser() {
    return this.storageService.getLoggedInUser();
  }

  login(username: string, password: string) {
    if (!username || !password) {
      return throwError({ err: 'error' });
    }
    const userList = this.storageService.getUserList();
    const user = userList.find(
      (item) => item.nickName === username && item.password === password
    );
    if (user) {
      return of(user);
    }
    return throwError({ err: 'error' });
  }

  getUsernameList(): string[] {
    const userList = this.storageService.getUserList();
    return userList.map(user => user.nickName);
  }

  getEmailList(): string[] {
    const emailList = this.storageService.getUserList();
    return emailList.map(user => user.email);
  }

  updateUserDetail(user: User) {
    const userList = this.storageService.getUserList();
    const updatedList = userList.map(item => (item.email === user.email ? { ...user } : item))
    this.storageService.setUserList(updatedList);
  }

  registerUser(user: User) {
    const userList = this.storageService.getUserList();
    const updatedList = [...userList , user];
    this.storageService.setUserList(updatedList);
    return of(true);
  }
}
