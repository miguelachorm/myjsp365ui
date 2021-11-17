import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { DatedAccountsComponent } from '../../widgets/dated-accounts/dated-accounts.component'
import { BusinessStatsComponent } from '../../widgets/business-stats/business-stats.component'
import { MyLocationComponent } from '../../widgets/my-location/my-location.component'


import { DashboardPage } from './dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule
  ],
  declarations: [DashboardPage, DatedAccountsComponent, BusinessStatsComponent, MyLocationComponent]
})
export class DashboardPageModule {}
