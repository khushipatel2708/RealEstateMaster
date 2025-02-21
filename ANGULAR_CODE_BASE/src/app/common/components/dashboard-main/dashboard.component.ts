import { Component, OnInit } from '@angular/core';
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
  constructor(private loginService:LoginService,
    private commonService:CommonService
  ) { 
    this.isUserLoggedIn = loginService.isLoggedIn();
    this.userRole=localStorage.getItem('role');
}

  // toggleMenuItems = false;

  ngOnInit() {
    this.getMenuList();
  }
  getMenuList(){
    this.commonService.getMenuListByPermission(this.userRole)
    .subscribe((result:any[]) =>{
      this.menuList=result;
   });
  }
}
