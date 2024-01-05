import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  /**
   * this method used for clear sessionStorage
   */
  clean(): void {
    window.sessionStorage.clear();
  }

  /**
   * this method used for save items to sessionStorage
   */
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  /**
   * this method used for get user details from sessionStorage
   */
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  /**
   * this method used for validate user login
   */
  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    return !!user;
  }

  /**
   * this method used for validate token
   */
  isTokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token?.split('.')[1]))).exp;
    return expiry * 1000 > Date.now();
  }
}
