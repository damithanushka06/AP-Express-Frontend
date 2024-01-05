import {Component, ViewChild} from '@angular/core';
import {AccountService} from "../../../services/account/account.service";
import {HttpResponseConstant} from "../../../constant/http-response-constant";
import {NotificationService} from "../../../services/notification/notification.service";
import Swal from "sweetalert2";
import {HttpResponseMessage} from "../../../constant/http-response-message";
import {ModalComponent, ModalService} from "@coreui/angular";

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent {
  accountId: any;
  accountList: any [] = [];
  accountSetting: any;
  isEditAccount = false;
  acc: any;
  items = [
    {label: 'Edit', icon: 'pi pi-pencil', id: 3},
    {label: 'Delete', icon: 'pi pi-trash', id: 4},
  ];

  @ViewChild('staticBackdropModal')
  public staticBackdropModal!: ModalComponent;


  constructor(public accountService: AccountService, public modalService: ModalService,
              public notificationService: NotificationService) {
    this.getAccountSetting();
    this.getAllAccountList();
  }

  /**
   * this method can be used to get all accounts from back end service
   */
  getAllAccountList() {
    this.accountService.getAllAccountList().subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.accountList = res.body;
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

  /**
   * this method can be used to get account table structure
   */
  getAccountSetting() {
    this.accountService.getSetting().subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.accountSetting = res.body;
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

  /**
   * this method can be used to delete account from account master table
   * @param accId to Account id
   */
  deleteAccount(accId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Delete the selected user',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        this.accountService.deleteAccount(accId).subscribe((res: any) => {
          if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
            this.notificationService.successNotificationDelete(HttpResponseMessage.USER_DELETED_SUCCESS);
            this.getAllAccountList();
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
    this.modalService.toggle({show: true, id: 'accountList', modal: this.staticBackdropModal});
    this.isEditAccount = true;
  }

  /**
   * close user edit modal
   */
  hideModal() {
    this.modalService.toggle({show: false, id: 'accountList', modal: this.staticBackdropModal});
    this.isEditAccount = false;
  }
}
