import {Component, ViewChild} from '@angular/core';
import {HttpResponseConstant} from "../../../constant/http-response-constant";
import {NotificationService} from "../../../services/notification/notification.service";
import {ItemService} from "../../../services/item/item.service";
import Swal from "sweetalert2";
import {HttpResponseMessage} from "../../../constant/http-response-message";
import {ModalComponent, ModalService} from "@coreui/angular";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {
  public itemList:any[] = [];
  public itemSetting: any;
  public itemId: any;
  public isEditItem = false;
  items = [
    {label: 'Edit', icon: 'pi pi-pencil', id: 3},
    {label: 'Delete', icon: 'pi pi-trash', id: 4},
  ];

  @ViewChild('staticBackdropModal')
  public staticBackdropModal!: ModalComponent;
  item: any;
  constructor(public itemService: ItemService, public notificationService: NotificationService,
              public modalService: ModalService) {
    this.getItemSetting();
    this.getAllItemList();
  }

  /**
   * this method can be used to get all items from back end service
   */
  getAllItemList() {
    this.itemService.getAllItemList().subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.itemList = res.body;
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

  /**
   * this method can be used to get all items from back end service
   */
  getItemSetting() {
    this.itemService.getSetting().subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.itemSetting = res.body;
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

  /**
   * this method can be used to delete item from item master table
   * @param itemId to item id
   */
  deleteItem(itemId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Delete the selected user',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        this.itemService.deleteItem(itemId).subscribe((res: any) => {
          if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
            this.notificationService.successNotificationDelete(HttpResponseMessage.USER_DELETED_SUCCESS);
            this.getAllItemList();
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
    this.modalService.toggle({show: true, id: 'itemList', modal: this.staticBackdropModal});
    this.isEditItem = true;
  }

  /**
   * close user edit modal
   */
  hideModal() {
    this.modalService.toggle({show: false, id: 'itemList', modal: this.staticBackdropModal});
    this.isEditItem = false;
  }
}
