import { Component, OnInit, Input, ViewChild } from '@angular/core';
// , ViewChild
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { CommonService } from '../../services/common.service';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  pageTitle: string = '';
  pageIcon:string = '';
  isUserLoggedIn: Boolean = false;
  isLoggedIn:any;
currentUser:any={};
  constructor(
    private loginService: LoginService,
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute, private titleService: Title
  ) {
    this.isUserLoggedIn = loginService.isLoggedIn();
  }

  // openloginModal() {
  //   this.modalService.open(LoginModalComponent);
  // }
  

  // ----- FORM
  headerDropdown: false;
  toggleMenuItems = false;

  // ------------- LOGIN
  // Main header alert message
  HeaderMessage = {
    type: '',
    message: ''
  }
  // navItems = [
  //   { path: '/users/dashboard', name: 'Dashboard' },
  //   { path: '/property/new', name: 'Add New Property' },
  //   { path: '/property/search', name: 'Find Property' },
  //   { path: '/property/listing', name: 'My Listing' },
  //   { path: '/users/profile/edit', name: 'My Profile' }
  // ];

  closeHeaderMessage() {
    this.HeaderMessage.message = '';
  }

  changeHeaderMessage(type, message) {
    this.HeaderMessage = { type: type, message: message }
    var self = this;
    setTimeout(function () {
      self.closeHeaderMessage();
    }, 5000);
  }

  handleLogout() {
    this.loginService.logOut();
  }

  pageloaderStatus: boolean = true;

  ngOnInit() {
    this.loginService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      console.log(this.isLoggedIn, "islofff");
  
      // Call getCurrentUserDetail only when isLoggedIn becomes true
      if (this.isLoggedIn) {
        console.log("ttt");
        this.getCurrentUserDetail();
      }
    });
    this.isUserLoggedIn = this.loginService.isLoggedIn();
    if(this.isUserLoggedIn){
      this.getCurrentUserDetail();
    }
    this.updateTitle(); 
    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe(() => this.updateTitle());
    this.getCurrentUserDetail();
    const logoImg = document.getElementById('logoImg');
    document.addEventListener('scroll', (event) => {
      if (logoImg) {
        if (window.pageYOffset > 30) {
          logoImg.classList.add('smallLogo');
          // document.getElementById('navbar').style.top = '35px'
        } else if (window.pageYOffset < 30) {
          logoImg.classList.remove('smallLogo');
          // document.getElementById('navbar').style.top = '0px'
        }
      }
    });
    this.route.queryParamMap.subscribe((data) => {
      if (data.get('action') === 'signUpsuccess') {
        this.changeHeaderMessage('success', 'Congratulations, you have been successfully registered, login to continue');
        // this.openloginModal();
      }
      else if (data.get('action') === 'logOut') {
        this.changeHeaderMessage('success', 'You have logged out successfully');
        // this.openloginModal();
      }
      else if (data.get('action') === 'login') {
        this.changeHeaderMessage('success', 'Please login to continue');
        // this.openloginModal();
      }
    });

    // HEADER MESSAGE
    this.commonService.HeaderMessage$.subscribe((data: any) => {
      if (data)
        this.changeHeaderMessage(data.type, data.message);
    });

    // Toggling Page Loader status
    this.commonService.togglePageLoader$.subscribe(data => this.pageloaderStatus = data);
  }

  private updateTitle() {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const title = route.snapshot.data['title'] || '';
    const icon =route.snapshot.data['icon'] ;
    this.pageTitle = title;
    this.pageIcon = icon;
    this.titleService.setTitle(title); 
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

}