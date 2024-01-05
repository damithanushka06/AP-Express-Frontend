import {Component, ViewChild} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {HttpResponseConstant} from "../../../constant/http-response-constant";
import {NotificationService} from "../../../services/notification/notification.service";
import {HttpResponseMessage} from "../../../constant/http-response-message";
import Swal from "sweetalert2";
import {ModalComponent, ModalService} from "@coreui/angular";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  public userList: any[] = [];
  public userSetting: any = {};
  public isEditUser = false;
  public userId: any;
  public i!: number;
  items = [
    {label: 'Edit', icon: 'pi pi-pencil', id: 3},
    {label: 'Delete', icon: 'pi pi-trash', id: 4},
  ];

  @ViewChild('staticBackdropModal')
  public staticBackdropModal!: ModalComponent;

  constructor(public userService: UserService, public notificationService: NotificationService,
              private modalService: ModalService) {
    this.getAllUserList();
    this.getUserSetting();
  }

  /**
   * this method can be used to get all users from back end service
   */
  getAllUserList() {
    this.userService.getAllUserList().subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.userList = res.body;
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

  /**
   * this method can be used to get all users from back end service
   */
  getUserSetting() {
    this.userService.getSetting().subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.userSetting = res.body;
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

  /**
   * this method can be used to delete user
   * @param id to user id
   */
  deleteUser(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Delete the selected user',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        this.userService.deleteUser(id).subscribe((res: any) => {
          if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
            this.notificationService.successNotificationDelete(HttpResponseMessage.USER_DELETED_SUCCESS);
            this.getAllUserList();
          } else {
            this.notificationService.warningNotification(res.body.message);
          }
        }, error => {
          this.notificationService.errorNotification(error);
        });
      }
    });
  }

  /**
   * show user edit modal
   */
  showModal() {
    this.modalService.toggle({show: true, id: 'userList', modal: this.staticBackdropModal});
    this.isEditUser = true;
  }

  /**
   * close user edit modal
   */
  hideModal() {
    this.modalService.toggle({show: false, id: 'userList', modal: this.staticBackdropModal});
    this.isEditUser = false;
  }

}
