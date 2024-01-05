import { Component } from '@angular/core';
import {NotificationService} from "../../../services/notification/notification.service";
import {ModalService} from "@coreui/angular";
import {HttpResponseConstant} from "../../../constant/http-response-constant";
import Swal from "sweetalert2";
import {HttpResponseMessage} from "../../../constant/http-response-message";
import {PorService} from "../../../services/por/por.service";

@Component({
  selector: 'app-por-list',
  templateUrl: './por-list.component.html',
  styleUrls: ['./por-list.component.scss']
})
export class PorListComponent {
  public porSetting: any;
  public porList: any;
  porId: any;
  items = [
    {label: 'Edit', icon: 'pi pi-pencil', id: 3},
    {label: 'Delete', icon: 'pi pi-trash', id: 4},
  ];
  constructor(public porService: PorService, public notificationService: NotificationService,
              public modalService: ModalService) {
    this.getPORSetting();
    this.getAllPORList();
  }


  /**
   * Retrieves all purchase order receipts.
   * If the response status is successful, assigns the retrieved purchase order receipts to the `porList` variable.
   * Otherwise, displays a warning notification with the corresponding error message.
   * If an error occurs during the HTTP request, displays an error notification.
   */
  getAllPORList() {
    this.porService.getAllPurchaseOrderReceipts().subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.porList = res.body;
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, (error: string) => {
      this.notificationService.errorNotification(error);
    });
  }

  /**
   * Retrieves purchase order receipt settings.
   * If the response status is successful, assigns the retrieved settings to the `porSetting` variable.
   * Otherwise, displays a warning notification with the corresponding error message.
   * If an error occurs during the HTTP request, displays an error notification.
   */
  getPORSetting() {
    this.porService.getPurchaseOrderReceiptSettings().subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.porSetting = res.body;
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, (error: string) => {
      this.notificationService.errorNotification(error);
    });
  }

  /**
   * Deletes a purchase order receipt item.
   * Displays a confirmation dialog to confirm the deletion.
   * If confirmed, sends a request to delete the item with the specified `itemId`.
   * If the deletion is successful, displays a success notification and retrieves all purchase order receipts again.
   * Otherwise, displays a warning notification with the corresponding error message.
   * If an error occurs during the HTTP request, displays an error notification.
   * @param itemId The ID of the item to be deleted.
   */
  deleteItem(itemId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Delete the selected POR',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        this.porService.deletePurchaseOrderReceipt(itemId).subscribe((res: any) => {
          if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
            this.notificationService.successNotificationDelete(HttpResponseMessage.USER_DELETED_SUCCESS);
            this.getAllPORList();
          } else {
            this.notificationService.warningNotification(res.body.message);
          }
        }, (error: string) => {
          this.notificationService.errorNotification(error);
        });
      }
    });
  }

}
