import {Component, ViewChild} from '@angular/core';
import {ModalComponent, ModalService} from "@coreui/angular";
import {NotificationService} from "../../../services/notification/notification.service";
import {HttpResponseConstant} from "../../../constant/http-response-constant";
import Swal from "sweetalert2";
import {HttpResponseMessage} from "../../../constant/http-response-message";
import {BillService} from "../../../services/bill/bill.service";

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss']
})
export class BillListComponent {

  public billList:any[] = [];
  public billSetting: any;
  public billId: any;
  public  bill: any;
  public isEditBill = false;
  public isBillApprove = false;
  items = [
    {label: 'Edit', icon: 'pi pi-pencil', id: 3},
    {label: 'Delete', icon: 'pi pi-trash', id: 4},
    {label: 'Approve', icon: 'pi pi-trash', id: 1},
  ];

  @ViewChild('staticBackdropModal')
  public staticBackdropModal!: ModalComponent;

  @ViewChild('staticBackdropModalBillApprove')
  public staticBackdropModalBillApprove!: ModalComponent;



  constructor(public billService: BillService, public notificationService: NotificationService,
              public modalService: ModalService) {
    this.getBillSetting();
    this.getAllBillList();
  }

  /**
   * this method can be used to get all items from back end service
   */
  getAllBillList() {
    this.billService.getAllBills().subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.billList = res.body;
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
  getBillSetting() {
    this.billService.getBillSettings().subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.billSetting = res.body;
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
      text: 'Delete the selected Bill',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        this.billService.deleteBill(itemId).subscribe((res: any) => {
          if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
            this.notificationService.successNotificationDelete(HttpResponseMessage.USER_DELETED_SUCCESS);
            this.getAllBillList();
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
    this.modalService.toggle({show: true, id: 'bill', modal: this.staticBackdropModal});
    this.isEditBill = true;
  }

  /**
   * close user edit modal
   */
  hideModal() {
    this.modalService.toggle({show: false, id: 'billList', modal: this.staticBackdropModal});
    this.isEditBill = false;
  }

  /**
   * show bill approve modal
   */
  showApproveModal() {
    this.modalService.toggle({show: true, id: 'approveBill', modal: this.staticBackdropModalBillApprove});
    this.isBillApprove = true;
  }

  /**
   * close user approve bill modal
   */
  hideBillApproveModal() {
    this.modalService.toggle({show: false, id: 'approveBill', modal: this.staticBackdropModalBillApprove});
    this.isBillApprove = false;
  }

  protected readonly event = event;
}
