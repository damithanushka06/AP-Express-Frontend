import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {CalculationUtility} from "../../../common-utility/calculation/calculation-utility";
import {DropdownService} from "../../../services/dropdown/dropdown.service";
import {DropdownUtility} from "../../../common-utility/dropdown/dropdown-utility";
import {HttpResponseConstant} from "../../../constant/http-response-constant";
import {ItemService} from "../../../services/item/item.service";
import {NotificationService} from "../../../services/notification/notification.service";

@Component({
  selector: 'app-item-information-table',
  templateUrl: './item-information-table.component.html',
  styleUrls: ['./item-information-table.component.scss']
})
export class ItemInformationTableComponent implements AfterViewInit {
  @Input() formGroup!: FormGroup;
  @Input() itemLength!: number;
  @Input() isFromBill = false;
  @Input() isEdit: boolean = false;
  @Output() public initializedItem = new EventEmitter();
  public calculationUtility: CalculationUtility = new CalculationUtility();
  public dropDownUtility: DropdownUtility = new DropdownUtility(this.dropdownService);


  constructor(public dropdownService: DropdownService, public formBuilder: FormBuilder,
              public itemService: ItemService, public notificationService: NotificationService) {
    this.dropDownUtility.getItemList();
  }

  /**
   * defined item form array
   */
  get itemInformation(): FormArray {
    if(this.isFromBill){
      return this.formGroup.get('billItemInformation') as FormArray;
    } else {
      return this.formGroup.get('poItemInformation') as FormArray;
    }
  }


  /**
   * add item controller to group
   */
  addItemControls(): void {
    const itemGroup = this.formBuilder.group({
      itemNo: [null],
      itemName: [null],
      qty: [null],
      unitPrice: [null],
      lineTotal: [null]
    });

    this.itemInformation.push(itemGroup);
  }

  /**
   * remove item from array
   * @param index to index number
   */
  removeItem(index: number): void {
    this.itemInformation.removeAt(index);
  }

  /**
   * get item name by item id
   * @param value to id
   * @param item to item group
   */
  getItemNameById(value: any, item: any) {
    if (!value) {
      item.get('itemName')?.patchValue(null);
      return;
    }
    this.itemService.getItemNameById(value).subscribe(res => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        item.get('itemName')?.patchValue(res.body.value);
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

  ngAfterViewInit(): void {
   this.itemLength = this.isEdit ? this.itemLength : 5;
    // Add initial item controls
    for (let i = 0; i < this.itemLength; i++){
      this.addItemControls();
    }
    this.initializedItem.emit();
  }



}
