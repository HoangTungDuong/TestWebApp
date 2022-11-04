import { Component, OnInit } from '@angular/core';
import { userList } from './models/mock-data';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'codix-test';
  constructor(private storageService: StorageService) {}
  ngOnInit(): void {
    const currentUserList = this.storageService.getUserList();
    if (!currentUserList?.length) {
      this.storageService.setUserList(userList);
    }
  }
}
