import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffMemberPageRoutingModule } from './staff-member-routing.module';

import { StaffMemberPage } from './staff-member.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffMemberPageRoutingModule
  ],
  declarations: [StaffMemberPage]
})
export class StaffMemberPageModule {}
