import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import {DropdownDto} from "../../../dtos/dropdown/dropdown-dto";
import {AccountService} from "../../../services/account/account.service";
import {HttpResponseConstant} from "../../../constant/http-response-constant";
import {HttpResponseMessage} from "../../../constant/http-response-message";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit{
  accountCreateForm!: FormGroup;
  accountTypeList: DropdownDto = new DropdownDto();
  parentAccountList: DropdownDto = new DropdownDto();

  // @ts-ignore
  @Input() accountId: number;
  @Input() isEdit = false;
  @Output() success = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private notificationService: NotificationService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.accountCreateForm = this.formBuilder.group({
      name: [null, Validators.required],
      accountTypeId: [null, Validators.required],
      parentAccountId: [null],
      description: [null],
      number: [null, Validators.required],
    });
    this.getParentAccountList();
    this.getAccountTypeList();
    if(this.isEdit){
      this.getAccountData();
    }
  }

  /**
   * Returns the form controls
   */
  get f() {
    return this.accountCreateForm.controls;
  }

  /**
   * Submits the account data
   */
  submitAccountData() {
    this.accountService.createAccount(this.accountCreateForm.value).subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.notificationService.successNotification(HttpResponseMessage.ACCOUNT_CREATE_SUCCESS);
        this.router.navigateByUrl('/home/account/account-list');
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

  /**
   * Submits the account data
   */
  updateAccountData() {
    this.accountCreateForm.addControl('id', this.formBuilder.control(''));
    this.accountCreateForm.get('id')?.patchValue(this.accountId);
    this.accountService.updateAccount(this.accountCreateForm.value).subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.notificationService.successNotification(HttpResponseMessage.ACCOUNT_UPDATED_SUCCESS);
        this.router.navigateByUrl('/home/account/account-list');
        this.success.emit();
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

  /**
   * this method can be used to get account data
   */
  getAccountData() {
    this.accountService.getAccount(this.accountId).subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.accountCreateForm.patchValue(res.body);
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }


  /**
   * Resets the account form data
   */
  resetAccountForm() {
    this.accountCreateForm.reset();
    if(this.isEdit){
      this.getAccountData();
    }
  }

  /**
   * Gets the account type list
   */
  getAccountTypeList() {
    this.accountService.getAccountTypeList().subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.accountTypeList.data = res.body;
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

  /**
   * Gets the parent account list
   */
  getParentAccountList() {
    this.accountService.getParentAccountList().subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.parentAccountList.data = res.body;
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }
}
