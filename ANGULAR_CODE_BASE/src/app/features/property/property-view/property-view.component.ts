import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../common/services/common.service';
import { environment } from 'environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-property-view',
  templateUrl: './property-view.component.html',
  styleUrls: ['./property-view.component.scss']
})
export class PropertyViewComponent implements OnInit {

constructor(
  private activatedRoute: ActivatedRoute,
  private commonService: CommonService,
    private spinner: NgxSpinnerService,
) { }

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
  type: ''
};
// imageDetail: any;
env = environment;

imageDetail: any[] = []; // Ensure it's always an array

// getProperty(propertySlug: string) {
//   this.commonService.togglePageLoaderFn(true);
//   this.commonService.getSingleProperty(propertySlug)
//     .subscribe(result => {
//       console.log(result); 
//       if (this.imageDetail.length) {
//         console.log(this.env.BASE_URL + this.imageDetail[0]);
//       }
//       this.propertyDetail = result['result'];
//       this.imageDetail = result['files'] || []; // Fallback to an empty array if no files
//       console.log(this.imageDetail);
//       console.log(this.imageDetail);
// console.log(this.env.BASE_URL + this.imageDetail[0]?.path);
//     },
//     (err) => {
//       console.log({ err });
//       this.commonService.togglePageLoaderFn(false);
//     },
//     () => {
//       this.commonService.togglePageLoaderFn(false);
//     });
// }

getProperty(propertySlug: string) {
  this.spinner.show();
  this.commonService.togglePageLoaderFn(true);
  this.commonService.getSingleProperty(propertySlug)
    .subscribe(result => {
      this.spinner.hide()
      console.log(result); 
      this.propertyDetail = result['result'];
      this.imageDetail = result.result.files && result.result.files.length > 0 
      ? result.result.files.map(img =>  img) 
      : ['/assets/images/property-no-image.png'];// Now files contain full URLs
      console.log(this.imageDetail);
    },
    (err) => {
      this.spinner.hide()
      console.log({ err });
      this.commonService.togglePageLoaderFn(false);
    },
    () => {
      this.commonService.togglePageLoaderFn(false);
    });
}


// getProperty(propertySlug) {
//   this.commonService.togglePageLoaderFn(true);
//   this.commonService.getSingleProperty(propertySlug)
//     .subscribe(result => {
//       this.propertyDetail = result['result'];
//       this.imageDetail = result['files'];
//       console.log(this.imageDetail);
//     },
//       (err) => {
//         console.log({ err });
//         this.commonService.togglePageLoaderFn(false);
//       },
//       () => {
//         this.commonService.togglePageLoaderFn(false);
//       }
//     );
// }

ngOnInit() {
  let propertySlug = this.activatedRoute.snapshot.paramMap.get('propertySlug');
  if (propertySlug) this.getProperty(propertySlug);
}

}