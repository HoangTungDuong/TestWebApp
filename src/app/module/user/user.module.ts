import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BoardUserComponent } from './board-user/board-user.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
    declarations: [
        BoardUserComponent,
        UserDetailComponent,
        NavBarComponent
    ],
    imports: [CommonModule, UserRoutingModule, FormsModule, SharedModule],
})
export class UserModule {}
