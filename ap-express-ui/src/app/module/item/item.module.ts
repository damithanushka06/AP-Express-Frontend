import { NgModule } from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import { ItemRoutingModule } from './item-routing.module';
import { ItemComponent } from './item.component';
import { CreateItemComponent } from './create-item/create-item.component';
import { ItemListComponent } from './item-list/item-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {ModalModule, ButtonModule} from "@coreui/angular";
import {TableComponent} from "../shared/table/table.component";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {TableModule} from "primeng/table";
import {RippleModule} from "primeng/ripple";
import {TooltipModule} from "primeng/tooltip";
import {SplitButtonModule} from "primeng/splitbutton";
import {TreeTableModule} from "primeng/treetable";


@NgModule({
  declarations: [
    ItemComponent,
    CreateItemComponent,
    ItemListComponent,
    TableComponent
  ],
  exports: [
    TableComponent
  ],
  imports: [
    ItemRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    CommonModule,
    ButtonModule,
    ModalModule,
    NgIf,
    Ng2SmartTableModule,
    TableModule,
    ButtonModule,
    RippleModule,
    TooltipModule,
    ButtonModule,
    ButtonModule,
    SplitButtonModule,
    TreeTableModule,
    ButtonModule,
    ButtonModule,
    ButtonModule,
  ]
})
export class ItemModule { }
