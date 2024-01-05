import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PorListComponent} from "./por-list/por-list.component";
import {CreatePorComponent} from "./create-por/create-por.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Purchase Orders Receipt',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'por-list',
      },
      {
        path: 'por-list',
        component: PorListComponent,
        data: {
          title: 'All POR',
        },
      },
      {
        path: 'por-create',
        component: CreatePorComponent,
        data: {
          title: 'Create POR',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoReceiptRoutingModule { }
