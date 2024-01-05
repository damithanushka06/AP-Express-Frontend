import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConstant} from "../../constant/app-constant";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(public httpClient: HttpClient) {
  }

  /**
   * Creates a new account with the given details.
   * @param account The account details to create.
   */
  createAccount(account: any) {
    return this.httpClient.post<any>(
      AppConstant.BASE_URL + '/account/create_account',
      account,
      {observe: 'response'}
    );
  }

  /**
   * Updates the details of an existing account.
   * @param account The account details to update.
   */
  updateAccount(account: any) {
    return this.httpClient.put<any>(
      AppConstant.BASE_URL + '/account/update_account',
      account,
      {observe: 'response'}
    );
  }

  /**
   * Retrieves the details of an account with the given ID.
   * @param accId The ID of the account to retrieve.
   */
  getAccount(accId: number) {
    return this.httpClient.get<any>(
      AppConstant.BASE_URL + '/account/get_account_detail_by_id',
      {observe: 'response', params: {accId}, withCredentials: true}
    );
  }

  /**
   * Deletes the account with the given ID.
   * @param accId The ID of the account to delete.
   */
  deleteAccount(accId: number) {
    return this.httpClient.delete<any>(
      AppConstant.BASE_URL + '/account/delete_account_detail_by_id',
      {observe: 'response', params: {accId}}
    );
  }

  // Search table related services
  /**
   * Retrieves a list of all accounts.
   */
  getAllAccountList() {
    return this.httpClient.get(
      AppConstant.BASE_URL + '/account/getAll',
      {observe: 'response'}
    );
  }

  /**
   * Retrieves the settings for the account table.
   */
  getSetting() {
    return this.httpClient.get('/assets/table_json/account_setting.json', {
      observe: 'response',
    });
  }

  /**
   * this method can be used to get account type list
   */
  getAccountTypeList(){
    return this.httpClient.get(AppConstant.BASE_URL + '/account/get_account_type_list',
      {observe: 'response'})
  }

  /**
   * this method can be used to get parent account list
   */
  getParentAccountList(){
    return this.httpClient.get(AppConstant.BASE_URL + '/account/get_parent_account_list',
      {observe: 'response'})
  }

  /**
   * get item name by item id
   * @param accId to accId
   */
  getAccountNameById(accId: number) {
    return this.httpClient.get<any>(
      AppConstant.BASE_URL + '/account/get_name_by_id',
      {observe: 'response', params: {accId}, withCredentials: true}
    );
  }
}
