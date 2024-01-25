import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DropdownUtility} from "../../../common-utility/dropdown/dropdown-utility";
import {DropdownService} from "../../../services/dropdown/dropdown.service";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {NotificationService} from "../../../services/notification/notification.service";
import {HttpResponseConstant} from "../../../constant/http-response-constant";
import {HttpResponseMessage} from "../../../constant/http-response-message";
import {BillService} from "../../../services/bill/bill.service";
import {FormValidation} from "../../../common-utility/form/form-validation";

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.scss']
})
export class CreateBillComponent implements OnInit{
  billCreateForm!: FormGroup;
  public dropDownUtility: DropdownUtility = new DropdownUtility(this.dropdownService);
  files: any = [];
  @Output() success = new EventEmitter();
  @Input()isEdit: any;
  @Input() public billId!: number;
  public accountLength!: number;
  public itemLength!: number;
  public billItemInformation: any = [];
  public billAccountInformation: any = [];

  constructor(public formBuilder: FormBuilder, public dropdownService: DropdownService,
              public router: Router, public date: DatePipe,
              public notificationService: NotificationService, public billService: BillService) {
  }

  ngOnInit(): void {
    this.billCreateForm = this.formBuilder.group({
      billNo: [null, Validators.required],
      poId: [null],
      vendorId: [null, Validators.required],
      billDate:[null, Validators.required],
      termId: [null, Validators.required],
      dueDate: [null],
      notes: [null],
      files: [null],
      itemTotal: [null],
      accountTotal: [null],
      taxAmount: [null],
      total: [null],
      billItemInformation: this.formBuilder.array([]),
      billAccountInformation: this.formBuilder.array([]),
      workflowDetails: this.formBuilder.array([])
    });
    this.dropDownUtility.getVendorList();
    this.dropDownUtility.getUserList();
    this.dropDownUtility.getApprovalGroupList();
    this.dropDownUtility.getTermList();
    if(this.isEdit){
      this.getBillById();
    }
  }

  get f() {
    return this.billCreateForm.controls;
  }

  /**
   * Submits the bill creation form.
   */
  submitForm() {
    FormValidation(this.billCreateForm);
    if(this.billCreateForm.invalid){
      return;
    }
    this.billCreateForm.get('files')?.patchValue(this.files);
    if(this.billCreateForm.value.billDate){
      const billDate = new Date(this.billCreateForm.value.billDate);
      this.billCreateForm.get('billDate')?.patchValue(billDate);
    }
    if(this.billCreateForm.value.dueDate){
      const dueDate = new Date(this.billCreateForm.value.dueDate);
      this.billCreateForm.get('dueDate')?.patchValue(dueDate);
    }

    this.billService.createBill(this.billCreateForm.value).subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.notificationService.successNotification(HttpResponseMessage.BILL_CREATE_SUCCESS);
        this.router.navigateByUrl('/home/bill/bill-list');
      } else {
        this.notificationService.warningNotification(res.body.errorMessage);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

  /**
   * Updates the bill.
   */
  updatePo() {
    this.billCreateForm.addControl('id', this.formBuilder.control(''));
    this.billCreateForm.get('id')?.patchValue(this.billId);
    this.billCreateForm.get('files')?.patchValue(this.files);
    const billDate = new Date(this.billCreateForm.value.billDate);
    const dueDate = new Date(this.billCreateForm.value.dueDate);
    this.billCreateForm.get('billDate')?.patchValue(billDate);
    this.billCreateForm.get('dueDate')?.patchValue(dueDate);
    this.billService.updateBill(this.billCreateForm.value).subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.notificationService.successNotification(HttpResponseMessage.PAYMENT_UPDATED_SUCCESS);
        this.router.navigateByUrl('/home/bill/bill-list');
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

  /**
   * Retrieves the bill by its ID.
   */
  getBillById() {
    this.billService.getBill(this.billId).subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.itemLength = (res.body?.billItemInformation?.length === 0) ? 1: (res.body?.billItemInformation?.length);
        this.accountLength = (res.body?.billAccountInformation?.length === 0) ? 1: (res.body?.billAccountInformation?.length);
        res.body.billDate = new Date(res.body.billDate);
        res.body.dueDate = new Date(res.body.dueDate? res.body.dueDate: new Date());
        this.billCreateForm.patchValue(res.body);
        this.billItemInformation = res.body?.billItemInformation;
        this.billAccountInformation = res.body?.billAccountInformation;
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

}
