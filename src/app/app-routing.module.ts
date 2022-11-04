import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./module/auth/auth.module').then(m => m.AuthModule),
    },
    {
        path: 'user',
        loadChildren: () => import('./module/user/user.module').then(m => m.UserModule),
        canActivate: [AuthGuard],
    },
    {
        path: '**',
        redirectTo: 'auth',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
