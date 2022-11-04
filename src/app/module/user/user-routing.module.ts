import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardUserComponent } from './board-user/board-user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
    {
        path: '',
        component: BoardUserComponent,
        children: [
            {
                path: 'user-detail',
                component: UserDetailComponent,
            },
            {
                path: '',
                redirectTo: 'user-detail',
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}
