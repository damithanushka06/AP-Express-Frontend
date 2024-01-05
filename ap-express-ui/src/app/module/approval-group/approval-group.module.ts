import { NgModule } from '@angular/core';
import { ApprovalGroupRoutingModule } from './approval-group-routing.module';
import { ApprovalGroupComponent } from './approval-group.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { SearchGroupComponent } from './search-group/search-group.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule, ModalModule} from "@coreui/angular";
import {CommonModule, NgIf} from "@angular/common";
import {ItemModule} from "../item/item.module";


@NgModule({
  declarations: [
    ApprovalGroupComponent,
    CreateGroupComponent,
    SearchGroupComponent
  ],
    imports: [
        CommonModule,
        ApprovalGroupRoutingModule,
        ReactiveFormsModule,
        ButtonModule,
        ModalModule,
        NgIf,
        ItemModule
    ]
})
export class ApprovalGroupModule { }
