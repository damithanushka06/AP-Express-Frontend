import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PoListComponent} from "./po-list/po-list.component";
import {CreatePoComponent} from "./create-po/create-po.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Purchase Orders',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'po-list',
      },
      {
        path: 'po-list',
        component: PoListComponent,
        data: {
          title: 'All Purchase Orders',
        },
      },
      {
        path: 'po-create',
        component: CreatePoComponent,
        data: {
          title: 'Create Purchase Order',
        },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoRoutingModule { }
