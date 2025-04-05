import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'app/common/services/common.service';
import { LoginService } from 'app/common/services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isUserLoggedIn: Boolean = false;
  menuList:any[]=[];
  userRole:string;
  data = { emailPhone: '', loginPassword: '' }; 
  isLoggedIn:any;
  constructor(private loginService:LoginService,
    private commonService:CommonService,
    public router:Router
  ) { 
    this.loginService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        this.userRole=localStorage.getItem('role');
      }
    });
    this.isUserLoggedIn = loginService.isLoggedIn();
     this.userRole=localStorage.getItem('role');
     this.getMenuList();
}

  // toggleMenuItems = false;

  ngOnInit() {
    this.getMenuList();
  }
  getMenuList(){
    const formData={
      roleName:this.userRole,
    }
    this.commonService.getMenuListByPermission(formData)
    .subscribe((result:any[]) =>{
      this.menuList=result;
   });
  }
}
