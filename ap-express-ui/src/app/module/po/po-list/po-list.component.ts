import {Component, ViewChild} from '@angular/core';
import {HttpResponseConstant} from "../../../constant/http-response-constant";
import Swal from "sweetalert2";
import {HttpResponseMessage} from "../../../constant/http-response-message";
import {NotificationService} from "../../../services/notification/notification.service";
import {ModalComponent, ModalService} from "@coreui/angular";
import {PoService} from "../../../services/po/po.service";

@Component({
  selector: 'app-po-list',
  templateUrl: './po-list.component.html',
  styleUrls: ['./po-list.component.scss']
})
export class PoListComponent {

  public poList:any[] = [];
  public poSetting: any;
  public poId: any;
  public isEditPo = false;
  public po: any;
  items = [
    {label: 'Edit', icon: 'pi pi-pencil', id: 3},
    {label: 'Delete', icon: 'pi pi-trash', id: 4},
    {label: 'Approve', icon: 'pi pi-trash', id: 1},
  ];

  @ViewChild('staticBackdropModal')
  public staticBackdropModal!: ModalComponent;


  constructor(public poService: PoService, public notificationService: NotificationService,
              public modalService: ModalService) {
    this.getPOSetting();
    this.getAllPOList();
  }

  /**
   * this method can be used to get all items from back end service
   */
  getAllPOList() {
    this.poService.getAllPurchaseOrders().subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.poList = res.body;
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
  getPOSetting() {
    this.poService.getPurchaseOrderSettings().subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.poSetting = res.body;
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
      text: 'Delete the selected PO',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        this.poService.deletePurchaseOrder(itemId).subscribe((res: any) => {
          if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
            this.notificationService.successNotificationDelete(HttpResponseMessage.USER_DELETED_SUCCESS);
            this.getAllPOList();
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
    this.modalService.toggle({show: true, id: 'poList', modal: this.staticBackdropModal});
    this.isEditPo = true;
  }

  /**
   * close user edit modal
   */
  hideModal() {
    this.modalService.toggle({show: false, id: 'poList', modal: this.staticBackdropModal});
    this.isEditPo = false;
  }

  /**
   * Downloads the Purchase Order (PO) report based on the given PO ID.
   * @param poId The ID of the PO to download the report for.
   */
  downloadPO(poId: any) {
    this.poService.downloadPO(poId).subscribe((res: any) => {
      if (res) {
        const blob = new Blob([res], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      } else {
        console.error('Empty response body');
      }
    }, (error: string) => {
      this.notificationService.errorNotification(error);
    });
  }


}
