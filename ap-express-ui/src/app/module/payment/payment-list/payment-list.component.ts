import { Component } from '@angular/core';
import {NotificationService} from "../../../services/notification/notification.service";
import {ModalService} from "@coreui/angular";
import {HttpResponseConstant} from "../../../constant/http-response-constant";
import Swal from "sweetalert2";
import {HttpResponseMessage} from "../../../constant/http-response-message";
import {PaymentService} from "../../../services/payment/payment.service";

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent {
  public paymentList:any[] = [];
  public paymentSetting: any;
  public paymentId: any;
  items = [
    {label: 'Edit', icon: 'pi pi-pencil', id: 3},
    {label: 'Delete', icon: 'pi pi-trash', id: 4},
  ];

  constructor(public paymentService: PaymentService, public notificationService: NotificationService,
              public modalService: ModalService) {
    this.getPaymentSetting();
    this.getAllPaymentList();
  }


  /**
   * this method can be used to get all items from back end service
   */
  getAllPaymentList() {
    this.paymentService.getAllPayments().subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.paymentList = res.body;
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
  getPaymentSetting() {
    this.paymentService.getPaymentSettings().subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.paymentSetting = res.body;
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

  /**
   * this method can be used to delete item from item master table
   * @param itemId to payment id
   */
  deleteItem(itemId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Void the selected Payment',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        this.paymentService.voidPayment(itemId).subscribe((res: any) => {
          if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
            Swal.fire('Void!', HttpResponseMessage.PAYMENT_DELETED_SUCCESS, 'success');
            this.getAllPaymentList();
          } else {
            this.notificationService.warningNotification(res.body.message);
          }
        }, error => {
          this.notificationService.errorNotification(error);
        });
      }
    });
  }

}
