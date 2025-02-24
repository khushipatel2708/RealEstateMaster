import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { DashboardHomeComponent } from '../users/components/dashboard/dashboard-home/dashboard-home.component';
import { DashboardComponent } from 'app/common/components/dashboard-main/dashboard.component';
import { LoginModalComponent } from 'app/common/components/login-modal/login-modal.component';

const ChildRoutes: Routes = [
  {
    path: '',
    component: LoginModalComponent
  },{
    path:'login',
    component:LoginModalComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ChildRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class HomeRoutingModule { }
