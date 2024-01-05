import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DropdownUtility} from "../../../common-utility/dropdown/dropdown-utility";
import {DropdownService} from "../../../services/dropdown/dropdown.service";
import {DropdownDto} from "../../../dtos/dropdown/dropdown-dto";
import {PorService} from "../../../services/por/por.service";
import {HttpResponseConstant} from "../../../constant/http-response-constant";
import {HttpResponseMessage} from "../../../constant/http-response-message";
import {Router} from "@angular/router";
import {NotificationService} from "../../../services/notification/notification.service";

@Component({
  selector: 'app-create-por',
  templateUrl: './create-por.component.html',
  styleUrls: ['./create-por.component.scss']
})
export class CreatePorComponent implements OnInit {
  porCreateForm!: FormGroup;
  public dropDownUtility: DropdownUtility = new DropdownUtility(this.dropdownService);
  itemLength: any;
  poItemInformation: any;
  isEdit: any;
  files: any;
  vendorRelatedPOList: DropdownDto = new DropdownDto();
  private totalAmount = 0.0;

  constructor(public formBuilder: FormBuilder, public dropdownService: DropdownService,
              public router: Router,
              public notificationService: NotificationService, public porService: PorService) {
  }

  ngOnInit(): void {
    this.porCreateForm = this.formBuilder.group({
      porNumber: [null, Validators.required],
      vendorId: [null, Validators.required],
      poId: [null, Validators.required],
      receivedDate: [null, Validators.required],
      totalAmount: [null, Validators.required],
      porItemInformationList: this.formBuilder.array([]),
    });
    this.dropDownUtility.getVendorList();
  }

  /**
   * return controllers of the form
   */
  get f() {
    return this.porCreateForm.controls;
  }

  /**
   * defined item form array
   */
  get itemInformation(): FormArray {
    return this.porCreateForm.get('porItemInformationList') as FormArray;
  }

  /**
   * add item controller to group
   */
  addItemControls(): void {
    const itemGroup = this.formBuilder.group({
      itemNumber: [null],
      itemName: [null],
      remainingQty: [null],
      receivedQty: [0],
      lineAmount: [null],
      unitPrice: [null],
      originalQty:[null],
      itemId:[null]
    });

    this.itemInformation.push(itemGroup);
  }

  /**
   * Retrieves the po dropdown list related selected vendor.
   */
  getPORelatedItemList(poId: any) {
    // Subscribe to vendor dropdown list
    this.porService.getPORelatedItemList(poId).subscribe(
      (response) => {
        this.poItemInformation = response.body;
        for (let i=0; i< this.poItemInformation.length; i++){
          this.addItemControls();
          this.itemInformation.controls[i].get('itemId')?.patchValue(this.poItemInformation[i].itemNo);
          this.itemInformation.controls[i].get('originalQty')?.patchValue(this.poItemInformation[i].qty);
          this.itemInformation.controls[i].get('remainingQty')?.patchValue(this.poItemInformation[i].qty);
          this.itemInformation.controls[i].get('itemNumber')?.patchValue(this.poItemInformation[i].itemNumberStr);
        }
        this.itemInformation.patchValue(this.poItemInformation);
        this.porCreateForm.get('totalAmount')?.patchValue(this.totalAmount)

      });
  }


  updatePor() {

  }

  submitForm() {
    const receivedDate = new Date(this.porCreateForm.value.receivedDate);
    this.porCreateForm.get('receivedDate')?.patchValue(receivedDate);
    this.porCreateForm.get('files')?.patchValue(this.files);
    this.porService.createPor(this.porCreateForm.value).subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.notificationService.successNotification(HttpResponseMessage.POR_CREATE_SUCCESS);
        this.router.navigateByUrl('/home/por/por-list');
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

  calculate(item: any) {
    const remainingQty = parseInt(item.get('remainingQty')?.value, 10) || 0;
    const receivedQty = parseInt(item.get('receivedQty')?.value, 10) || 0;
    const originalQty = parseInt(item.get('originalQty')?.value, 10) || 0;
    const unitPrice = parseFloat(item.get('unitPrice')?.value) || 0;
    let lineAmount = 0.0;

    if (originalQty === receivedQty) {
      item.get('remainingQty')?.patchValue(0);
      lineAmount = unitPrice * receivedQty;
      item.get('lineAmount').patchValue(lineAmount);
    } else if (originalQty < receivedQty) {
      item.get('receivedQty')?.patchValue(originalQty);
      const lineAmount = parseFloat(item.get('unitPrice')?.value) * originalQty;
      item.get('lineAmount')?.patchValue(lineAmount);
    } else {
      const remainingQty = originalQty - receivedQty;
      item.get('remainingQty')?.patchValue(remainingQty);

      const lineAmount = unitPrice * receivedQty;
      item.get('lineAmount')?.patchValue(lineAmount);
    }

    this.totalAmount = 0;
    this.itemInformation.controls.forEach((value: any) => {
      this.totalAmount += parseFloat(value.get('lineAmount')?.value) || 0;
    });

    this.porCreateForm.get('total')?.patchValue(this.totalAmount);
  }


}
