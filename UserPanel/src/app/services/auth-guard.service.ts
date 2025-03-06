import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root' // ✅ Ensures it is available throughout the app
})
export class AuthGuardService implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  canActivate(route, state: RouterStateSnapshot){
    if(this.loginService.isLoggedIn()) return true;

    // console.log(window.location.pathname);
    
    this.router.navigate(['/'], {
      queryParams: { urltoRedirect: state.url, action: 'login' } 
      // window.location.pathname
    });
    return false;
  }
}
