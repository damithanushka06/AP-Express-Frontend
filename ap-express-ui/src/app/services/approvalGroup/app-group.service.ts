import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConstant} from "../../constant/app-constant";

@Injectable({
  providedIn: 'root'
})
export class AppGroupService {

  constructor(public httpClient: HttpClient) { }

  /**
   * this service serve to get all approval group list
   */
  getAllGroup(){
    return this.httpClient.get(AppConstant.BASE_URL + '/app_group/get_approval_group_list',
      {observe: 'response'})
  }

  /**
   * this service serve to search approval group list
   */
  searchApprovalGroup(){
    return this.httpClient.get(AppConstant.BASE_URL + '/appGroup/search_approval_group',
      {observe: 'response'})
  }

  /**
   * this service serve to create approvalGroup
   * @param approvalGroup to approvalGroup object
   */
  createGroup(approvalGroup: any){
    return this.httpClient.post(AppConstant.BASE_URL + '/appGroup/create_group', approvalGroup,
      {observe: 'response'})
  }

  /**
   * this service get user table setting
   */
  getSetting() {
    return this.httpClient.get('/assets/table_json/app_group_setting.json',
      {observe: 'response'})
  }

  /**
   * this service serve to delete approval group
   * @param groupId to approval group id
   */
  deleteGroup(groupId: number){
    return this.httpClient.delete<any>(AppConstant.BASE_URL +
      '/appGroup/delete_group', { observe: 'response', params:{groupId} });
  }

  /**
   * this service serve to update approval group details
   * @param approvalGroup: any to Approval Group obj
   */
  updateApprovalGroup(approvalGroup: any){
    return this.httpClient.put<any>(AppConstant.BASE_URL + '/appGroup/update_approval_group', approvalGroup,
      { observe: 'response' });
  }

  /**
   * this service serve to get approval group details
   * @param groupId to approval group id
   */
  getApprovalGroupById(groupId: number){
    return this.httpClient.get<any>(AppConstant.BASE_URL +
      '/appGroup/get_appGroup_detail_by_id', { observe: 'response', params:{groupId} });
  }

}
