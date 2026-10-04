import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { CommonService } from 'app/services/common.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit{
  id:any;
  hasBookedAppointment: boolean = false;
  SquareFoot:any;
  propertyId: string = '';
  propertyTitle:any;
  currentUserEmail:any;
  propertyDetail = {
    id:0,
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
  constructor(private authService:AuthService,public commonService:CommonService,private userService:UserService,private route:ActivatedRoute,private router:Router){}
  
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
         this.checkAppointment();
       },
      (err) => {
        console.log({ err });
        this.commonService.togglePageLoaderFn(false);
      },
      () => {
        this.commonService.togglePageLoaderFn(false);
      });
  }

  checkAppointment(): void {
    if (!this.propertyDetail.id) {
      console.log('Property ID not available');
      return;
    }
        this.userService.getCurrentUserDetails().subscribe({
  next: (user: any) => {

    console.log('Current user:', user);

    const userId = user.id;

    console.log('Logged-in User ID:', userId);

    this.commonService
      .checkAppointment(
        this.propertyDetail.id,
        Number(userId)
      )
      .subscribe({
        next: (response: any) => {
          console.log('Appointment status:', response);

          this.hasBookedAppointment = response.hasAppointment;
        },
        error: (error) => {
          console.error('Check appointment error:', error);
          this.hasBookedAppointment = false;
        }
      });
  },

  error: (error) => {
    console.error('Error getting current user:', error);
  }
});
  }

  bookAppointment(): void {
  this.router.navigate(['/book-appointment', this.propertyDetail.slug]);
}
  
 }


