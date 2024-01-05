import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DropdownDto} from "../../../dtos/dropdown/dropdown-dto";
import {Router} from "@angular/router";
import {NotificationService} from "../../../services/notification/notification.service";
import {VendorService} from "../../../services/vendor/vendor.service";
import {catchError, of} from "rxjs";
import {PaymentService} from "../../../services/payment/payment.service";
import {HttpResponseConstant} from "../../../constant/http-response-constant";
import {HttpResponseMessage} from "../../../constant/http-response-message";

@Component({
  selector: 'app-create-vendor',
  templateUrl: './create-vendor.component.html',
  styleUrls: ['./create-vendor.component.scss']
})
export class CreateVendorComponent implements OnInit{
  public createVendorForm!: FormGroup;
  public paymentTermList: DropdownDto = new DropdownDto();
  public paymentMethodList: DropdownDto = new DropdownDto();

  @Input() public isEdit = false;
  @Input() public vendorId!: number;
  @Output() success = new EventEmitter();

  proPicUrl: any;


  constructor(public formBuilder: FormBuilder, public vendorService: VendorService, public router: Router,
              public notificationService: NotificationService, public paymentService: PaymentService) {
  }

  ngOnInit(): void {
    this.createVendorForm =
      this.formBuilder.group({
        name: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        contactNo: [null, Validators.required],
        paymentTermId: [null,Validators.required],
        paymentMethodId: [null, Validators.required],
        address: [null, Validators.required],
        notes: [null],
      });
    this.getPaymentMethodList();
    this.getPaymentTermList();
    if (this.isEdit) {
      this.getVendorData();
    }
  }

  get f() {
    return this.createVendorForm.controls
  }


  /**
   * this method can be used to create user
   */
  submitVendorData() {
    this.vendorService.createVendor(this.createVendorForm.value).pipe(
      catchError(error => {
        this.notificationService.errorNotification(error);
        return of(null);
      })
    ).subscribe((res:any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.notificationService.successNotification(HttpResponseMessage.VENDOR_CREATE_SUCCESS);
        this.router.navigateByUrl('/home/vendor/vendor-list');
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    });
  }

  /**
   * this method can be used to update user
   */
  updateVendorData() {
    this.createVendorForm.addControl('id', this.formBuilder.control(''));
    this.createVendorForm.get('id')?.patchValue(this.vendorId);
    this.vendorService.updateVendor(this.createVendorForm.value).subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.notificationService.successNotification(HttpResponseMessage.VENDOR_UPDATED_SUCCESS);
        this.success.emit();
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

  /**
   * this method can be used to update user
   */
  getVendorData() {
    this.vendorService.getVendor(this.vendorId).subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.createVendorForm.patchValue(res.body);
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }


  /**
   * this method can be used to reset user form data
   */
  resetVendorForm() {
    this.createVendorForm.reset();
    if(this.isEdit){
      this.getVendorData();
    }
  }

  /**
   * this method used to get payment term list
   */
  getPaymentTermList(){
    this.paymentService.getPaymentTermList().pipe(
      catchError(error => {
        this.notificationService.errorNotification(error);
        return of(null);
      })
    ).subscribe((res:any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.paymentTermList.data = res.body;
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    });
  }

  /**
   * this method used to get payment method list
   */
  getPaymentMethodList(){
    this.paymentService.getPaymentMethodList().pipe(
      catchError(error => {
        this.notificationService.errorNotification(error);
        return of(null);
      })
    ).subscribe((res:any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.paymentMethodList.data = res.body;
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    });
  }


}
