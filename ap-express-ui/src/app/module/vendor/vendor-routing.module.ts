import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateVendorComponent} from "./create-vendor/create-vendor.component";
import {VendorListComponent} from "./vendor-list/vendor-list.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Vendor',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'vendor-list',
      },
      {
        path: 'vendor-list',
        component: VendorListComponent,
        data: {
          title: 'All Vendors',
        },
      },
      {
        path: 'vendor-create',
        component: CreateVendorComponent,
        data: {
          title: 'Create Vendor',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
