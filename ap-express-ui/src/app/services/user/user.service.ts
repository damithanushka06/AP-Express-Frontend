import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../dtos/user/user";
import {AppConstant} from "../../constant/app-constant";
import {ConvertObjToFormData} from "../../common-utility/format-data/convert-obj-to-form-data";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(public httpClient: HttpClient) { }

  /**
   * this service serve to create user function
   * @param user to User object
   */
  createUser(user:User) {
    return this.httpClient.post(AppConstant.BASE_URL + '/user/create_user', ConvertObjToFormData(user),
      {observe: 'response'})
  }

  /**
   * this service serve to update user details
   * @param user to User obj
   */
  updateUser(user: any){
    return this.httpClient.put<any>(AppConstant.BASE_URL + '/user/update_user', ConvertObjToFormData(user),
      { observe: 'response' });
  }

  /**
   * this service serve to get user details
   * @param userId to User id
   */
  getUser(userId: number){
    return this.httpClient.get<any>(AppConstant.BASE_URL + '/user/get_user_detail_by_id',
      { observe: 'response' , params:{userId}, withCredentials: true});
  }

  /**
   * this service serve to delete user
   * @param userId to User id
   */
  deleteUser(userId: number){
    return this.httpClient.delete<any>(AppConstant.BASE_URL +
      '/user/delete_user_detail_by_id', { observe: 'response', params:{userId} });
  }

  //Search table related services
  /**
   * this service serve to user list
   */
  getAllUserList() {
    return this.httpClient.get(AppConstant.BASE_URL + '/user/getAll',
      {observe: 'response'})
  }

  /**
   * this service get user table setting
   */
  getSetting() {
    return this.httpClient.get('/assets/table_json/user_setting.json',
      {observe: 'response'})
  }
}
