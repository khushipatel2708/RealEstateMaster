import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-availability-list',
  templateUrl: './availability-list.component.html',
  styleUrls: ['./availability-list.component.scss']
})
export class AvailabilityListComponent {
 availabilities: any[] = [];
  form!: FormGroup;
totalRecord=0;
  page = 1;
  pageSize = 20;
  pageSizeList =  [
    { pageSize: 10, name: "10 items per page" },
    { pageSize: 20, name: "20 items per page" },
    { pageSize: 50, name: "50 items per page" },
    { pageSize: 100, name: "100 items per page" },
    { pageSize: 500, name: "500 items per page" },
    { pageSize: 1000, name: "1000 items per page" },
    { pageSize: 100000, name: "All items" },
  ];

  loading = false;
  errorMessage = '';

  constructor(private http: HttpClient,private formBuilder: FormBuilder) {}

  ngOnInit(): void {
     this.form = this.formBuilder.group({
      searchText: ['']
    });
    this.getAllAvailabilities();
  }

getAllAvailabilities(): void {

    const filters = {
      searchText: this.form.get('searchText')?.value || '',
      page: this.page || 1,
      pageSize: this.pageSize || 10
    };

    this.loading = true;

    this.http.post<any>(
      'http://localhost:5026/api/Availability/GetAllAvailabilities',
      filters
    )
    .subscribe({

      next: (result) => {

        this.availabilities = result.data;

        this.totalRecord = result.totalCount;

        this.loading = false;

      },

      error: (err) => {

        console.error(
          'Error fetching availabilities',
          err
        );

        this.errorMessage =
          'Unable to load availabilities.';

        this.loading = false;

      }

    });
  }

onSearch(): void {

  this.page = 1;

  this.getAllAvailabilities();

}
onClick_PageChange(e:any) {
  this.page = e;
  this.getAllAvailabilities();
}

onChange_PageSize(){
this.pageSize=this.pageSize;
this.getAllAvailabilities();
}
onClear_Filter(){
 this.form.reset();
 this.getAllAvailabilities(); 
}
}

