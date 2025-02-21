import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';
import { CommonService } from '../../../../common/services/common.service';
import { UserService } from '../../../../common/services/user.service';
import { LoginService } from 'app/common/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  images = [
    'assets/images/propert1.jpg',
    'assets/images/p.jpg',
    'assets/images/commercialproperty.jpg'
  ];
  // images: Array<string>;
  cityList = [];
  propertyTypeList;
  searchPropData = { propertyFor: 'sell', location: '' };
  hideOwnProperty = false;
  isUserLoggedIn: Boolean = false;

  constructor(
    private _http: HttpClient,
    private userService: UserService,
    private commonService: CommonService,
    private router: Router,
    private loginService:LoginService
  ) { 
    this.isUserLoggedIn = loginService.isLoggedIn();
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 2
          ? []
          : this.cityList
              .map(v =>
                v.name.toLowerCase().includes(term.toLowerCase()) ? v.name : ''
              )
              .filter(a => a) // Remove empty strings
              .slice(0, 10)
      )
    );
  ngOnInit() {
    this.images = this._randomImageUrls([{ id: 10 }, { id: 20 }, { id: 30 }]);
    this._http.get('https://picsum.photos/v2/list?page=1&limit=3')
      .pipe(map((images: Array<{ id: number }>) => this._randomImageUrls(images)))
      .subscribe(images => {
        this.images = images;
      });
    
    this._http.get('https://picsum.photos/v2/list?page=1&limit=3')
       .pipe(map((images: Array<{ id: number }>) => this._randomImageUrls(images)))
       .subscribe(images => {
         this.images = images;
       });
    // this.commonService.getCitylist()
    //   .subscribe(response => {
    //     this.cityList = response;
    //     // response.forEach(element => {
    //     //   this.cityList.push(element.name);
    //     // });
    //   });

    // this.commonService.getPropertyTypeList()
    //   .subscribe(response => {
    //     this.propertyTypeList = response;
    //   });

    this.hideOwnProperty = this.userService.currentUser && this.userService.currentUser.user._id ? true : false;
  }

  searchProp(value) {
    value.propertyFor = this.searchPropData.propertyFor;

    var queryParamsTemp: any = {
      propertyFor: value.propertyFor,
      type: value.type
    };

    queryParamsTemp.city = this.cityList.map(e => {
      return e.name == value.city ? e._id : ''
    }).filter(ele => ele);

    this.router.navigate(['/property/search'], {
      queryParams: queryParamsTemp //{ 'city': value.city, 'propertyFor': value.propertyFor, 'type': value.type }
    })
  }

  queryParams = '?status=available';

  private _randomImageUrls(images: Array<{ id: number }>): Array<string> {
    if (!images || images.length === 0) {
      console.error('Images array is empty!');
      return [];
    }
  
    return [1, 2, 3].map(() => {
      const randomId = images[Math.floor(Math.random() * images.length)].id;
      return `https://picsum.photos/900/500?image=${randomId}`;
    });
  }
  

}
