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
env = environment;

imageDetail: any[] = [];


getProperty(propertySlug: string) {
  this.spinner.show();
  this.commonService.togglePageLoaderFn(true);
  
  this.commonService.getSingleProperty(propertySlug).subscribe(
    (result) => {
      this.spinner.hide();
      console.log(result);

      // Store property details
      this.propertyDetail = result?.property || {}; 
      
      // Store images; fallback to an empty array if no images are provided
      this.imageDetail = result?.files?.length ? result.files : ['/assets/images/property-no-image.png'];
    },
    (err) => {
      this.spinner.hide();
      console.error({ err });
      this.commonService.togglePageLoaderFn(false);
    },
    () => {
      this.commonService.togglePageLoaderFn(false);
    }
  );
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
