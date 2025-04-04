  import { Injectable } from '@angular/core';
  import { HttpHeaders, HttpClient } from '@angular/common/http'
  import { Router } from '@angular/router';
  import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'environments/environment';
import { BehaviorSubject, tap } from 'rxjs';
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'xsrfCookieName':  'csrftoken',
      // 'xsrfHeaderName': 'X-CSRFToken'
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  };

  @Injectable()
  export class LoginService {

    constructor(private http: HttpClient,
      private router: Router) { }
      private isLoggedInSubject = new BehaviorSubject<boolean>(false);
      isLoggedIn$ = this.isLoggedInSubject.asObservable();
      
    checkUserLogin(data) {
      return this.http.post(environment.BASE_URL + '/auth/user/login', data, httpOptions).pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
          this.isLoggedInSubject.next(true); 
        })
      );
    }
    // checkUserLogin(data) {
    //   let postData = { 'emailPhone': data.emailPhone, 'password': data.loginPassword }
    //   return this.http.post<LoginResponse>(environment.BASE_URL + '/auth/user/login', postData, httpOptions)
    //     .pipe(
    //       map(response => {
    //         console.log(response, "response");
    //         if (response && response.token) {
    //           localStorage.setItem('token', response.token);
    //           localStorage.setItem('role', response.role); 
    //           return response.role; 
    //         }
    //       })
    //     );
    // }
    // checkUserLogin(emailPhone: string, loginPassword: string) {
    //   password:loginPassword;
    //   return this.http.post<any>(`${environment.BASE_URL}/auth/user/login`, { emailPhone,password })
    //     .pipe(
    //       tap(response => {
    //         console.log(response,"response");
    //         if (response && response.token) {
    //         localStorage.setItem('token', response.token);
    //         }
    //       })
    //     );
    // }
  
    isLoggedIn() {
      let jwtHelper = new JwtHelperService();
      var token = localStorage.getItem('token');
      if (token) {
        var status = jwtHelper.isTokenExpired(token);
        if (status == false)
          return true;
        else
          return false;
      }
      else
        return false;
    }

    logOut() {
      this.router.navigate([''], {
        queryParams: { success: 'logOut' }
      });
      localStorage.removeItem('token');
      this.isLoggedInSubject.next(false);
    }

  }
