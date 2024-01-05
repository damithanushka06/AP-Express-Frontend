import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConstant} from "../../constant/app-constant";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  /**
   * this method can be used to register user
   */
  registerUser(user: any): Observable<any> {
    return this.http.post<any>(AppConstant.BASE_URL + '/signup', user, {observe: 'response', withCredentials: true});
  }

  /**
   * this method can be used to login user
   */
  login(username: any, password: any) {
   return  this.http.post(AppConstant.BASE_URL + '/signin', { username, password }, {withCredentials: true});
  }

  /**
   * this method can be used to log out the user
   */
  logout(): Observable<any> {
    return this.http.post(AppConstant.BASE_URL + '/signout', { }, {withCredentials: true});
  }

  refreshToken() {
    return this.http.post(AppConstant.BASE_URL + 'refreshtoken', { });
  }
}
