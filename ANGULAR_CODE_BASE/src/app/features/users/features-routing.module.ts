import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { DashboardHomeComponent } from './components/dashboard/dashboard-home/dashboard-home.component';
import { AuthGuardService } from '../../common/services/auth-guard.service';
import { DashboardComponent } from '../../common/components/dashboard-main/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { ForgotPasswordComponent } from 'app/common/components/forgot-password/forgot-password.component';

const ChildRoutes: Routes = [
  {
    path: 'sign-up',
    component: RegistrationComponent
  },{
    path:'forgot-password',
    component:ForgotPasswordComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DashboardHomeComponent
      }
    ],
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    component: DashboardComponent,
    children: [
      {
        path: 'edit',
        component: EditProfileComponent,
        data:{title:'My Profile',icon:'fa-solid bi bi-person-fill'}
      }
    ],
    canActivate: [AuthGuardService]
  },
  {
    path:'user',
    component: DashboardComponent,
    children:[
      {
        path:'list',
        component:UserComponent,
        data:{title:'Users',icon:'fa-solid bi bi-person-fill'}
      }
    ]
    }
]

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
export class FeaturesRoutingModule { }
