import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Subject, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root' // ✅ Ensures it is available throughout the app
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  togglePageLoader = new Subject<boolean>();
  togglePageLoader$ = this.togglePageLoader.asObservable();
  togglePageLoaderFn(data: boolean = false) {
    this.togglePageLoader.next(data);
  }
  get currentUser() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token);
}

  getUserDetails(userId) {
    return this.http.get<any>(environment.BASE_URL + '/auth/user/' + userId);
  }
  getCurrentUserDetails() {
    const token = localStorage.getItem('token'); // Ensure token is stored in localStorage

    if (!token) {
      console.error("JWT Token is missing!");
      return throwError(() => new Error("No token found"));
    }
  
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Not necessary, but can be included
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        Authorization: `Bearer ${token}`
    });
    console.log("Sending Token:", token);
    return this.http.get<any>(`${environment.BASE_URL}/auth/user/currentUser`, { headers }).pipe(
      catchError(error => {
        console.error("Error fetching user:", error);
        return throwError(() => new Error(error));
      })
    );
  }
  contactUs(formData:any){
    return this.http.post(`${environment.BASE_URL}/common/contactUs`,formData);
  }
}
