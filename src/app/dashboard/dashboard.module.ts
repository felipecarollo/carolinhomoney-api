import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,

    PanelModule,
    DashboardRoutingModule,
    SharedModule,
    ChartModule
  ],
  providers: [ DecimalPipe ]
})
export class DashboardModule { }
