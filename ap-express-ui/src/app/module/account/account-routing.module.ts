import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccountListComponent} from "./account-list/account-list.component";
import {CreateAccountComponent} from "./create-account/create-account.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Accounts',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'account-list',
      },
      {
        path: 'account-list',
        component: AccountListComponent,
        data: {
          title: 'All Accounts',
        },
      },
      {
        path: 'account-create',
        component: CreateAccountComponent,
        data: {
          title: 'Create Accounts',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
