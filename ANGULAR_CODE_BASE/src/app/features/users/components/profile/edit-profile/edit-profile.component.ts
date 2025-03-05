// import { Component, OnInit } from '@angular/core';
// import { UserService } from '../../../../../common/services/user.service';
// import { CommonService } from '../../../../../common/services/common.service';
// import * as moment from 'moment';

// @Component({
//   selector: 'app-edit-profile',
//   templateUrl: './edit-profile.component.html',
//   styleUrls: ['./edit-profile.component.scss']
// })
// export class EditProfileComponent implements OnInit {

//   constructor(
//     private userService: UserService,
//     private commonService: CommonService
//   ) { }

//   userID;
//   UserDetails: any = {
//     city: { _id: '', name: '' },
//     state: { _id: '', name: '' }
//   };
//   isEditing = false;
//   stateList;
//   cityList = [];
//   lastEdited = '';

//   getcurrentUserDetails(userId) {
//     this.commonService.togglePageLoaderFn(true);
//     this.userService.getUserDetails(userId)
//       .subscribe((result: any) => {
//         this.UserDetails = result;
//         this.lastEdited = result && result.updatedOn && moment(result.updatedOn).format('MMMM Do YYYY, h:mm:ss a') || '';
//         this.getCityList(result['state']._id);
//         this.commonService.togglePageLoaderFn(false);
//       });
//   }

//   getCityList(stateId) {
//     this.cityList = [];

//     if (stateId != 0) {
//       this.commonService.getCitylistByState(stateId)
//         .subscribe(response => {
//           if (response.length) this.cityList = response;
//         });
//     }
//   }

//   updateProfilefn(data) {
//     this.getcurrentUserDetails(this.userID);
//   }

//   ngOnInit() {
//     this.userID = this.userService.currentUser.user._id;
//     this.getcurrentUserDetails(this.userID);

//     this.commonService.getStatelist()
//       .subscribe(response => {
//         if (response.length > 0) {
//           this.stateList = response;
//         }
//       });


//   }

// }



import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../common/services/user.service';
import { CommonService } from '../../../../../common/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  UserDetails: any = {}; 
  isEditing = false; 
  profileForm: FormGroup;
  stateList: any[] = [];
  cityList: any[] = [];

  constructor(
    private userService: UserService,
    private commonService: CommonService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', Validators.required],
      role: [{ value: '', disabled: true }],
      pincode: ['', Validators.required],
      state:  ['', Validators.required],
      city:  ['', Validators.required]  
    });

    this.commonService.togglePageLoaderFn(false);

    this.commonService.getStatelist().subscribe(response => {
      if (response.length > 0) {
        this.stateList = response;
        this.getCurrentUserDetails();
      }
    });
  }
  // ngOnInit() {
  //   this.profileForm = this.fb.group({
  //     userName: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     phoneNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], 
  //     role: [{ value: '', disabled: true }],
  //     pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
  //     state: ['', Validators.required],
  //     city: ['', Validators.required]
  //   });
  
  //   this.commonService.togglePageLoaderFn(false);
  
  //   this.commonService.getStatelist().subscribe(response => {
  //     if (response.length > 0) {
  //       this.stateList = response;
  //       this.getCurrentUserDetails();
  //     }
  //   });
  // }
  

  getCurrentUserDetails() {
    this.commonService.togglePageLoaderFn(true);
    this.userService.getCurrentUserDetails().subscribe({
      next: (result: any) => {
        this.UserDetails = result;
  
        const selectedState = this.stateList.find(state => state.id == result.stateId);
        const stateName = selectedState ? selectedState.name : '';
  
        this.profileForm.patchValue({
          userName: result.userName || '',
          email: result.email || '',
          phoneNo: result.phoneNo || '',
          role: result.role || '',
          state: result.stateId || '',
          pincode: result.pincode || ''
        });
  
        this.UserDetails.state = stateName;
  
        if (result.stateId) {
          this.getCityList(result.stateId, result.cityId);
        } else {
          this.cityList = [];
        }
  
        this.commonService.togglePageLoaderFn(false);
      },
      error: (err) => {
        console.error("Error fetching user details:", err);
        this.commonService.togglePageLoaderFn(false);
      }
    });
  }
  
  

  onChangeState(event: any) {
    const stateId = event.target.value;
    this.cityList = [];
    this.profileForm.patchValue({ city: '' }); 
  
    if (stateId) {
      this.getCityList(stateId);
    }
  }
  

  getCityList(stateId: number, selectedCityId?: number) {
    this.commonService.getCitylistByState(stateId).subscribe(response => {
      if (response.length > 0) {
        this.cityList = response;
  
        if (selectedCityId) {
          const selectedCity = this.cityList.find(city => city.id == selectedCityId);
          this.profileForm.patchValue({ city: selectedCity ? selectedCity.id : '' });
  
          this.UserDetails.city = selectedCity ? selectedCity.name : '';
        }
      }
    });
  }
  
  

  toggleEditMode() {
    this.isEditing = !this.isEditing;
  }

  updateProfile() {
    if (this.profileForm.invalid) return;
  
    const selectedState = this.stateList.find(state => state.id == this.profileForm.getRawValue().state);
    const selectedCity = this.cityList.find(city => city.id == this.profileForm.getRawValue().city);
  
    const updatedUser = {
      ...this.UserDetails,
      userName: this.profileForm.getRawValue().userName,
      email: this.profileForm.getRawValue().email,
      phoneNo: this.profileForm.getRawValue().phoneNo,
      role: this.UserDetails.role,  
      pincode: this.profileForm.getRawValue().pincode,
      stateId: selectedState ? selectedState.id : null, 
      cityId: selectedCity ? selectedCity.id : null  
    };
  
    this.userService.updateProfile(this.UserDetails.id, updatedUser).subscribe({
      next: (response) => {
        console.log("Profile updated successfully:", response);
  
        this.UserDetails = { ...updatedUser }; 
  
        this.profileForm.patchValue({
          userName: updatedUser.userName,
          email: updatedUser.email,
          phoneNo: updatedUser.phoneNo,
          role: updatedUser.role,
          pincode: updatedUser.pincode,
          state: updatedUser.stateId, 
          city: updatedUser.cityId 
        });
  
        const stateName = this.stateList.find(state => state.id == updatedUser.stateId)?.name || '';
        const cityName = this.cityList.find(city => city.id == updatedUser.cityId)?.name || '';
  
        this.UserDetails.state = stateName;
        this.UserDetails.city = cityName;
  
        this.toggleEditMode();
      },
      error: (err) => {
        console.error("Error updating profile:", err);
      }
    });
  }
  
  
  
}
