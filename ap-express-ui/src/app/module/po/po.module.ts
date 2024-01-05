import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { PoRoutingModule } from './po-routing.module';
import { PoComponent } from './po.component';
import { CreatePoComponent } from './create-po/create-po.component';
import { PoListComponent } from './po-list/po-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {ButtonModule, ModalModule, NavModule, TableModule, TabsModule} from "@coreui/angular";
import {NgxDropzoneModule} from "ngx-dropzone";
import {SharedModule} from "../shared/shared.module";
import {NgxCurrencyModule} from "ngx-currency";
import {ItemModule} from "../item/item.module";
import {CalendarModule} from "primeng/calendar";


@NgModule({
  declarations: [
    PoComponent,
    CreatePoComponent,
    PoListComponent,
  ],
    imports: [
        CommonModule,
        PoRoutingModule,
        ReactiveFormsModule,
        NgSelectModule,
        NavModule,
        TabsModule,
        TableModule,
        NgxDropzoneModule,
        CommonModule,
        SharedModule,
        NgxCurrencyModule,
        ButtonModule,
        ItemModule,
        ModalModule,
        CalendarModule,
    ],
  providers:[DatePipe]
})
export class PoModule { }
