import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {

    constructor(
        private storageService: StorageService,
        private router: Router

    ) {}

    ngOnInit(): void {
    }

    logout() {
        this.storageService.logout();
        this.router.navigate(['auth']);
    }
}
