import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth/auth.service";
import {StorageService} from "../../../services/auth/storage.service";
import {EventData} from "../../../dtos/auth/event-data";
import {EventBusService} from "../../../services/auth/event-bus.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public userName: string | undefined;
  public password: string | undefined;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
    constructor(public router: Router, public authService: AuthService, public storageService: StorageService,
                public eventBusService: EventBusService) {
      this.isLoggedIn = this.storageService.isLoggedIn();
      this.reloadPage();
    }

  /**
   * this method can be used to log in user
   */
  login() {
    this.authService.login(this.userName, this.password)
      .subscribe((response: any) => {
        this.storageService.saveUser(response);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },err => {
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
    });
  }

  reloadPage(): void {
    if(this.isLoggedIn){
      this.router.navigateByUrl('home')
    }
  }
}
