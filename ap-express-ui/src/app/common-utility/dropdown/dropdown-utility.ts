import {DropdownService} from "../../services/dropdown/dropdown.service";
import {DropdownDto} from "../../dtos/dropdown/dropdown-dto";

export class DropdownUtility{
  public vendorList: DropdownDto = new DropdownDto();
  public accountList: DropdownDto = new DropdownDto();
  public itemList: DropdownDto = new DropdownDto();
  public approvalGroupList: DropdownDto = new DropdownDto();
  public userList: DropdownDto = new DropdownDto();
  public vendorRelatedPOList: DropdownDto = new DropdownDto();
  public vendorRelatedBillList: DropdownDto = new DropdownDto();
  public termList: DropdownDto = new DropdownDto();
  constructor(public dropdownService: DropdownService) {
  }
  /**
   * Retrieves the item dropdown list and handles the data.
   */
  getItemList() {
    // Subscribe to item dropdown list
    this.dropdownService.getItemDropDownList().subscribe(
      (response) => {
       this.itemList.data = response.body;
        // Handle the item dropdown list data here
      },
      (error) => {
        // Handle any errors that occur during the HTTP request
        console.error('An error occurred:', error);
      }
    );
  }

  /**
   * Retrieves the user dropdown list and handles the data.
   */
  getUserList() {
    // Subscribe to user dropdown list
    this.dropdownService.getUserDropDownList().subscribe(
      (response) => {
        this.userList.data = response.body;
        // Handle the user dropdown list data here
      },
      (error) => {
        // Handle any errors that occur during the HTTP request
        console.error('An error occurred:', error);
      }
    );
  }

  /**
   * Retrieves the vendor dropdown list and handles the data.
   */
  getVendorList(){
    // Subscribe to vendor dropdown list
     this.dropdownService.getVendorDropDownList().subscribe(
       (response) => {
        this.vendorList.data = response.body;
      });
  }

  /**
   * Retrieves the approval group dropdown list and handles the data.
   */
  getApprovalGroupList() {
    // Subscribe to approval group dropdown list
    this.dropdownService.getApprovalGroupDropDownList().subscribe(
      (response) => {
        this.approvalGroupList.data = response.body;
        // Handle the approval group dropdown list data here
      },
      (error) => {
        // Handle any errors that occur during the HTTP request
        console.error('An error occurred:', error);
      }
    );
  }

  /**
   * Retrieves the account dropdown list and handles the data.
   */
  getAccountList() {
    // Subscribe to account dropdown list
    this.dropdownService.getAccountDropDownList().subscribe(
      (response) => {
        this.accountList.data = response.body;
        // Handle the account dropdown list data here
      },
      (error) => {
        // Handle any errors that occur during the HTTP request
        console.error('An error occurred:', error);
      }
    );
  }

  /**
   * Retrieves the po dropdown list related selected vendor.
   */
  getVendorRelatedPoList(vendorId: any) {
    // Subscribe to vendor dropdown list
    this.dropdownService.getVendorRelatedPoDropDownList(vendorId).subscribe(
      (response) => {
        this.vendorRelatedPOList.data = response.body;
      });
  }

  /**
   * Retrieves the bill dropdown list related selected vendor.
   */
  getVendorRelatedBillDropDownList(vendorId: any) {
    // Subscribe to vendor dropdown list
    this.dropdownService.getVendorRelatedBillDropDownList(vendorId).subscribe(
      (response) => {
        this.vendorRelatedBillList.data = response.body;
      });
  }

  /**
   * Retrieves the term dropdown list and handles the data.
   */
  getTermList() {
    // Subscribe to term dropdown list
    this.dropdownService.getTermDropDownList().subscribe(
      (response) => {
        this.termList.data = response.body;
        // Handle the term dropdown list data here
      },
      (error) => {
        // Handle any errors that occur during the HTTP request
        console.error('An error occurred:', error);
      }
    );
  }
}
