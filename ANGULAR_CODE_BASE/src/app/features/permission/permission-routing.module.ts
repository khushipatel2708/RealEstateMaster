import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionComponent } from './permission.component';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'app/common/components/dashboard-main/dashboard.component';

const ChildRoutes: Routes = [
 
  {
    path: '',
    component: DashboardComponent,
    children: [
  {
    path: 'create',
    component: PermissionComponent,
    data:{title:'Permission',icon:'bi bi-eye-fill'}
  }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ChildRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class PermissionRoutingModule { }
