import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NumericOnly } from 'src/app/directives/numeric-only.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthBoardComponent } from './auth-board/auth-board.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
    declarations: [
        RegistrationComponent,
        LoginComponent,
        AuthBoardComponent,
        NumericOnly
    ],
    imports: [CommonModule, AuthRoutingModule, FormsModule, SharedModule],
})
export class AuthModule {}
