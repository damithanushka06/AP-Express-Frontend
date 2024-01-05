import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {ButtonModule, CardModule, FormModule, GridModule} from "@coreui/angular";
import {IconModule} from "@coreui/icons-angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CardModule,
    GridModule,
    FormModule,
    ButtonModule,
    IconModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthModule { }
