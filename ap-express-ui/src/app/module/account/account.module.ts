import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AccountListComponent } from './account-list/account-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {ButtonModule, ModalModule} from "@coreui/angular";
import {CommonModule, NgIf} from "@angular/common";
import {AccountComponent} from "./account.component";
import {ItemModule} from "../item/item.module";


@NgModule({
  declarations: [
    AccountComponent,
    CreateAccountComponent,
    AccountListComponent
  ],
    imports: [
        AccountRoutingModule,
        ReactiveFormsModule,
        NgSelectModule,
        ModalModule,
        CommonModule,
        NgIf,
        ButtonModule,
        ItemModule
    ]
})
export class AccountModule { }
