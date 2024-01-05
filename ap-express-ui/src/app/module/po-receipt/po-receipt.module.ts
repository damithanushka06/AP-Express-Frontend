import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoReceiptRoutingModule } from './po-receipt-routing.module';
import { PoReceiptComponent } from './po-receipt.component';
import { CreatePorComponent } from './create-por/create-por.component';
import { PorListComponent } from './por-list/por-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NavModule, TableModule, TabsModule} from "@coreui/angular";
import {NgSelectModule} from "@ng-select/ng-select";
import {SharedModule} from "../shared/shared.module";
import {NgxCurrencyModule} from "ngx-currency";
import {ItemModule} from "../item/item.module";


@NgModule({
  declarations: [
    PoReceiptComponent,
    CreatePorComponent,
    PorListComponent
  ],
  imports: [
    CommonModule,
    PoReceiptRoutingModule,
    FormsModule,
    NavModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule,
    TabsModule,
    NgxCurrencyModule,
    TableModule,
    ItemModule
  ]
})
export class PoReceiptModule { }
