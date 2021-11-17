import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule) },
      { path: 'accounts',
        children:
        [{
          path: '', loadChildren: () => import('./accounts/accounts.module').then( m => m.AccountsPageModule)
        },
        {
          path: 'account', loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
        },
        {
          path: 'account/:id', loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
        }] 
      },
      { path: 'staff', 
        children:
        [{
          path: '', loadChildren: () => import('./staff/staff.module').then( m => m.StaffPageModule)
        },
        {
          path: 'member', loadChildren: () => import('./staff-member/staff-member.module').then( m => m.StaffMemberPageModule)
        },
        {
          path: 'member/:id', loadChildren: () => import('./staff-member/staff-member.module').then( m => m.StaffMemberPageModule)
        }] 
      },
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
    ]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
