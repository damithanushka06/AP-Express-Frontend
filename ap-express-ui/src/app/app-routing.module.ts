import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultLayoutComponent} from './containers';
import {LoginComponent} from "./module/auth/login/login.component";
import {RegisterComponent} from "./module/auth/register/register.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'auth',
        loadChildren: () => import('./module/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'vendor',
        loadChildren: () => import('./module/vendor/vendor.module').then(m => m.VendorModule)
      },
      {
        path: 'bill',
        loadChildren: () => import('./module/bill/bill.module').then(m => m.BillModule)
      },
      {
        path: 'po',
        loadChildren: () => import('./module/po/po.module').then(m => m.PoModule)
      },
      {
        path: 'por',
        loadChildren: () => import('./module/po-receipt/po-receipt.module').then(m => m.PoReceiptModule)
      },
      {
        path: 'payment',
        loadChildren: () => import('./module/payment/payment.module').then(m => m.PaymentModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'approval-group',
        loadChildren: () => import('./module/approval-group/approval-group.module').then(m => m.ApprovalGroupModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./module/user/user.module').then(m => m.UserModule)
      },

      {path: 'item', loadChildren: () => import('./module/item/item.module').then(m => m.ItemModule)},
      {path: 'account', loadChildren: () => import('./module/account/account.module').then(m => m.AccountModule)},
    ]
  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
