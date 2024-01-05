import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import {CreateUserComponent} from "./create-user/create-user.component";
import {UserListComponent} from "./user-list/user-list.component";
import {ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {ButtonModule, FormModule, ModalModule} from "@coreui/angular";
import {CommonModule, JsonPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ItemModule} from "../item/item.module";


@NgModule({
  declarations: [
    UserComponent,
    CreateUserComponent,
    UserListComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        ReactiveFormsModule,
        NgSelectModule,
        FormModule,
        ModalModule,
        ButtonModule,
        NgIf,
        JsonPipe,
        NgForOf,
        NgOptimizedImage,
        ItemModule
    ]
})
export class UserModule { }
