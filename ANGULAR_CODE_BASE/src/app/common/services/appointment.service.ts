import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BuilderAvailability } from 'app/administration/models/builder-availability.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

 private apiUrl =
    'http://localhost:5026/api/Availability';
  constructor(private http: HttpClient) {}

  getPropertyAvailability(
    propertyId: number
  ): Observable<BuilderAvailability[]> {

    return this.http.get<BuilderAvailability[]>(
      `${this.apiUrl}/property-availability/${propertyId}`
    );
  }

}