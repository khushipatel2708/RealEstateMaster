import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'app/services/login.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  showHeader: boolean = true;
  currentUser:any={};
  isUserLoggedIn:any;
constructor(private router: Router,private userService:UserService,private loginService:LoginService){}
  ngOnInit(){
    this.getCurrentUserDetail();
  this.router.events.subscribe(() => {
    this.showHeader = this.router.url !== '/login' && this.router.url !== '/sign-up'; // Hide header if on login page
  });
  this.isUserLoggedIn = this.loginService.isLoggedIn();
}
getCurrentUserDetail(){
  this.userService.getCurrentUserDetails().subscribe(
    (result) =>{
      this.currentUser = result;
      localStorage.setItem("role",this.currentUser.role);
    },
    (error) =>{
      console.log(error);
    }
  )
}
handleLogout() {
  this.loginService.logOut()
  this.router.navigate(['/login']);
}
}
