import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PaymentListComponent } from './payment-list.component';


const ChildRoutes: Routes = [
 {
    path:'payment-list',
    component:PaymentListComponent
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
