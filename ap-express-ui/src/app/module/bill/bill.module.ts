import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { BillRoutingModule } from './bill-routing.module';
import { BillComponent } from './bill.component';
import { CreateBillComponent } from './create-bill/create-bill.component';
import { BillListComponent } from './bill-list/bill-list.component';
import {DatepickerModule} from "ng2-datepicker";
import {ButtonModule, ModalModule, NavModule, TabsModule} from "@coreui/angular";
import {NgSelectModule} from "@ng-select/ng-select";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {ItemModule} from "../item/item.module";
import {CalendarModule} from "primeng/calendar";
import { BillApproveComponent } from './bill-approve/bill-approve.component';
import {TableModule} from "primeng/table";
import {TabViewModule} from "primeng/tabview";



@NgModule({
  declarations: [
    BillComponent,
    CreateBillComponent,
    BillListComponent,
    BillApproveComponent
  ],
  imports: [
    CommonModule,
    BillRoutingModule,
    DatepickerModule,
    NavModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule,
    TabsModule,
    ButtonModule,
    ItemModule,
    ModalModule,
    CalendarModule,
    TableModule,
    TabViewModule
  ],
  providers: [DatePipe]
})
export class BillModule { }
