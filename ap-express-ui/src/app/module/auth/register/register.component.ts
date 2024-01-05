import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {catchError, of, tap} from "rxjs";
import {HttpResponseConstant} from "../../../constant/http-response-constant";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public userRegisterForm: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
   constructor(public router: Router, public formBuilder: FormBuilder, public authService: AuthService) {
     this.userRegisterForm = this.formBuilder.group({
       username: [null, Validators.required],
       email: [null, Validators.required],
       password: [null, Validators.required],
       confirmPassword: [null, Validators.required],
     });
   }

  /**
   * this method can be used to register a user
   */
  registerUser(): void {
    this.authService.registerUser(this.userRegisterForm?.value)
      .subscribe((response) => {
         if(response.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS){
           this.isSuccessful = true;
           this.isSignUpFailed = false;
           this.router.navigateByUrl('/login');
         } else {

        }
        catchError(error => {
          this.errorMessage = error.error.message;
          this.isSignUpFailed = true;
          return of(error);
        });
      });
  }
}
