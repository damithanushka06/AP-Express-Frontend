import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";
import {CreateUserComponent} from "./create-user/create-user.component";
import {UserService} from "../../services/user/user.service";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Users',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'user-list',
      },
      {
        path: 'user-list',
        component: UserListComponent,
        data: {
          title: 'All Users',
        },
      },
      {
        path: 'user-create',
        component: CreateUserComponent,
        data: {
          title: 'Create Users',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserService]
})
export class UserRoutingModule { }
