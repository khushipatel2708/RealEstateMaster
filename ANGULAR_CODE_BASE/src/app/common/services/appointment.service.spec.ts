import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl =
    'https://localhost:7000/api/Appointment';

  constructor(
    private http: HttpClient
  ) {}


  // Get availability according to property

  getPropertyAvailability(
    propertyId: number
  ) {

    return this.http.get(
      `${this.apiUrl}/property/${propertyId}/availability`
    );
  }


  // Book appointment

  bookAppointment(data: any) {

    return this.http.post(
      this.apiUrl,
      data
    );
  }


  // User appointments

  getUserAppointments(
    userId: number
  ) {

    return this.http.get(
      `${this.apiUrl}/user/${userId}`
    );
  }


  // Cancel

  cancelAppointment(
    id: number
  ) {

    return this.http.put(
      `${this.apiUrl}/${id}/cancel`,
      {}
    );
  }

}