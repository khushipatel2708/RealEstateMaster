import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { CommonService } from 'app/services/common.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit{
property: any[] = [];
isUserLoggedIn = false;
  sliderInitialized = false; 
  constructor(private commonService: CommonService,private authService: AuthService) {}

  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isLoggedIn();
    this.getProperty();
  }
  ngAfterViewInit() {
    if (this.property.length > 0 && !this.sliderInitialized) {
      this.initSlider();
      this.sliderInitialized = true;
    }// Delay to ensure DOM is loaded
  }

  getProperty(): void {
    this.commonService.getUserPanelPropertyList().subscribe((response: any[]) => {
      this.property = response.map(property => ({
        id: property.id,
        title: property.title,
        price: property.price,
        imageUrl: property.imageUrl || 'assets/images/no-photo.jpg',
        cityName:property.cityName
      }));
    });
  }

  private initSlider(): void {
    let index = 0;
    const slides = document.querySelectorAll('.slide') as NodeListOf<HTMLElement>;
    const slider = document.querySelector('.slider') as HTMLElement;
    if (!slider || slides.length === 0) return;

    function updateSlider() {
      if (!slider) return;
      index = (index + 1) % slides.length; // Loop through slides
      slider.style.transform = `translateX(-${index * 270}px)`;
    }

    setInterval(updateSlider, 3000);
  }
}

