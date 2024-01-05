import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateGroupComponent} from "./create-group/create-group.component";
import {SearchGroupComponent} from "./search-group/search-group.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Approval Groups',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'group-list',
      },
      {
        path: 'group-list',
        component: SearchGroupComponent,
        data: {
          title: 'All Approval Groups',
        },
      },
      {
        path: 'group-create',
        component: CreateGroupComponent,
        data: {
          title: 'Create Approval Group',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalGroupRoutingModule { }
