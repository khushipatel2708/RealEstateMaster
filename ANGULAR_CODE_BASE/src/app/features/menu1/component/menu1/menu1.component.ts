import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Menu1ModalComponent } from './menu1-modal/menu1-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'app/common/services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

declare const Swal: any;

@Component({
  selector: 'app-menu1',
  templateUrl: './menu1.component.html',
  styleUrls: ['./menu1.component.scss']
})
export class Menu1Component implements OnInit {

  form: FormGroup;
  menuList: any[] = [];
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
    { pageSize: 100000, name: 'All items' }
  ];

  constructor(
    private modalService: NgbModal,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      searchText: [null]
    });
    this.getMenuList();
  }

  onClick_filter(){
          this.getMenuList();
        }

  onClear_Filter() {
    this.form.reset();
    this.getMenuList();
  }

  onClick_AddEdit(id?: number) { 
    const modalRef = this.modalService.open(Menu1ModalComponent, {
      centered: true,
      backdrop: 'static'
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.menuSaved.subscribe(() => {
      this.getMenuList();  
    });
  }

  getMenuList() {
    const filters = {
      searchText: this.form.get('searchText').value,
      page: this.page || 1, 
      pageSize: this.pageSize || 10,  
    };
    this.spinner.show();
    this.commonService.getMenu1List(filters)  
      .subscribe({
        next: (result: any) => {
          this.spinner.hide();
          this.menuList = result.data;
          this.totalRecord = result.totalCount;
        },
        error: (err) => {
          this.spinner.hide();
          this.toastr.error(err,"Failed to get data."),
          console.error('Error fetching menus', err);
        }
      });
  }


  onDelete(menuId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.commonService.deleteMenu(menuId).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Your menu has been deleted.', 'success');
            this.toastr.success('Your menu has been deleted successfully!', 'Deleted');
            this.getMenuList();  
          },
          error: (err) => {
            Swal.fire('Error!', 'There was an error deleting the menu.', 'error');
            this.toastr.error('There was an error deleting the menu.', 'Error');
          }
        });
      }
    });
  }

  onClick_PageChange(e: any) {
    this.page = e;  
    this.getMenuList(); 
  }

  onChange_PageSize() {
    this.pageSize = this.pageSize; 
    this.getMenuList();  
  }
}
