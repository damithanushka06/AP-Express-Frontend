import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropZoneComponent} from "./drop-zone/drop-zone.component";
import {NgxDropzoneModule} from "ngx-dropzone";
import { CommonWorkFlowComponent } from './common-work-flow/common-work-flow.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NumberOnlyDirective } from './directive/number-only.directive';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { ModuleTableCalculationComponent } from './module-table-calculation/module-table-calculation.component';
import {NgxCurrencyModule} from "ngx-currency";
import { ItemInformationTableComponent } from './item-information-table/item-information-table.component';
import { AccountInformationTableComponent } from './account-information-table/account-information-table.component';
import {TableModule} from "@coreui/angular";
import { FormButtonComponent } from './form-button/form-button.component';
import { ApproveButtonsComponent } from './approve-buttons/approve-buttons.component';
import { ButtonModule } from "primeng/button";

@NgModule({
  declarations: [DropZoneComponent, CommonWorkFlowComponent, NumberOnlyDirective, DatePickerComponent, DatePickerComponent, ModuleTableCalculationComponent, ItemInformationTableComponent, AccountInformationTableComponent, FormButtonComponent, ApproveButtonsComponent],
    exports: [
        DropZoneComponent,
        CommonWorkFlowComponent,
        NumberOnlyDirective,
        DatePickerComponent,
        DatePickerComponent,
        ModuleTableCalculationComponent,
        ItemInformationTableComponent,
        AccountInformationTableComponent,
        FormButtonComponent,
        ApproveButtonsComponent
    ],
  imports: [
    CommonModule,
    NgxDropzoneModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCurrencyModule,
    TableModule,
    ButtonModule
  ]
})
export class SharedModule { }
