import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConstant} from "../../constant/app-constant";

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(public httpClient: HttpClient) { }

  /**
   * Retrieves the dropdown list of items.
   *
   * @returns an Observable with the HTTP response containing the item dropdown list
   */
  getItemDropDownList() {
    return this.httpClient.get(
      AppConstant.BASE_URL + '/dropdown/get_item_dropdown_list',
      { observe: 'response' }
    );
  }

  /**
   * Retrieves the dropdown list of users.
   *
   * @returns an Observable with the HTTP response containing the user dropdown list
   */
  getUserDropDownList() {
    return this.httpClient.get(
      AppConstant.BASE_URL + '/dropdown/get_user_dropdown_list',
      { observe: 'response' }
    );
  }

  /**
   * Retrieves the dropdown list of vendors.
   *
   * @returns an Observable with the HTTP response containing the vendor dropdown list
   */
  getVendorDropDownList() {
    return this.httpClient.get(
      AppConstant.BASE_URL + '/dropdown/get_vendor_dropdown_list',
      { observe: 'response' }
    );
  }

  /**
   * Retrieves the dropdown list of approval groups.
   *
   * @returns an Observable with the HTTP response containing the approval group dropdown list
   */
  getApprovalGroupDropDownList() {
    return this.httpClient.get(
      AppConstant.BASE_URL + '/dropdown/get_approvalGroup_dropdown_list',
      { observe: 'response' }
    );
  }

  /**
   * Retrieves the dropdown list of accounts.
   *
   * @returns an Observable with the HTTP response containing the account dropdown list
   */
  getAccountDropDownList() {
    return this.httpClient.get(
      AppConstant.BASE_URL + '/dropdown/get_account_dropdown_list',
      { observe: 'response' }
    );
  }

  /**
   * Retrieves the dropdown list of purchase orders related to a vendor.
   * Sends an HTTP GET request to the server with the vendorId as a parameter.
   * Returns the response as an Observable.
   * @param vendorId The ID of the vendor.
   * @returns An Observable of the HTTP response.
   */
  getVendorRelatedPoDropDownList(vendorId: any) {
    return this.httpClient.get(
      AppConstant.BASE_URL + '/por/get_vendor_related_po_list',
      { observe: 'response', params:{vendorId} }
    );
  }

  /**
   * Retrieves the term drop-down list from the server.
   * @returns An Observable of the HTTP response containing the term drop-down list.
   */
  getTermDropDownList() {
    return this.httpClient.get(AppConstant.BASE_URL + '/payment/get_payment_term_list',
      { observe: 'response' });
  }

  /**
   * Retrieves the vendor-related bill drop-down list from the server.
   * @param vendorId The ID of the vendor.
   * @returns An Observable of the HTTP response containing the vendor-related bill drop-down list.
   */
  getVendorRelatedBillDropDownList(vendorId: any) {
    return this.httpClient.get(
      AppConstant.BASE_URL + '/dropdown/get_vendor_related_bill_list',
      { observe: 'response', params: { vendorId } }
    );
  }

}
