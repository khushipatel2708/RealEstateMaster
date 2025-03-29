import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../common/services/common.service';
import { UserService } from '../../../common/services/user.service';

@Component({
  selector: 'app-property-new',
  templateUrl: './property-new.component.html',
  styleUrls: ['./property-new.component.scss']
})
export class PropertyNewComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    public userService: UserService,
    private http: HttpClient,
    private router: Router,
    private toastr:ToastrService,
    private spinner: NgxSpinnerService,
    
  ) { 
    this.getPropertyTypeList();
    this.getCurrentUserDetails();
    // this.getstateList();
    this.getUserList()
  }
  propertyList: any[] = [];
  UserDetails: any = {}; 
  userRole: string = '';
  propertyTypeList = [];
  stateList: any[];
  cityList = [];
  FetchingCityList = false;
  imgUrls = [];
  imgsToUpload = [];
  isSubmittingForm: Boolean = false;
  builderList:any[]=[];
  propertyFor: string = 'sell'; 

  getPropertyTypeList() {
     this.commonService.togglePageLoaderFn(true);
    this.commonService.getPropertyTypeList()
      .subscribe(result => {
        this.propertyTypeList = result;
         this.commonService.togglePageLoaderFn(false);
      });
  }

  getCityList(stateId) {
    this.cityList = [];
    this.FetchingCityList = true;

    if (stateId) {
      this.commonService.getCitylistByState(stateId).subscribe((response) => {
          if (response.length > 0) {
            this.cityList = response;
            this.FetchingCityList = false;
          }
        },(error) =>{
          console.error("Failed to get the city list.");
        });
    }
    else {
      this.cityList = [];
    }
  }

  selectedBuilderId: number | null = null;

submitForm(data) {
  this.isSubmittingForm = true;
  if(data.invalid){
    this.toastr.warning("Please fill all required fields.");
    return;
  }
  this.spinner.show(); 

  this.userService.getCurrentUserDetail.subscribe({
    next: (userDetail) => {
      if (userDetail && userDetail.id) {
        data.value.userId = userDetail.role == 'admin' ? data.value.builderId : userDetail.id;
        const selectedBuilder = this.builderUserList.find(user => user.id === this.selectedBuilderId);
        if (selectedBuilder) {
          console.log("Selected Builder Name:", selectedBuilder.fname);
        } else {
          console.log("No builder selected.");
        }

        const imageData = new FormData();
        this.imgsToUpload.forEach((ele) => {
          imageData.append("propImages", ele, ele['name']);
        });
console.log(imageData,"img");
        for (let key in data.value) {
          imageData.append(key, data.value[key]);
        }

        this.http.post<any>(`${environment.BASE_URL}/property/new`, imageData).subscribe({
          next: (result) => {
            this.spinner.hide();
            let message = result?.message || 'Property added successfully.';
            this.commonService.changeHeaderMessage({ type: 'success', message });
            this.toastr.success(message);
            this.router.navigate(['/property/list']);
          },
          error: (err) => {
            this.spinner.hide();
            this.toastr.error("Enter the data.")
            let errMessage = err.error?.message || 'Something went wrong!';
            console.log({ err }, errMessage);
            this.commonService.changeHeaderMessage({ type: 'danger', message: errMessage });
          },
          complete: () => {
            this.spinner.hide();
          }
        });
      } else {
        console.error('User details are missing');
        this.spinner.hide();
      }
    },
    error: (err) => {
      console.error('Failed to fetch user details:', err);
      this.spinner.hide();
    }
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

userList: any[] = [];
builderUserList: any[] = [];

getUserList() {
  this.commonService.getUserDdlList()
    .subscribe(result => {
      this.userList = result;
      this.builderUserList = this.userList.filter(user => user.role === 'builder');
      console.log("builderUserList",this.builderUserList)
    }, error => {
      console.error(error);
    });
}

  filesChange(fieldName: string, fileList) {
    if (fileList && fileList.length) {
      let i = 0;
      Object.values(fileList).forEach(f => {
        if (fileList[i].size < 80000) {
          let reader = new FileReader();
          reader.readAsDataURL(fileList[i]);
          let name = fileList[i].name;
          this.imgsToUpload.push(f);
          reader.onload = (_event) => {
            this.imgUrls.push({ name, path: reader.result });
          }
        }
        i++;
      })
    }
  }

  removeSinglePic(img) {
    this.imgUrls = this.imgUrls.filter(e => img != e);
  }

  getDataTitleViaId(id, dataList, keyName) {
    if (!id || !dataList || !keyName) return '';

    let data = this[dataList].filter(e => e.id == id);
    return data.length && data[0][keyName] || '';
  }

  ngOnInit() {
    this.getPropertyTypeList();
    this.getUserList();
    this.getCurrentUserDetails();
    this.commonService.getStatelist()
      .subscribe(response => {
        if (response.length > 0) {
          this.stateList = response;
        }
      });
  }

}
