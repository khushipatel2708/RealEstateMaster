import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {

  private apiUrl =
    'http://localhost:5026/api/Availability';

  constructor(
    private http: HttpClient
  ) {}


  createAvailability(data: any) {

    return this.http.post(
      environment.BASE_URL + '/Availability',
      data
    );
  }


  getBuilderAvailability(
    builderId: number
  ) {

    return this.http.get(
      `${this.apiUrl}/builder/${builderId}`
    );
  }


  getBuilderAvailabilityByDate(
    builderId: number,
    date: string
  ) {

    return this.http.get(
      `${this.apiUrl}/builder/${builderId}/date/${date}`
    );
  }


  deleteAvailability(
    id: number
  ) {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }

}