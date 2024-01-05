import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { CreatePaymentComponent } from './create-payment/create-payment.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import {DatepickerModule} from "ng2-datepicker";
import {NgSelectModule} from "@ng-select/ng-select";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {ItemModule} from "../item/item.module";
import {NgxCurrencyModule} from "ngx-currency";


@NgModule({
  declarations: [
    PaymentComponent,
    CreatePaymentComponent,
    PaymentListComponent
  ],
    imports: [
        CommonModule,
        PaymentRoutingModule,
        DatepickerModule,
        NgSelectModule,
        ReactiveFormsModule,
        SharedModule,
        ItemModule,
        NgxCurrencyModule
    ]
})
export class PaymentModule { }
