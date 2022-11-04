import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-board-user',
    templateUrl: './board-user.component.html',
    styleUrls: ['./board-user.component.scss'],
})
export class BoardUserComponent implements OnInit {
    isMobile = false;
    constructor() {}

    ngOnInit(): void {
    }
}
