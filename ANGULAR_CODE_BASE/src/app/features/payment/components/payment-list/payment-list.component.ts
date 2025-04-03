import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'app/common/services/common.service';
import { UserService } from 'app/common/services/user.service';
import { UsersModelComponent } from 'app/features/users/components/user/users-model/users-model.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent {
  paymentList: any[] = [];
  form:FormGroup;
  totalRecord = 0;
  page = 1;
  pageSize = 20;
  pageSizeList = [
    {pageSize:5,name:'5 items per page'},
    { pageSize: 10, name: '10 items per page' },
    { pageSize: 20, name: '20 items per page' },
    { pageSize: 50, name: '50 items per page' },
    { pageSize: 100, name: '100 items per page' },
    { pageSize: 500, name: '500 items per page' },
    { pageSize: 1000, name: '1000 items per page' },
    { pageSize: 100000, name: 'All items' }
  ];

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private commonService: CommonService,
    private formBuilder:FormBuilder,
    private cdRef: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.form=this.formBuilder.group({
      searchText:[null],
    })
    this.getPaymentList();
  }

  getPaymentList() {
    const filters = {
      searchText: this.form.get('searchText').value,
      page: this.page || 1,  // Default to 1 if undefined
      pageSize: this.pageSize || 10,  // Default to 10 if undefined
    };
    this.spinner.show();
    this.commonService.getPaymentList(filters)  // Pass the filters to the service
      .subscribe({
        next: (result: any) => {
          this.spinner.hide();
          this.paymentList = result.data;
          this.totalRecord = result.totalCount;
          this.cdRef.detectChanges();
        },
        error: (err) => {
          this.spinner.hide();
          console.error('Error fetching payments', err);
          this.toastr.error(err, "Failed to get payment data.");
        }
      });
}


  onClick_fiter(){
    this.getPaymentList();
  }

  onClear_Filter(){
    this.form.reset();
    this.getPaymentList(); 
   }

  onClick_PageChange(e: any) {
    this.page = e;  // Update the page number
    this.getPaymentList();  // Fetch the updated list
  }

  onChange_PageSize() {
    this.pageSize = this.pageSize;  // Update the page size
    this.getPaymentList();  // Fetch the updated list with new page size
  }
}
