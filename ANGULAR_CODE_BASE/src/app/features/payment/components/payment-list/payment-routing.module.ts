import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PaymentListComponent } from './payment-list.component';
import { DashboardComponent } from 'app/common/components/dashboard-main/dashboard.component';


const ChildRoutes: Routes = [
  {
  path:'',
  component:DashboardComponent,
  children:[
    {
      path:'payment-list',
      component:PaymentListComponent
   }
  ]
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
export class PaymentRoutingModule { }
