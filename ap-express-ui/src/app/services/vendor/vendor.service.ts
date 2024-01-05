import { Injectable } from '@angular/core';
import {AppConstant} from "../../constant/app-constant";
import {HttpClient} from "@angular/common/http";
import {ConvertObjToFormData} from "../../common-utility/format-data/convert-obj-to-form-data";

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private httpClient: HttpClient) { }

  /**
   * this method used to create a vendor
   */
  createVendor(vendor: any){
    return this.httpClient.post(AppConstant.BASE_URL + '/vendor/create_vendor', vendor,
      {observe: 'response'})
  }

  /**
   * this service serve to update vendor details
   * @param vendor to vendor obj
   */
  updateVendor(vendor: any){
    return this.httpClient.put<any>(AppConstant.BASE_URL + '/vendor/update_vendor', vendor,
      { observe: 'response' });
  }

  /**
   * this service serve to get vendor details
   * @param vendorId to vendor id
   */
  getVendor(vendorId: number){
    return this.httpClient.get<any>(AppConstant.BASE_URL + '/vendor/get_vendor_detail_by_id',
      { observe: 'response' , params:{vendorId}, withCredentials: true});
  }

  /**
   * this service serve to delete vendor
   * @param vendorId to vendor id
   */
  deleteVendor(vendorId: number){
    return this.httpClient.delete<any>(AppConstant.BASE_URL +
      '/vendor/delete_vendor_detail_by_id', { observe: 'response', params:{vendorId} });
  }

  //Search table related services
  /**
   * this service serve to vendor list
   */
  getAllVendorList() {
    return this.httpClient.get(AppConstant.BASE_URL + '/vendor/getAll',
      {observe: 'response'})
  }

  /**
   * this service get vendor table setting
   */
  getSetting() {
    return this.httpClient.get('/assets/table_json/vendor_setting.json',
      {observe: 'response'})
  }

}
