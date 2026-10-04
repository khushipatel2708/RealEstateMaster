import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' // ✅ Ensures it is available throughout the app
})
export class AuthService  {
    constructor(
      private http: HttpClient,
    ) { }
    getAccessToken(): string {
        return localStorage.getItem('accessToken') || '';
      }
    
      getLanguage(): string {
        return localStorage.getItem('language') || 'en';
      }
      getPayment(paymentAmount:any){
        return this.http.post<any>('http://localhost:5026/api/payments/create-order', { amount: paymentAmount })
      }
      isLoggedIn(): boolean {
        return !!localStorage.getItem('token'); // Check if token exists
      }  

      
}