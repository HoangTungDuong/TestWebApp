import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthBoardComponent } from './auth-board/auth-board.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
    {
        path: '',
        component: AuthBoardComponent,
        children: [
            {
                path: 'registration',
                component: RegistrationComponent,
            },
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
