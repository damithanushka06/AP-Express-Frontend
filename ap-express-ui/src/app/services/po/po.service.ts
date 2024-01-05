import { Injectable } from '@angular/core';
import {AppConstant} from "../../constant/app-constant";
import {HttpClient} from "@angular/common/http";
import {ConvertObjToFormData} from "../../common-utility/format-data/convert-obj-to-form-data";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PoService {

  constructor(public httpClient: HttpClient) { }

  /**
   * Creates a purchase order with the given details.
   * @param poMaster The purchase order details to create.
   */
  createPurchaseOrder(poMaster: any) {
    return this.httpClient.post(
      AppConstant.BASE_URL + '/po/create_po',
      ConvertObjToFormData(poMaster),
      { observe: 'response' }
    );
  }

  /**
   * Updates the details of an existing purchase order.
   * @param purchaseOrder The purchase order details to update.
   */
  updatePurchaseOrder(purchaseOrder: any) {
    return this.httpClient.put<any>(
      AppConstant.BASE_URL + '/purchase-order/update',
      purchaseOrder,
      { observe: 'response' }
    );
  }

  /**
   * Retrieves the details of a purchase order with the given ID.
   * @param poId The ID of the purchase order to retrieve.
   */
  getPurchaseOrder(poId: number) {
    return this.httpClient.get<any>(
      AppConstant.BASE_URL + '/po/get_po_detail_by_id',
      { observe: 'response', params: { poId }, withCredentials: true }
    );
  }

  /**
   * Deletes the purchase order with the given ID.
   * @param poId The ID of the purchase order to delete.
   */
  deletePurchaseOrder(poId: number) {
    return this.httpClient.delete<any>(
      AppConstant.BASE_URL + '/po/delete_po_detail_by_id',
      { observe: 'response', params: { poId } }
    );
  }

// Search table related services
  /**
   * Retrieves a list of all purchase orders.
   */
  getAllPurchaseOrders() {
    return this.httpClient.get(
      AppConstant.BASE_URL + '/po/getAll',
      { observe: 'response' }
    );
  }

  /**
   * Retrieves the settings for the purchase order table.
   */
  getPurchaseOrderSettings() {
    return this.httpClient.get('/assets/table_json/purchase_order_setting.json', {
      observe: 'response',
    });
  }

  /**
   * Downloads the Purchase Order (PO) report based on the given PO ID.
   * @param poId The ID of the PO to download the report for.
   * @returns An Observable that emits the downloaded report as a Blob.
   */
  downloadPO(poId: any) {
    return this.httpClient.get(
      AppConstant.BASE_URL + '/po/download_po_report',
      {
        observe: 'response',
        params: { poId },
        responseType: 'blob'
      }
    ).pipe(
      map(response => response.body)
    );
  }

}
