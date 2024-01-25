import { Injectable } from '@angular/core';
import {AppConstant} from "../../constant/app-constant";
import {ConvertObjToFormData} from "../../common-utility/format-data/convert-obj-to-form-data";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(public httpClient: HttpClient) {
  }

  /**
   * Creates a bill with the given details.
   * @param billMaster The bill details to create.
   */
  createBill(billMaster: any) {
    return this.httpClient.post(
      AppConstant.BASE_URL + '/bill/create_bill',
      ConvertObjToFormData(billMaster),
      { observe: 'response' }
    );
  }

  /**
   * Updates the details of an existing bill.
   * @param bill The bill details to update.
   */
  updateBill(bill: any) {
    return this.httpClient.post<any>(
      AppConstant.BASE_URL + '/bill/update_bill_master',
      ConvertObjToFormData(bill),
      { observe: 'response' }
    );
  }

  /**
   * Retrieves the details of a bill with the given ID.
   * @param billId The ID of the bill to retrieve.
   */
  getBill(billId: number) {
    return this.httpClient.get<any>(
      AppConstant.BASE_URL + '/bill/get_bill_master_detail_by_id',
      { observe: 'response', params: { billId }, withCredentials: true }
    );
  }

  /**
   * Approve bill
   * @param billId  bill master id
   */
  approveBill(billId: number) {
    return this.httpClient.post(
      AppConstant.BASE_URL + '/bill/bill_approve',{},
      { observe: 'response', params: { billId }, withCredentials: true }
    );
  }

  /**
   * Deletes the bill with the given ID.
   * @param billId The ID of the bill to delete.
   */
  deleteBill(billId: number) {
    return this.httpClient.delete<any>(
      AppConstant.BASE_URL + '/bill/delete_bill_master_by_id',
      { observe: 'response', params: { billId } }
    );
  }

// Search table related services
  /**
   * Retrieves a list of all bills.
   */
  getAllBills() {
    return this.httpClient.get(
      AppConstant.BASE_URL + '/bill/getAll',
      { observe: 'response' }
    );
  }

  /**
   * Retrieves the settings for the bill table.
   */
  getBillSettings() {
    return this.httpClient.get('/assets/table_json/bill_setting.json', {
      observe: 'response',
    });
  }

  /**
   * Retrieves list of approved bill chart data
   */
  getApprovedBillChartData() {
    return this.httpClient.get<any>(
      AppConstant.BASE_URL + '/bill/get_chart_data_related_approved_bill',
      { observe: 'response', withCredentials: true }
    );
  }

  /**
   * Retrieves list of approved bill chart data
   */
  getApprovedPOChartData() {
    return this.httpClient.get<any>(
      AppConstant.BASE_URL + '/po/get_chart_data_related_approved_po',
      { observe: 'response', withCredentials: true }
    );
  }
}
