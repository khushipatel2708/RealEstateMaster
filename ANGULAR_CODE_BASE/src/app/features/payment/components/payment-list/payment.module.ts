import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReUsableModule } from 'app/common/re-usable.module';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentListComponent } from './payment-list.component';

@NgModule({
  declarations: [
    PaymentListComponent
     ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ReUsableModule,
    CommonModule,
    PaymentRoutingModule,
    NgbModule,
    NgbModalModule,
    NgxSpinnerModule,
            ToastrModule.forRoot({
              timeOut: 3000,
              positionClass: 'toast-top-right',
              preventDuplicates: true
            })
  ]
})
export class PaymentModule { }
