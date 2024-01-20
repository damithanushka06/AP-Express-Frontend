import {Component, Input, OnInit} from '@angular/core';
import { HeaderComponent } from '@coreui/angular';
import {AuthService} from "../../../services/auth/auth.service";
import {StorageService} from "../../../services/auth/storage.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {EventBusService} from "../../../services/auth/event-bus.service";
import {HttpResponseConstant} from "../../../constant/http-response-constant";
import {UserService} from "../../../services/user/user.service";
import {NotificationService} from "../../../services/notification/notification.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent  extends HeaderComponent implements OnInit {

  @Input() sidebarId: string = "sidebar";
  eventBusSub?: Subscription;
  public proPicUrl!: any;

  constructor(private authService: AuthService, public storageService: StorageService,
              public router: Router, private eventBusService: EventBusService, public userService: UserService,
              public notificationService: NotificationService, public sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit(): void {
    this.getUserProPic();
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logOut();
    });
    let token: any;
    if (this.storageService.isTokenExpired(token)) {
     this.logOut();
    } else {
      // token is valid: send requests...
    }

  }

  /**
   * this method can be used to log out the user
   */
  logOut() {
    this.authService.logout().subscribe({
      next: res => {
        this.storageService.clean();
        this.router.navigateByUrl('login')
      },
      error: err => {
        console.log(err);
      }
    });
  }

  /**
   * this method can be used get user profile pic
   */
  getUserProPic(){
    if(!this.storageService.getUser().id){
      return;
    }
    this.userService.getUser(this.storageService.getUser().id).subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        if(res.body.proPicBase64){
          this.proPicUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + res.body.proPicBase64);
        }
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }
}
