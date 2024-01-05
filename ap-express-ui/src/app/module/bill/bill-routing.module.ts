import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BillListComponent} from "./bill-list/bill-list.component";
import {CreateBillComponent} from "./create-bill/create-bill.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Bills',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'bill-list',
      },
      {
        path: 'bill-list',
        component: BillListComponent,
        data: {
          title: 'All Bills',
        },
      },
      {
        path: 'bill-create',
        component: CreateBillComponent,
        data: {
          title: 'Create Bill',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRoutingModule { }
