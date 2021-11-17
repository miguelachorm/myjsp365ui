import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffMemberPage } from './staff-member.page';

const routes: Routes = [
  {
    path: '',
    component: StaffMemberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffMemberPageRoutingModule {}
