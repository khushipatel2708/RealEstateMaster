import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  loginFormSubmitted = false;
  loginForm:FormGroup;
  showPassword = false;
  show_eye = false;
  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private cdRef: ChangeDetectorRef,
    private formBuilder:FormBuilder,
    private toast:ToastrService
  ) { }
  get lf() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm=this.formBuilder.group({
      emailPhone:[null,Validators.required],
      password:[null,Validators.required]
    });
    this.route.queryParamMap.subscribe((data) => {
      // console.log('--- ', data);
      if (data.get('action') === 'signUpsuccess') 
        this.alertMessage = { status: true, type: 'success', message: 'Please login to continue' }
      else if (data.get('action') === 'login') 
        this.alertMessage = { status: true, type: 'success', message: 'Please login to continue' }

      if (data.get('urltoRedirect') != '')
        this.urltoRedirect = data.get('urltoRedirect');      
    });      
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
    this.show_eye = !this.show_eye;
  }
  alertMessage: any = {
    // status: false,
    type: '',
    message: ''
  };
  urltoRedirect = '';
  // loginCheck = false;

  login() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
    let returnData = this.loginService.checkUserLogin(this.loginForm.value)
    .subscribe(response => {
        this.alertMessage = {
          type: 'success',
          status: true,
          message: 'Logged In successfully'
        }
        this.toast.success("Login Successfully")
        // this.loginCheck = false;
        // this.alertMessage.message = '';
        const token = response['token'];
    const tokenParts = token.split('.');
    const payload = JSON.parse(atob(tokenParts[1]));
    const role = payload.user.role;
        this.loginSuccess(response['token']);
        this.router.navigate(['/users/dashboard']);
    },
    (error: Response) => {
      // this.alertMessage.type = 'danger';
      // this.loginCheck = false;
      console.log('Unexpected error occured ', error);
      this.toast.error("Invalid Email and Password")
      if (error.status === 401) {
        this.alertMessage.message = "Either of you details is incorrect";
      }
      else {
        this.alertMessage.message = "An Unexpected error occured";
      }
    });
  }
  }

  // login(loginForm: NgForm): void {
  //   if (loginForm.valid) {
  //     this.loginCheck = true; // Show spinner while logging in

  //     const { emailPhone, loginPassword } = loginForm.value;
  //     const password=loginPassword;
  //     // Call authentication service to generate token
  //     this.loginService.checkUserLogin(emailPhone,password).subscribe(
  //       (response) => {
  //         // Handle successful login response (e.g., store token)
  //         this.loginCheck = false; // Hide spinner on success
  //         this.activeModal.close('Login successful'); // Close modal or handle redirect
  //       },
  //       (error) => {
  //         this.loginCheck = false; // Hide spinner on error
  //         this.alertMessage = { message: 'Invalid credentials. Please try again.', type: 'danger' };
  //       }
  //     );
  //   }
  // }


  loginSuccess(token) {
    this.commonService.changeHeaderMessage({ type: 'success', message: 'You have logged in successfully'});
    // this.activeModal.dismiss('Cross click');
    this.router.navigate([this.urltoRedirect || '/users/dashboard']);
    
    // if (this.urltoRedirect)
    //   this.router.navigate([this.urltoRedirect]);
    // else
    //   this.router.navigate(['/users/dashboard']);

    // Adding to local storage
    // localStorage.setItem('token', token);
  }


  

}
