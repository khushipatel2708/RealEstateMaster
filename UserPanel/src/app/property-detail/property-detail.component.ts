import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { CommonService } from 'app/services/common.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit{
  id:any;
  SquareFoot;
  propertyId: string = '';
  propertyTitle:any;
  currentUserEmail:any;
  propertyDetail = {
    title: '',
    slug: '',
    name: '',
    propertyFor: '',
    status: '',
    state: '',
    city: '',
    societyName: '',
    flatNo: 0,
    locality: '',
    type: '',
    length:0,
    breadth:0,
    isEmailMatched:false,
  };
  imageDetail: any[] = [];
  constructor(private authService:AuthService,public commonService:CommonService,private route:ActivatedRoute){}
  
  ngOnInit(): void {
    this.commonService.getCurrentUserDetails().subscribe(
      (response) => {this.currentUserEmail=response.email
        console.log(response.email,"eeee");
    if (propertySlug) this.getProperty(propertySlug);

      } 
    )
    this.id = this.route.snapshot.paramMap.get('id');
    let propertySlug = this.route.snapshot.queryParams['title'];
    this.propertyTitle=this.route.snapshot.queryParams['title'];
  }

  getProperty(propertySlug: string) {
    console.log(this.currentUserEmail,"email");
    this.commonService.togglePageLoaderFn(true)
    this.commonService.getSingleProperty(propertySlug,this.currentUserEmail)
      .subscribe(result => {
        console.log(result); 
        this.propertyDetail = result['result'];
        this.imageDetail = result['result'].files || []; // Now files contain full URLs
       },
      (err) => {
        console.log({ err });
        this.commonService.togglePageLoaderFn(false);
      },
      () => {
        this.commonService.togglePageLoaderFn(false);
      });
  }

  
 }


