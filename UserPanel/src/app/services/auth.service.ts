import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root' // ✅ Ensures it is available throughout the app
})
export class AuthService  {
    getAccessToken(): string {
        return localStorage.getItem('accessToken') || '';
      }
    
      getLanguage(): string {
        return localStorage.getItem('language') || 'en';
      }
}