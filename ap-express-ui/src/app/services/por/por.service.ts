import { Injectable } from '@angular/core';
import {AppConstant} from "../../constant/app-constant";
import {HttpClient} from "@angular/common/http";
import {ConvertObjToFormData} from "../../common-utility/format-data/convert-obj-to-form-data";

@Injectable({
  providedIn: 'root'
})
export class PorService {
  constructor(public httpClient: HttpClient) { }


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
   * Retrieves the list of items related to a purchase order.
   * Sends an HTTP GET request to the server with the poId as a parameter.
   * Returns the response as an Observable.
   * @param poId The ID of the purchase order.
   * @returns An Observable of the HTTP response.
   */
  getPORelatedItemList(poId: any) {
    return this.httpClient.get(
      AppConstant.BASE_URL + '/por/get_po_related_item_list',
      { observe: 'response', params:{poId} }
    );
  }

  /**
   * Creates a purchase order.
   * Sends an HTTP POST request to the server with the porMaster object as the request body.
   * Converts the porMaster object to FormData before sending the request.
   * Returns the response as an Observable.
   * @param porMaster The purchase order master object.
   * @returns An Observable of the HTTP response.
   */
  createPor(porMaster: any) {
    return this.httpClient.post(
      AppConstant.BASE_URL + '/por/create_por',
      ConvertObjToFormData(porMaster),
      { observe: 'response' }
    );
  }

  /**
   * Deletes a purchase order receipt.
   * Sends an HTTP DELETE request to the server with the porId as a parameter.
   * Returns the response as an Observable.
   * @param porId The ID of the purchase order receipt.
   * @returns An Observable of the HTTP response.
   */
  deletePurchaseOrderReceipt(porId: number) {
    return this.httpClient.delete<any>(
      AppConstant.BASE_URL + '/por/delete_por_detail_by_id',
      { observe: 'response', params: { porId } }
    );
  }

  /**
   * Retrieves all purchase order receipts.
   * Sends an HTTP GET request to the server.
   * Returns the response as an Observable.
   * @returns An Observable of the HTTP response.
   */
  getAllPurchaseOrderReceipts() {
    return this.httpClient.get(
      AppConstant.BASE_URL + '/por/getAll',
      { observe: 'response' }
    );
  }

  /**
   * Retrieves the settings for purchase order receipts.
   * Sends an HTTP GET request to a JSON file containing the settings.
   * Returns the response as an Observable.
   * @returns An Observable of the HTTP response.
   */
  getPurchaseOrderReceiptSettings() {
    return this.httpClient.get('/assets/table_json/por_setting.json', {
      observe: 'response',
    });
  }

}
