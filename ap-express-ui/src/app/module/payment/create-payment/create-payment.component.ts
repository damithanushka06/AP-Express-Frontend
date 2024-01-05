import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DropdownService} from "../../../services/dropdown/dropdown.service";
import {DropdownUtility} from "../../../common-utility/dropdown/dropdown-utility";
import {HttpResponseConstant} from "../../../constant/http-response-constant";
import {HttpResponseMessage} from "../../../constant/http-response-message";
import {PaymentService} from "../../../services/payment/payment.service";
import {NotificationService} from "../../../services/notification/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.scss']
})
export class CreatePaymentComponent implements OnInit{
  public dropDownUtility: DropdownUtility = new DropdownUtility(this.dropdownService);
  paymentCreateForm!: FormGroup;
  constructor(public formBuilder: FormBuilder, public dropdownService: DropdownService,
              public paymentService: PaymentService, public notificationService: NotificationService,
              public router: Router) {
  }
  ngOnInit(): void {
    this.paymentCreateForm = this.formBuilder.group({
      referenceNo: [null, Validators.required],
      vendorId: [null, Validators.required],
      billId: [null, Validators.required],
      paymentDate: [null, Validators.required],
      amount: [null, Validators.required],
      billBalance: [null, Validators.required],
      notes: [null, Validators.required],
    });
    this.dropDownUtility.getVendorList();
  }

  get f() {
    return this.paymentCreateForm.controls;
  }

  /**
   * submit payment details to the back endpoint
   */
  submitForm() {
    const paymentDate = new Date(this.paymentCreateForm.value.paymentDate);
    this.paymentCreateForm.get('paymentDate')?.patchValue(paymentDate);
    this.paymentService.createPayment(this.paymentCreateForm.value).subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.notificationService.successNotification(HttpResponseMessage.PURCHASE_ORDER_CREATE_SUCCESS);
        this.router.navigateByUrl('/home/payment/payment-list');
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

  /**
   * this method used to get bill balance amount
   * @param value to bill id
   */
  getBillRemainingBalance(value: any) {
    this.paymentService.getBillBalance(value).subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.paymentCreateForm.get('billBalance')?.patchValue(res.body.billBalance);
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }
}
