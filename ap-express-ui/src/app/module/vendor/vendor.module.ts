import { NgModule } from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import { VendorRoutingModule } from './vendor-routing.module';
import { VendorComponent } from './vendor.component';
import { CreateVendorComponent } from './create-vendor/create-vendor.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {ButtonModule, ModalModule} from "@coreui/angular";
import {ItemModule} from "../item/item.module";

@NgModule({
  declarations: [
    VendorComponent,
    CreateVendorComponent,
    VendorListComponent
  ],
    imports: [
        CommonModule,
        VendorRoutingModule,
        FormsModule,
        NgSelectModule,
        ReactiveFormsModule,
        ButtonModule,
        ModalModule,
        NgIf,
        ItemModule
    ]
})
export class VendorModule { }
