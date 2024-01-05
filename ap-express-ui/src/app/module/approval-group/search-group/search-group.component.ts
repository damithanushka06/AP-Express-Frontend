import {Component, ViewChild} from '@angular/core';
import {ModalComponent, ModalService} from "@coreui/angular";
import {HttpResponseConstant} from "../../../constant/http-response-constant";
import {AppGroupService} from "../../../services/approvalGroup/app-group.service";
import {NotificationService} from "../../../services/notification/notification.service";
import Swal from "sweetalert2";
import {HttpResponseMessage} from "../../../constant/http-response-message";

@Component({
  selector: 'app-search-group',
  templateUrl: './search-group.component.html',
  styleUrls: ['./search-group.component.scss']
})
export class SearchGroupComponent {


  @ViewChild('staticBackdropModal')
  public staticBackdropModal!: ModalComponent;
  public isEditGroup!: boolean;
  approvalGroupList!: any[];
  public groupSetting: any;
  groupId: any;
  items = [
    {label: 'Edit', icon: 'pi pi-pencil', id: 3},
    {label: 'Delete', icon: 'pi pi-trash', id: 4},
  ];
  constructor(private modalService: ModalService, public groupService: AppGroupService,
              public notificationService: NotificationService) {
    this.getUserSetting();
    this.searchApprovalGroup();
  }

  /**
   * show user edit modal
   */
  showModal() {
    this.modalService.toggle({show: true, id: 'groupList', modal: this.staticBackdropModal});
    this.isEditGroup = true;
  }

  /**
   * close user edit modal
   */
  hideModal() {
    this.modalService.toggle({show: false, id: 'groupList', modal: this.staticBackdropModal});
    this.isEditGroup = false;
  }

  /**
   * this method can be used to get all users from back end service
   */
  getUserSetting() {
    this.groupService.getSetting().subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.groupSetting = res.body;
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

  /**
   * this method can be used to delete approval group
   * @param id to approval group id
   */
  deleteApprovalGroup(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Delete the selected approval group',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        this.groupService.deleteGroup(id).subscribe((res: any) => {
          if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
            this.notificationService.successNotificationDelete(HttpResponseMessage.APP_GROUP_DELETED_SUCCESS);
            this.searchApprovalGroup();
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
   * this method can be used to get all users from back end service
   */
  searchApprovalGroup() {
    this.groupService.searchApprovalGroup().subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.approvalGroupList = res.body;
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

}
