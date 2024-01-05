import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DropdownUtility} from "../../../common-utility/dropdown/dropdown-utility";
import {DropdownService} from "../../../services/dropdown/dropdown.service";
import {NotificationService} from "../../../services/notification/notification.service";
import {PoService} from "../../../services/po/po.service";
import {HttpResponseConstant} from "../../../constant/http-response-constant";
import {HttpResponseMessage} from "../../../constant/http-response-message";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-create-po',
  templateUrl: './create-po.component.html',
  styleUrls: ['./create-po.component.scss']
})
export class CreatePoComponent implements OnInit{
  poCreateForm!: FormGroup;
  public dropDownUtility: DropdownUtility = new DropdownUtility(this.dropdownService);
  files: any = [];
  @Output() success = new EventEmitter();
  @Input()isEdit: any;
  @Input() public poId!: number;
  public accountLength!: number;
  public itemLength!: number;
  public poItemInformation: any = [];
  public poAccountInformation: any = [];

  constructor(public formBuilder: FormBuilder, public dropdownService: DropdownService,
              public router: Router, public date: DatePipe,
              public notificationService: NotificationService, public poService: PoService) {
  }

  ngOnInit(): void {
    this.poCreateForm = this.formBuilder.group({
      poNo: [null, Validators.required],
      vendorId: [null, Validators.required],
      notes: [null],
      files: [null],
      itemTotal: [null],
      accountTotal: [null],
      taxAmount: [null],
      total: [null],
      orderDate: new FormControl('', Validators.required),
      deliveryDate: [null, Validators.required],
      poItemInformation: this.formBuilder.array([]),
      poAccountInformation: this.formBuilder.array([]),
      workflowDetails: this.formBuilder.array([])
    });
    this.dropDownUtility.getVendorList();
    this.dropDownUtility.getUserList();
    this.dropDownUtility.getApprovalGroupList();
    if(this.isEdit){
      this.getPoById();
    }
  }

  /**
   * return controllers of the form
   */
  get f() {
    return this.poCreateForm.controls;
  }

  /**
   * submit po date
   */
  submitForm() {
    const orderDate = new Date(this.poCreateForm.value.orderDate);
    const deliveryDate = new Date(this.poCreateForm.value.deliveryDate);
    this.poCreateForm.get('orderDate')?.patchValue(orderDate);
    this.poCreateForm.get('deliveryDate')?.patchValue(deliveryDate);
     this.poCreateForm.get('files')?.patchValue(this.files);
     this.poService.createPurchaseOrder(this.poCreateForm.value).subscribe((res: any) => {
       if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
         this.notificationService.successNotification(HttpResponseMessage.PURCHASE_ORDER_CREATE_SUCCESS);
         this.router.navigateByUrl('/home/po/po-list');
       } else {
         this.notificationService.warningNotification(res.body.message);
       }
     }, error => {
       this.notificationService.errorNotification(error);
     });
  }

  /**
   * submit po date
   */
  updatePo() {
    const orderDate = new Date(this.poCreateForm.value.orderDate);
    const deliveryDate = new Date(this.poCreateForm.value.deliveryDate);
    this.poCreateForm.get('orderDate')?.patchValue(orderDate);
    this.poCreateForm.get('deliveryDate')?.patchValue(deliveryDate);
    this.poCreateForm.addControl('id', this.formBuilder.control(''));
    this.poCreateForm.get('id')?.patchValue(this.poId);
    this.poCreateForm.get('files')?.patchValue(this.files);
    this.poService.createPurchaseOrder(this.poCreateForm.value).subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.notificationService.successNotification(HttpResponseMessage.PAYMENT_UPDATED_SUCCESS);
        this.router.navigateByUrl('/home/po/po-list');
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

  /**
   * go back to the list
   */
  getPoById() {
    this.poService.getPurchaseOrder(this.poId).subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.itemLength = res.body?.poItemInformation?.length;
        this.accountLength = res.body?.poAccountInformation?.length;
        const orderDate = this.date.transform(res.body.orderDate, 'yyyy-MM-dd');
        const deliveryDate = this.date.transform(res.body.deliveryDate, 'yyyy-MM-dd');
        res.body.orderDate = orderDate;
        res.body.orderDate = deliveryDate;
        this.poCreateForm.patchValue(res.body);
        this.poItemInformation = res.body?.poItemInformation;
        this.poAccountInformation = res.body?.poAccountInformation;
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }
}
