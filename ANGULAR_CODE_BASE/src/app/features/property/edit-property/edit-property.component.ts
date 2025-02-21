import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonService } from '../../../common/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss']
})
export class EditPropertyComponent implements OnInit {
  isSubmittingForm:boolean;
  imgsToUpload = [];
  form:FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private location: Location,
    public toastr: ToastrService,
    private builder:FormBuilder,
    private router:Router
  ) { }

  propertyDetail: any = {
    type: {},
    state: {},
    city: {}
  };
  builderList:any[]=[];
  stateList;
  cityList = [];
  FetchingCityList = false;
  propertyTypeList;
  newPropertyData: any = {};
  get f() {
    return this.form.controls;
  }
  ngOnInit() {
    this.form=this.builder.group({
      title:[null],
      propertyFor:[null],
      type:[null],
      state:[null],
      city:[null],
      description:[null],
      email:[null],
      address:[null],
      phoneNo:[null],
      pincode:[null],
      locality:[null],
      cornerPlot:[null],
      builder:[null]
    });
    let propertySlug = this.activatedRoute.snapshot.paramMap.get('propertySlug');
    if (propertySlug){
      this.getProperty(propertySlug);
      }
      this.getStateList();
      this.getBuilderList();
    this.commonService.getPropertyTypeList()
      .subscribe(result => this.propertyTypeList = result);

  }
  
  getProperty(propertySlug) {
    this.commonService.getSingleProperty(propertySlug)
      .subscribe((response: Response) => {
        const result: Response['result'] = response.result;
        this.propertyDetail = result;
        this.form.patchValue({
          title: result.title,
          propertyFor: result.propertyFor,
          type: result.type._id || '',
          state: result.state._id || '',
          city: result.city._id || '',
          locality: result.locality || '',
          address: result.address || '',
          description: result.description || '',
          email: result.email || '',
          phoneNo: result.phoneNo || '',
          pincode: result.pincode || '',
          cornerPlot:result.cornerPlot,
          builder:result.builder._id || '',
        });
        const stateId = this.form.get('state').value;
      if (stateId) {
        this.getCityList(stateId);
      }
      });
  }

  getCityList(stateId) {
    this.cityList = [];
    this.FetchingCityList = true;

    if (stateId != 0) {
      this.commonService.getCitylistByState(stateId)
        .subscribe(response => {
          if (response.length > 0) {
            this.cityList = response;
            this.FetchingCityList = false;
          }
        });
    }
    else {
      this.cityList = [];
    }
  }

submitForm() {
    this.isSubmittingForm = true;
    if(this.form.invalid){
      alert("enter valid details");
    }
    const imageData = new FormData();
    imageData.append('title', this.form.get("title").value);
    imageData.append('propertyFor', this.form.get("propertyFor").value);
    imageData.append('type', this.form.get("type").value || '');
    imageData.append('state', this.form.get("state").value || '');
    imageData.append('city', this.form.get("city").value || '');
    imageData.append('locality', this.form.get("locality").value || '');
    imageData.append('address', this.form.get("address").value || '');
    imageData.append('description', this.form.get("description").value || '');
    imageData.append('email', this.form.get("email").value || '');
    imageData.append('phoneNo', this.form.get("phoneNo").value || '');
    imageData.append('pincode', this.form.get("pincode").value || '');
    imageData.append('cornerPlot',this.form.get("cornerPlot").value);
    imageData.append('builder',this.form.get("builder").value || '');
    this.imgsToUpload.forEach((ele, index) => {
      imageData.append("propImages", ele, ele['name']);
    });
    const dataToSend = {};
    imageData.forEach((value, key) => {
      dataToSend[key] = value;
    });
  const id=this.propertyDetail._id;
    this.commonService.togglePageLoaderFn(true);
    this.commonService.editProperty(dataToSend,id).subscribe(
      (result) => {
        this.commonService.togglePageLoaderFn(false);
        this.toastr.success("Property edited successfully.");
        alert("Property edited successfully.");
        this.router.navigate(['/property/list']);
      },(err) =>{
        this.commonService.togglePageLoaderFn(false);
        this.toastr.error("Failed to edit property list");
      }
    )
  }
  getBuilderList() {
    this.commonService.getBuilderDdlList()
      .subscribe(result => {
        this.builderList = result;
      }, error => {
        console.error(error);
      });
  }

  locationBack() {
    this.location.back();
  }
getStateList(){
  this.commonService.getStatelist().subscribe(response => {
    if (response.length > 0) {
      this.stateList = response;
    
    }
  });
}
 
}
