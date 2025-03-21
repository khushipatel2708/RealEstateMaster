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
  this.commonService.getSingleProperty(propertySlug)
    .subscribe(result => {
      this.spinner.hide();
      console.log("Full API Response:", result);

      this.propertyDetail = result['result'];

      if (result['result'].files && result['result'].files.length > 0) {
        this.imageDetail = result['result'].files;
      } else if (result['result'].images) {
        this.imageDetail = result['result'].images
          .split(',')
          .map(img => `http://localhost:5026${img.trim()}`);
      } else {
        this.imageDetail = [];
      }

      console.log("Final Image List:", this.imageDetail);
    },
    (err) => {
      this.spinner.hide();
      console.log({ err });
      this.commonService.togglePageLoaderFn(false);
    },
    () => {
      this.commonService.togglePageLoaderFn(false);
    });
}

ngOnInit() {
  let propertySlug = this.activatedRoute.snapshot.paramMap.get('propertySlug');
  if (propertySlug) this.getProperty(propertySlug);
}

}
