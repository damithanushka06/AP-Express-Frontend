import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConstant} from "../../constant/app-constant";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(public httpClient: HttpClient) { }

  getAllUserRole(){
    return this.httpClient.get(AppConstant.BASE_URL + '/role/get_all_roles',
      {observe: 'response'})
  }
}
