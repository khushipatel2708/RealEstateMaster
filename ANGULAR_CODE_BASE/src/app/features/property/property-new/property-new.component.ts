import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../common/services/user.service';
import { CommonService } from '../../../common/services/common.service';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

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
    // private toastr:ToastrService
  ) { 
    this.getPropertyTypeList();
    // this.getstateList();
    this.getBuilderList();
  }

  propertyTypeList = [];
  stateList: any[];
  cityList = [];
  FetchingCityList = false;
  imgUrls = [];
  imgsToUpload = [];
  isSubmittingForm: Boolean = false;
  builderList:any[]=[];

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
  getBuilderList() {
    this.commonService.getBuilderDdlList()
      .subscribe(result => {
        this.builderList = result;
      }, error => {
        console.error(error);
      });
  }

  submitForm(data) {
    this.isSubmittingForm = true;
    data.value.userId = this.userService.currentUser.user._id;

    const imageData = new FormData();
    this.imgsToUpload.forEach((ele, index) => {
      imageData.append("propImages", ele, ele['name']);
    })
    for (let key in data.value) {
      // iterate and set other form data
      imageData.append(key, data.value[key])
    }
    this.commonService.togglePageLoaderFn(true);
    this.http.post(environment.BASE_URL + '/property/new', imageData)
      .subscribe(result => {
        let data = result && result['result'] || {};
        let message = result && result['message'] || '';
        if (data && data['slug']) {
          this.commonService.changeHeaderMessage({ type: 'success', message });
          alert("property added successfully.");
          this.router.navigate([`/property/view/${data.slug}`])
        }
        else this.commonService.changeHeaderMessage({ type: 'danger', message: 'Something Went Wrong' });
      }, err => {
        let errmessage = err.error && err.error.message || '';
        console.log({ err }, errmessage);
        this.commonService.changeHeaderMessage({ type: 'danger', message: errmessage });
        this.commonService.togglePageLoaderFn(false);
      },
        () => {
          this.commonService.togglePageLoaderFn(false);
        })
  }

  log(data) { console.log(data); }

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
    console.log('this.imgUrls', this.imgUrls, this.imgsToUpload);
  }

  removeSinglePic(img) {
    this.imgUrls = this.imgUrls.filter(e => img != e);
  }

  getDataTitleViaId(id, dataList, keyName) {
    if (!id || !dataList || !keyName) return '';

    let data = this[dataList].filter(e => e._id == id);
    return data.length && data[0][keyName] || '';
  }

  ngOnInit() {
    this.getPropertyTypeList();

    this.commonService.getStatelist()
      .subscribe(response => {
        if (response.length > 0) {
          this.stateList = response;
        }
      });

  }

}
