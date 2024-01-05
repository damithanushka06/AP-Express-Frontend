import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {CardModule, GridModule} from "@coreui/angular";
import {ChartsModule} from "../charts/charts.module";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    GridModule,
    CardModule,
    ChartsModule
  ]
})
export class DashboardModule { }
