import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../common/services/common.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-property-view',
  templateUrl: './property-view.component.html',
  styleUrls: ['./property-view.component.scss']
})
export class PropertyViewComponent implements OnInit {

constructor(
  private activatedRoute: ActivatedRoute,
  private commonService: CommonService
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
imageDetail: any;
env = environment;

getProperty(propertySlug) {
  this.commonService.togglePageLoaderFn(true);
  this.commonService.getSingleProperty(propertySlug)
    .subscribe(result => {
      this.propertyDetail = result['result'];
      this.imageDetail = result['files'];
      console.log(this.imageDetail);
    },
      (err) => {
        console.log({ err });
        this.commonService.togglePageLoaderFn(false);
      },
      () => {
        this.commonService.togglePageLoaderFn(false);
      }
    );
}

ngOnInit() {
  let propertySlug = this.activatedRoute.snapshot.paramMap.get('propertySlug');
  if (propertySlug) this.getProperty(propertySlug);
}

}
