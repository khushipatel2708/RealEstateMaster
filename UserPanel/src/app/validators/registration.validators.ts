import { AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from '../services/common.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root' 
})
export class RegistrationValidators {

    constructor(public http: HttpClient, private commonService: CommonService) { }

    passwordMatch(control: AbstractControl) {
        let password = control.get('password');
        let cPassword = control.get('cPassword');

        if (password?.value !== '' && cPassword?.value !== '' && (password?.value !== cPassword?.value))
            return { passwordMatch: true };

        return null;
    }

    checkEmailAvailability(control: AbstractControl): Promise<ValidationErrors | null> {
        return new Promise((resolve) => {
          this.http.get<{ response: boolean }>(environment.BASE_URL + '/common/checkemail-availability/email/' + control.value)
            .subscribe(data => {
              if (data.response) {
                resolve(null); // Email is available (no error)
              } else {
                resolve({ checkEmailAvailability: true }); // Email already exists (show validation error)
              }
            }, () => {
              resolve(null); // Handle errors gracefully
            });
        });
      }
      
}