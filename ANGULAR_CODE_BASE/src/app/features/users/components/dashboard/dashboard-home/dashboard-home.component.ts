import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../common/services/user.service';
import { CommonService } from 'app/common/services/common.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare const Swal:any;

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
z
  propertyList: any = { data: [], totalCount: 0 }; 
    cityList: any[] = [];
    propertyTypeList: any[] = [];
    form: FormGroup;
    totalRecord = 0;
    page = 1;
    pageSize = 20;
  
    // ✅ Add Property For Dropdown Data
    propertyFor = [
      { value: 'sell', name: 'sell' },
      { value: 'rent', name: 'Rent' }
    ];
  
    pageSizeList = [
      { pageSize: 10, name: "10 items per page" },
      { pageSize: 20, name: "20 items per page" },
      { pageSize: 50, name: "50 items per page" },
      { pageSize: 100, name: "100 items per page" },
      { pageSize: 500, name: "500 items per page" },
      { pageSize: 1000, name: "1000 items per page" },
      { pageSize: 100000, name: "All items" },
    ];
  
    constructor(
      public commonService: CommonService,
      private formBuilder: FormBuilder,
      private router: Router,
      private toastr: ToastrService
    ) { }
  
    ngOnInit() {
      this.form = this.formBuilder.group({
        searchText: [null],
        city: [null],
        type: [null],
        for: [null] // ✅ Added Property For Field
      });
      this.getCityList();
      this.getPropertyList();
      this.getPropertyTypeList();
    }
  
    getPropertyTypeList() {
      this.commonService.getPropertyTypeList()
        .subscribe(result => {
          this.propertyTypeList = result;
        });
    }
  
    getCityList() {
      this.commonService.getCitylist().subscribe((response) => {
        if (response.length > 0) {
          this.cityList = response;
        }
      });
    }
    getImageUrl(images: string[] | null | undefined): string {
      const defaultImage = '/assets/images/property-no-image.png';
    
      if (images && images.length > 0 && images[0]) {
        const imageUrl = images[0].trim();
        // Check if the URL is just the base path or empty
        if (imageUrl === 'http://localhost:5026' || !imageUrl) {
          return defaultImage;
        }
        return imageUrl;
      }
    
      return defaultImage;
    }
    
    getPropertyList() {
     this.commonService.getProperty().subscribe((result: any) => {
        if (result) this.propertyList = result;
        this.toastr.success("Data loaded successfully.");
      },
        (err) => this.toastr.error("Failed to get data."));
    }
  
    // markAsSold(propertySlug: string) {
    //   const request = { status: 'sold' };
    //   this.commonService.markAsSold(propertySlug, request).subscribe(
    //     (response: any) => {
    //       this.toastr.success(response.message);
    //       this.getPropertyList();
    //     },
    //     (error) => this.toastr.error(error.message || "Failed to mark property as sold.")
    //   );
    // }
   
    // markAsSold(propertySlug: string) {
    //   const status = 'sold'; // Just pass the status as a string
    //   console.log('Sending request:', status, 'to slug:', propertySlug); // Debug log
    //   this.commonService.markAsSold(propertySlug, status).subscribe(
    //     (response: any) => {
    //       console.log('API response:', response); // Debug log
    //       // this.toastr.success(response.message);
    //       alert("submit")
    //       this.getPropertyList();
    //     },
    //     (error) => {
    //       console.error('API error:', error); // Debug log
    //       this.toastr.error(error.message || "Failed to mark property as sold.");
    //     }
    //   );
    // }
    

// markAsSold(propertySlug: string) {
//   const status = 'sold';

//   Swal.fire({
//     title: 'Are you sure?',
//     text: 'Do you really want to mark this property as sold?',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Yes, mark as sold!'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       this.commonService.markAsSold(propertySlug, status).subscribe(
//         (response: any) => {
//           this.toastr.success('Property successfully marked as sold!');

//           const property = this.propertyList.data.find((p: any) => p.slug === propertySlug);
//           if (property) {
//             property.status = 'sold';
//           }

//           Swal.fire({
//             title: 'Marked as Sold!',
//             text: 'The property has been successfully marked as sold.',
//             icon: 'success'
//           });
//         },
//         (error) => {
//           this.toastr.error(error.message || "Failed to mark property as sold.");
//         }
//       );
//     }
//   });
// }

    
    
    
    
    
    
    
    
  }
  
