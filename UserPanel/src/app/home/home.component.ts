import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'app/services/user.service';
declare var bootstrap: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  searchForm:FormGroup;
  cities = [];
  propertyTypes = [];
  builders: any[] = [];
  currentUser:any={};
  priceRanges = ['< ₹50 Lakh', '₹50 Lakh - ₹1 Crore', '₹1 Crore - ₹2 Crore', '> ₹2 Crore'];
  constructor(private commonService: CommonService,private formBuilder:FormBuilder,private router:Router,private userService:UserService) {}
ngOnInit(): void {
  this.searchForm=this.formBuilder.group({
    city:[null,Validators.required],
    propertyType:[null,Validators.required],
    priceRanges:[null,Validators.required]
  });
  this.getBuilders();
  this.getCityDdlList();
  this.getPropertyTypeDdlList();
}
@ViewChild('heroCarousel', { static: false }) heroCarousel!: ElementRef;

ngAfterViewInit() {
  if (this.heroCarousel) {
    new bootstrap.Carousel(this.heroCarousel.nativeElement, {
      interval: 5000,
      ride: "carousel"
    });
  }
}
getBuilders(): void {
  this.commonService.getBuilderDDLList().subscribe((response: any[]) => {
    this.builders = response.map(builder => ({
      id: builder.id,
      fname: builder.fname,
      lname: builder.lname,
      email: builder.email,
      phoneNo: builder.phoneNo,
      location: builder.location,
      pincode: builder.pincode,
      imageUrl: builder.photoPath ? builder.photoPath.replace(/\/uploads\/uploads\//, "/uploads/") : null
    }));
  });
}
getCityDdlList(){
this.commonService.getCitylist().subscribe(
  (result) =>{
    this.cities=result;
  },
  (error) =>{
    console.log(error);
  }
)
}
getPropertyTypeDdlList(){
  this.commonService.getPropertyTypeList().subscribe(
    (result) =>{
      this.propertyTypes=result;
    },
    (error) =>{
      console.log(error);
    }
  )
}

searchProperties() {
  if (this.searchForm.valid) {
    const queryParams = {
      city: this.searchForm.value.city,
      propertyType: this.searchForm.value.propertyType,
      priceRange: this.searchForm.value.priceRanges
    };

    this.router.navigate(['/property'], { queryParams });
  }
}
getCurrentUserDetail(){
  this.userService.getCurrentUserDetails().subscribe(
    (result) =>{
      this.currentUser = result;
      localStorage.setItem("role",this.currentUser.role);
    },
    (error) =>{
      console.log(error);
    }
  )
}
}

