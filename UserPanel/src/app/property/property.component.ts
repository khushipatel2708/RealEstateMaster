import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { CommonService } from 'app/services/common.service';
declare var bootstrap: any; 
@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit{
property: any[] = [];
isUserLoggedIn = false;
  sliderInitialized = false; 
  constructor(private commonService: CommonService,private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isLoggedIn();
    // this.getProperty();
    this.route.queryParams.subscribe(params => {
      const city = params['city'] || null;
      const propertyType = params['propertyType'] || null;
      const priceRange = params['priceRange'] || null;
      
      this.getProperty(city, propertyType, priceRange);
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      document.querySelectorAll('.carousel').forEach(carouselElement => {
        new bootstrap.Carousel(carouselElement, {
          interval: 3000, // Auto-slide every 3 seconds
          ride: 'carousel'
        });
      });
    }, 500);
  }


  getProperty(city?: string, propertyType?: string, priceRange?: string): void {
    const queryParams: any = {};

    if (city) queryParams.city = city;
    if (propertyType) queryParams.propertyType = propertyType;
    if (priceRange) queryParams.priceRange = priceRange;

    this.commonService.getUserPanelPropertyList(queryParams).subscribe((response: any[]) => {
      this.property = response.map(property => ({
        id: property.id,
        title: property.title,
        price: property.price,
        imageUrls: property.imageUrls.length > 0 ? property.imageUrls : ['assets/images/no-photo.jpg'],
        cityName: property.cityName,
        stateName: property.stateName,
        propertyType:property.propertyType,
        status:property.status,
        agencyName:property.agencyName,
        slug:property.slug,
        role:property.role
      }));
    });
  }

  // private initSlider(): void {
  //   let index = 0;
  //   const slides = document.querySelectorAll('.slide') as NodeListOf<HTMLElement>;
  //   const slider = document.querySelector('.slider') as HTMLElement;
  //   if (!slider || slides.length === 0) return;

  //   function updateSlider() {
  //     if (!slider) return;
  //     index = (index + 1) % slides.length; // Loop through slides
  //     slider.style.transform = `translateX(-${index * 270}px)`;
  //   }

  //   setInterval(updateSlider, 3000);
  // }
}

