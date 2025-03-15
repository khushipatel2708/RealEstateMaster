import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'app/common/services/common.service';
import { UserService } from 'app/common/services/user.service';
import { ToastrService } from 'ngx-toastr';
declare const Swal:any;

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  form:FormGroup;
  propertyList: any = { data: [], totalCount: 0 }; // Ensure propertyList has a data field
  cityList:any[]=[];
  propertyTypeList:any[]=[];
  propertyFor = [
    { value: 'buy', name: 'Buy' },
    { value: 'rent', name: 'Rent' }
  ];
  userRole: string = '';
  totalRecord=0;
  page = 1;
  pageSize = 20;
  pageSizeList =  [
    { pageSize: 10, name: "10 items per page" },
    { pageSize: 20, name: "20 items per page" },
    { pageSize: 50, name: "50 items per page" },
    { pageSize: 100, name: "100 items per page" },
    { pageSize: 500, name: "500 items per page" },
    { pageSize: 1000, name: "1000 items per page" },
    { pageSize: 100000, name: "All items" },
  ];
  UserDetails: any = {}; 

  @Input('blockView') blockView = false;
  @Input('blockSize') blockSize = 12;
  @Input('queryParams') queryParams = '';
  @Input('hideOwnProperty') hideOwnProperty = false;

  constructor(
    public commonService: CommonService,
    private formBuilder:FormBuilder,
    private router:Router,
    private toastr:ToastrService,    private userService: UserService,
    
  ) { }

  ngOnInit() {
    this.form=this.formBuilder.group({
searchText:[null],
city:[null],
type:[null],
for:[null]
    });
    this.getCurrentUserDetails();
    this.getCityList();
    this.getPropertyList();
    this.getPropertyTypeList();
  }
  
  getPropertyTypeList() {
    this.commonService.togglePageLoaderFn(true);
   this.commonService.getPropertyTypeList()
     .subscribe(result => {
       this.propertyTypeList = result;
        this.commonService.togglePageLoaderFn(false);
     });
 }
 getCurrentUserDetails() {
  this.commonService.togglePageLoaderFn(true);
  this.userService.getCurrentUserDetails().subscribe({
    next: (result: any) => {
      this.UserDetails = result;
      this.userRole = result.role || ''; // Store user role
      this.commonService.togglePageLoaderFn(false);
    },
    error: (err) => {
      console.error("Error fetching user details:", err);
      this.commonService.togglePageLoaderFn(false);
    }
  });
}

  getCityList() {
    this.commonService.togglePageLoaderFn(true);
    this.commonService.getCitylist().subscribe((response) => {
      this.commonService.togglePageLoaderFn(false);
        if (response.length > 0) {
            this.cityList = response;
          }
          },(error) =>{
            this.commonService.togglePageLoaderFn(false);  
          this.cityList=[];
          console.error("Failed to get the city list.");
        });
  }

  getPropertyList(){
    const data={
      cityId: Number(this.form.get('city').value) || null,
     type:Number(this.form.get('type').value) || null,
     propertyFor:this.form.get('for').value || '',
     searchText:this.form.get('searchText').value || '', 
     page:this.page,
     pageSize:Number(this.pageSize),
     userRole: this.userRole  // Pass user role in request
    }
  this.commonService.togglePageLoaderFn(true);
  this.commonService.getPropertyList(data).subscribe((result:any) =>{
    if(result) this.propertyList=result;
    this.totalRecord=result.totalCount;
  },
    (err) => this.toastr.error(err,"Failed to get data."),
      () => this.commonService.togglePageLoaderFn(false));
      
}

onAddEdit(slug:any){
  this.router.navigate(['/property/edit/'+ slug]);
}
onDelete(id:any){
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
        this.commonService.deleteProperty(id).subscribe({
          next: () => {
             Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
            this.toastr.success("Data deleted successfully.","Success");
            this.getPropertyList();  // Refresh the list after deletion
          },
          error: (err) => {
            Swal.fire('Error!', 'There was an error deleting the item.', 'error');
          }
        });
      }
    });
  }
onFilter(){
  this.getPropertyList();
}
onClear_Filter(){
 this.form.reset();
 this.getPropertyList(); 
}
onClick_PageChange(e) {
  this.page = e;
  this.getPropertyList();
}

onChange_PageSize(){
this.pageSize=this.pageSize;
this.getPropertyList();
}
}