import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {CalculationUtility} from "../../../common-utility/calculation/calculation-utility";
import {DropdownUtility} from "../../../common-utility/dropdown/dropdown-utility";
import {DropdownService} from "../../../services/dropdown/dropdown.service";
import {NotificationService} from "../../../services/notification/notification.service";
import {AccountService} from "../../../services/account/account.service";
import {HttpResponseConstant} from "../../../constant/http-response-constant";

@Component({
  selector: 'app-account-information-table',
  templateUrl: './account-information-table.component.html',
  styleUrls: ['./account-information-table.component.scss']
})
export class AccountInformationTableComponent implements AfterViewInit {
  @Input() formGroup!: FormGroup;
  @Input() accountLength!: number;
  @Input() isFromBill = false;
  @Input() isEdit: boolean = false;
  @Output() public initializedAccount = new EventEmitter();

  public calculationUtility: CalculationUtility = new CalculationUtility();
  public dropDownUtility: DropdownUtility = new DropdownUtility(this.dropdownService);


  constructor(public dropdownService: DropdownService, public formBuilder: FormBuilder,
              public accountService: AccountService, public notificationService: NotificationService) {
    this.dropDownUtility.getAccountList();
  }

  /**
   * defined account form array
   */
  get accountInformation(): FormArray {
    if(this.isFromBill){
      return this.formGroup.get('billAccountInformation') as FormArray;
    } else {
      return this.formGroup.get('poAccountInformation') as FormArray;
    }
  }

  /**
   * add account controller to group
   */
  addAccountControls(): void {
    const accountGroup = this.formBuilder.group({
      accountId: [null],
      accountName: [null],
      accDescription: [null],
      lineAmount: [null],
    });

    this.accountInformation.push(accountGroup);
  }

  /**
   * remove account from array
   * @param index to index number
   */
  removeAccount(index: number): void {
    this.accountInformation.removeAt(index);
  }


  /**
   * get account name by account id
   * @param value to id
   * @param account to account group
   */
  getAccountNameById(value: any, account: any) {
    if (!value) {
      account.get('accountName')?.patchValue(null);
      return;
    }
    this.accountService.getAccountNameById(value).subscribe(res => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        account.get('accountName')?.patchValue(res.body.value);
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

  ngAfterViewInit(): void {
   this.accountLength = this.isEdit ? this.accountLength : 5;
    // Add initial account controls
    for (let i = 0; i < this.accountLength; i++)
      this.addAccountControls();
    this.initializedAccount.emit();
  }

}
