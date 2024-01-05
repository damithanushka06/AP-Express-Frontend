import {FormArray, FormGroup} from "@angular/forms";

export class CalculationUtility {

  constructor() {
  }

  /**
   * Calculates the lineTotal and itemTotal based on the values of qty and unitPrice in the itemInformation form array.
   * @param itemInformation The form array containing item information.
   * @param currentIndex The index of the current item in the itemInformation form array.
   * @param formGroup The form group instance
   */
  calculateItemInformationTotal(itemInformation: FormArray, currentIndex: number, formGroup: FormGroup) {
    let qty = 0; // Variable to store the quantity
    let unitPrice = 0; // Variable to store the unit price
    let lineTotal: number = 0; // Variable to store the line total
    let itemTotal: number = 0; // Variable to store the item total

    // Get the quantity value from the form control
    qty = itemInformation.controls[currentIndex].get('qty')?.value;

    // Get the unit price value from the form control
    unitPrice = itemInformation.controls[currentIndex].get('unitPrice')?.value;

    // Calculate the line total
    lineTotal = qty * unitPrice;

    // Set the lineTotal value in the corresponding form control
    itemInformation.controls[currentIndex].get('lineTotal')?.patchValue(lineTotal);

    // Get the current item total value from the itemTotalCost form control
    itemTotal = 0;

    // Calculate the item total by summing up all lineTotal values in the itemInformation form array
    for (let i = 0; i < itemInformation.controls.length; i++) {
      lineTotal = itemInformation.controls[i].get('lineTotal')?.value || 0;
      itemTotal += lineTotal;
    }

    // Set the itemTotal value in the itemTotalCost form control
    formGroup.get('itemTotal')?.patchValue(itemTotal);
    this.calculateFullyTotalAmount(formGroup);
  }


  /**
   * Calculates the lineAmount and accountTotal based on the values of lineAmount in the accountInformation form array.
   * @param accountInformation The form array containing account information.
   * @param currentIndex The index of the current account in the accountInformation form array.
   * @param formGroup The form group instance
   */
  calculateAccountInformationTotal(accountInformation: FormArray, currentIndex: number, formGroup: FormGroup) {
    let lineAmount = accountInformation.controls[currentIndex].get('lineAmount')?.value || 0; // Variable to store the line amount

    // Set the lineAmount value to 0 for the current account in the accountInformation form array
    accountInformation.controls[currentIndex].get('lineAmount')?.patchValue(lineAmount);

    let accountTotal = 0; // Variable to store the account total

    // Calculate the account total by summing up all lineAmount values in the accountInformation form array
    for (let i = 0; i < accountInformation.controls.length; i++) {
      lineAmount = accountInformation.controls[i].get('lineAmount')?.value || 0;
      accountTotal += lineAmount;
    }

    // Set the accountTotal value in the accountTotal form control
    formGroup.get('accountTotal')?.patchValue(accountTotal);
    this.calculateFullyTotalAmount(formGroup);
  }

  /**
   * Calculates the fully total amount based on the values of accountTotal and itemTotal in the formGroup.
   * Updates the 'total' value in the formGroup.
   * @param formGroup The FormGroup containing the relevant controls.
   */
  calculateFullyTotalAmount(formGroup: FormGroup) {
    let accountTotal = formGroup.get('accountTotal')?.value || 0; // Variable to store the account total
    let itemTotal = formGroup.get('itemTotal')?.value || 0; // Variable to store the item total
    let tax = formGroup.get('taxAmount')?.value || 0; // Variable to store the tax amount
    let total = 0; // Variable to store the fully total amount

    // Calculate the fully total amount by summing up the accountTotal and itemTotal also tax
    total = accountTotal + itemTotal;
    total -= tax;
    // Set the 'total' value in the formGroup
    formGroup.get('total')?.patchValue(total);
  }

}
