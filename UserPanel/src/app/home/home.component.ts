import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
declare var bootstrap: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  builders: any[] = [];

  constructor(private commonService: CommonService) {}
ngOnInit(): void {
  this.getBuilders();
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

}

