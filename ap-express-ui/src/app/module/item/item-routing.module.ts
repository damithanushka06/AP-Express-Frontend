import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ItemListComponent} from "./item-list/item-list.component";
import {CreateItemComponent} from "./create-item/create-item.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Items',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'item-list',
      },
      {
        path: 'item-list',
        component: ItemListComponent,
        data: {
          title: 'All Items',
        },
      },
      {
        path: 'item-create',
        component: CreateItemComponent,
        data: {
          title: 'Create Items',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
