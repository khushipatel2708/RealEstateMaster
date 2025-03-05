import { Component, OnInit } from '@angular/core';
import { BuilderModalComponent } from './builder-modal/builder-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'app/common/services/common.service';
declare const Swal:any;
@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {

  builderList: any[] = [];
  form: FormGroup;
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
    private commonService:CommonService,
    private formBuilder:FormBuilder

  ) { }

  ngOnInit() {
    this.form=this.formBuilder.group({
      searchText:[null],
    })
    this.getBuilderList();
  }

  // getBuilderList() {
  //   this.commonService.getBuilderList()
  //     .subscribe(result => {
  //       this.builderList = result;
  //     }, error => {
  //       console.error(error);
  //     });
  // }

  onAddEdit(id?: Number) {
    const modalRef = this.modalService.open(BuilderModalComponent, {
      centered: true,
      backdrop: "static",
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.onBuilder_Emit.subscribe((data) => {
      if (data != null) {
        this.getBuilderList();
      }
    });
  }

  getBuilderList() {
    const filters = {
      searchText: this.form.get('searchText').value,
      page: this.page || 1,  // Default to 1 if undefined
      pageSize: this.pageSize || 10,  // Default to 10 if undefined
    };
    
    this.commonService.getBuilderList(filters)  // Pass the filters to the service
      .subscribe({
        next: (result: any) => {
          this.builderList = result.data;
          this.totalRecord = result.totalCount;
        },
        error: (err) => {
          console.error('Error fetching menus', err);
        }
      });
  }

  onClick_fiter(){
    this.getBuilderList();
  }

  onClear_Filter(){
    this.form.reset();
    this.getBuilderList(); 
   }


  onDelete(BuilderId:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.commonService.deleteBuilder(BuilderId).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
            this.getBuilderList();  // Refresh the list after deletion
          },
          error: (err) => {
            Swal.fire('Error!', 'There was an error deleting the user.', 'error');
          }
        });
      }
    });
  }

  onClick_PageChange(e: any) {
    this.page = e;  // Update the page number
    this.getBuilderList();  // Fetch the updated list
  }

  onChange_PageSize() {
    this.pageSize = this.pageSize;  // Update the page size
    this.getBuilderList();  // Fetch the updated list with new page size
  }


}
