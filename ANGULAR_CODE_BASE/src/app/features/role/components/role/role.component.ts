import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleModalComponent } from './role-modal/role-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'app/common/services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
declare const Swal: any;

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  roleList: any[] = [];
  totalRecord = 0;
  page = 1;
  pageSize = 20;
  pageSizeList = [
    { pageSize: 10, name: '10 items per page' },
    { pageSize: 20, name: '20 items per page' },
    { pageSize: 50, name: '50 items per page' },
    { pageSize: 100, name: '100 items per page' },
    { pageSize: 500, name: '500 items per page' },
    { pageSize: 1000, name: '1000 items per page' },
    { pageSize: 100000, name: 'All items' },
  ];
  
  form: FormGroup;

  constructor(
    private modalService: NgbModal,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      searchText: [null],
    });
    this.getRoleList();
  }

  onAddEdit(id?: number) {
    console.log("id:",id)
    const modalRef = this.modalService.open(RoleModalComponent, {
      centered: true,
      backdrop: 'static',
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.onRole_Emit.subscribe((data) => {
      if (data != null) {
        this.getRoleList();
      }
    });
  }

  onClick_filter(){
        this.getRoleList();
      }

  onClear_Filter() {
    this.form.reset();
    this.getRoleList();
  }

  getRoleList() {
    const filters = {
      searchText: this.form.get('searchText').value,
      page: this.page || 1,  // Default to 1 if undefined
      pageSize: this.pageSize || 10,  // Default to 10 if undefined
    };
    this.spinner.show();
    // Call the backend service
    this.commonService.getRoleList(filters).subscribe({
      next: (result: any) => {
        this.spinner.hide();
        this.roleList = result.data;
        this.totalRecord = result.totalCount;
      },
      error: (err) => {
        this.spinner.hide();
        this.toastr.error(err,"Failed to get data."),
        console.error('Error fetching roles', err);
      }
    });
  }
  

  onDelete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.commonService.deleterole(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Your role has been deleted.', 'success');
            this.toastr.success('Your role has been deleted successfully!');
            this.getRoleList();
          },
          error: (err) => {
            Swal.fire('Error!', 'There was an error deleting the role.', 'error');
            this.toastr.error('There was an error deleting the role.');
          }
        });
      }
    });
  }

  onClick_PageChange(e: any) {
    // this.page = e;
    this.getRoleList();
  }

  onChange_PageSize() {
    this.pageSize = this.pageSize;
    this.getRoleList();
  }
}


