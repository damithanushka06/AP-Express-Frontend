import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PaymentListComponent} from "./payment-list/payment-list.component";
import {CreatePaymentComponent} from "./create-payment/create-payment.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Payments',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'payment-list',
      },
      {
        path: 'payment-list',
        component: PaymentListComponent,
        data: {
          title: 'All Payments',
        },
      },
      {
        path: 'payment-create',
        component: CreatePaymentComponent,
        data: {
          title: 'Create Payment',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
