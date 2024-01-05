import { Injectable } from '@angular/core';
import {AppConstant} from "../../constant/app-constant";
import {HttpClient} from "@angular/common/http";
import {ConvertObjToFormData} from "../../common-utility/format-data/convert-obj-to-form-data";
import {HttpResponseConstant} from "../../constant/http-response-constant";
import {HttpResponseMessage} from "../../constant/http-response-message";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }
  /**
   * this method used to get payment term list
   */
  getPaymentTermList(){
    return this.httpClient.get(AppConstant.BASE_URL + '/payment/get_payment_term_list',
      {observe: 'response'})
  }

  /**
   * this method used to get payment method list
   */
  getPaymentMethodList(){
    return this.httpClient.get(AppConstant.BASE_URL + '/payment/get_payment_method_list',
      {observe: 'response'})
  }

  /**
   * Creates a payment with the given details.
   * @param payment The payment details to create.
   */
  createPayment(payment: any) {
    return this.httpClient.post(
      AppConstant.BASE_URL + '/payment/create_payment',
      payment,
      {observe: 'response'}
    );
  }

  /**
   * get bill remaining balance
   * @param billId to bill master id
   */
  getBillBalance(billId: any) {
    return this.httpClient.get(
      AppConstant.BASE_URL + '/payment/get_bill_balance',
      {observe: 'response', params:{billId}},
    );
  }

  /**
   * Void payment with the given ID.
   * @param paymentId The ID of the payment to void
   */
  voidPayment(paymentId: number) {
    return this.httpClient.delete<any>(
      AppConstant.BASE_URL + '/payment/void_payment',
      { observe: 'response', params: { paymentId } }
    );
  }

// Search table related services
  /**
   * Retrieves a list of all payments.
   */
  getAllPayments() {
    return this.httpClient.get(
      AppConstant.BASE_URL + '/payment/getAll',
      { observe: 'response' }
    );
  }

  /**
   * Retrieves the settings for the payment table.
   */
  getPaymentSettings() {
    return this.httpClient.get('/assets/table_json/payment_setting.json', {
      observe: 'response',
    });
  }
}
